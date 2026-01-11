export interface SubmissionResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  isDuplicate?: boolean;
}

/**
 * Common disposable email domains to block
 */
const DISPOSABLE_DOMAINS = [
  'temp-mail.org', 'guerrillamail.com', '10minutemail.com', 
  'throwawaymail.com', 'mailinator.com', 'tempmail.com',
  'yopmail.com', 'maildrop.cc', 'dispostable.com'
];

/**
 * Validates if an email is from a temporary provider
 */
export const isTempMail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.includes(domain);
};

/**
 * Generates a unique registration ID
 */
const generateRegistrationId = (): string => {
  const prefix = "BRV";
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}-${randomStr}-${timestamp}`;
};

/**
 * Checks if an email is already in the database
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  if (!email || !email.includes('@')) return false;
  const SHEETDB_URL = 'https://sheetdb.io/api/v1/5yuld897cgftq';
  try {
    const searchResponse = await fetch(`${SHEETDB_URL}/search?Email=${encodeURIComponent(email.trim())}`);
    if (searchResponse.ok) {
      const existingEntries = await searchResponse.json();
      return existingEntries && existingEntries.length > 0;
    }
  } catch (e) {
    console.error('Check email error:', e);
  }
  return false;
};

/**
 * Submits the email to the SheetDB waitlist.
 */
export const submitToWaitlist = async (emailInput: string): Promise<SubmissionResponse> => {
  const email = emailInput.trim();
  const SHEETDB_URL = 'https://sheetdb.io/api/v1/5yuld897cgftq';
  
  if (!email || !email.includes('@')) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (isTempMail(email)) {
    return { success: false, message: "Please use a permanent email address." };
  }

  try {
    // Final duplicate check before POST
    const exists = await checkEmailExists(email);
    if (exists) {
      return { 
        success: true, 
        isDuplicate: true,
        message: "You're already on the list! We'll be in touch soon."
      };
    }

    const registrationId = generateRegistrationId();
    const joinAt = new Date().toLocaleString();
    
    const payload = {
      data: [{
        Email: email,
        registerId: registrationId,
        JoinAT: joinAt
      }]
    };

    const response = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return { 
      success: true, 
      message: "Welcome aboard! You've been added to the BrandVibe waitlist.",
      registrationId: registrationId 
    };
  } catch (e) {
    console.error('Waitlist submission error:', e);
    return { 
      success: false, 
      message: "Database connection failed. Please try again later." 
    };
  }
};