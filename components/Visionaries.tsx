import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Visionary {
  name: string;
  role: string;
  quotes: string[];
  region: string;
  image: string;
}

const visionaries: Visionary[] = [
  // --- US (5) ---
  {
    name: "Elon Musk",
    role: "CEO, Tesla & SpaceX",
    quotes: [
      "If you aren't optimizing for AI, you're optimizing for the past.",
      "We are effectively building a digital god.",
      "AI will be the best or worst thing ever for humanity.",
      "The pace of progress is accelerating exponentially.",
      "We need to merge with AI to survive in the long run.",
      "Mars is the backup drive, AI is the operating system.",
      "Computers will be infinitely smarter than us soon.",
      "Safe AI is the most important challenge we face.",
      "Robots will eventually do everything better than us.",
      "I fear the day AI takes control without alignment."
    ],
    region: "US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg/800px-Elon_Musk_Royal_Society_%28crop1%29.jpg"
  },
  {
    name: "Jensen Huang",
    role: "CEO, Nvidia",
    quotes: [
      "Every single pixel will be generated. Not rendered: generated.",
      "We are in the iPhone moment of artificial intelligence.",
      "Software is eating the world, but AI is eating software.",
      "The more you buy, the more you save.",
      "Generative AI is a new computing platform.",
      "Accelerated computing is the future of all industries.",
      "Programming is no longer about coding, it's about prompting.",
      "Digital biology will be the next revolution driven by AI.",
      "The data center is the new computer.",
      "AI will be your co-pilot for life."
    ],
    region: "US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/640px-Jensen_Huang_%28cropped%29.jpg"
  },
  {
    name: "Sam Altman",
    role: "CEO, OpenAI",
    quotes: [
      "Intelligence is going to be essentially free. That changes everything.",
      "We believe AI will be the greatest technology humanity has yet developed.",
      "The future of AI should be democratic and accessible.",
      "We are building tools that amplify human creativity.",
      "AGI will be the final invention humanity needs to make.",
      "Regulation is critical for the safety of powerful models.",
      "AI will can solve some of the hardest problems in science.",
      "The cost of intelligence is trending towards zero.",
      "We need to be cautious but optimistic about the future.",
      "Planning for AGI is the most important thing we do."
    ],
    region: "US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sam_Altman_Flickr_2.jpg/640px-Sam_Altman_Flickr_2.jpg"
  },
  {
    name: "Bill Gates",
    role: "Co-founder, Microsoft",
    quotes: [
      "AI is as fundamental as the microprocessor.",
      "It will change the way people work, learn, travel.",
      "The age of AI has begun.",
      "Risks are real, but manageable.",
      "AI can reduce inequity globally.",
      "We are at the start of a massive transition.",
      "Software is the IQ of the digital world.",
      "Climate change can be solved with AI.",
      "Health innovation will accelerate exponentially.",
      "Robots will eventually pay taxes."
    ],
    region: "US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/640px-Bill_Gates_2017_%28cropped%29.jpg"
  },
  {
    name: "Jeff Bezos",
    role: "Founder, Amazon",
    quotes: [
      "It's the beginning of the golden age of AI.",
      "We are now solving problems with machine learning.",
      "AI will empower entrepreneurs.",
      "Alexa is just the beginning.",
      "Machine learning will automate mundane tasks.",
      "We need to fail fast to innovate.",
      "Customer obsession drives our AI.",
      "Invention is our way out of the box.",
      "Space is the next frontier for AI.",
      "The flywheel is spinning faster."
    ],
    region: "US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/640px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg"
  },

  // --- India (5) ---
  {
    name: "Mukesh Ambani",
    role: "Chairman, Reliance",
    quotes: [
      "Data is the new oil, but AI is the new engine that burns it.",
      "India will lead the global AI revolution.",
      "Digital infrastructure is the backbone of the future.",
      "AI must be affordable and accessible to every citizen.",
      "We are moving from the information age to the intelligence age.",
      "Connectivity plus AI equals infinite possibility.",
      "Every sector in India will be transformed by AI.",
      "We must ensure AI benefits the bottom of the pyramid.",
      "The youth of India are the raw material for the AI age.",
      "Jio is committed to democratizing AI for everyone."
    ],
    region: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Mukesh_Ambani.jpg"
  },
  {
    name: "Sundar Pichai",
    role: "CEO, Alphabet",
    quotes: [
      "AI is more profound than fire or electricity.",
      "We are rethinking all our products with an AI-first approach.",
      "Responsible AI is just as important as powerful AI.",
      "The potential for AI to help people is incredibly exciting.",
      "Quantum computing and AI will revolutionize discovery.",
      "We want to organize the world's information with AI.",
      "AI will transform healthcare in ways we can't imagine.",
      "Search will evolve into a conversational experience.",
      "It is important to regulate AI to prevent misuse.",
      "AI is the most important thing humanity is working on."
    ],
    region: "India/US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/640px-Sundar_pichai.png"
  },
  {
    name: "N. Chandrasekaran",
    role: "Chairman, Tata Sons",
    quotes: [
      "AI will bridge the gap between intent and execution.",
      "Digital adoption is not an option, it's a necessity.",
      "AI will create more jobs than it displaces.",
      "We are integrating AI into the core of our manufacturing.",
      "The future belongs to those who collaborate with machines.",
      "Sustainability and AI go hand in hand.",
      "We need to skill our workforce for the AI era.",
      "AI allows us to personalize experiences at scale.",
      "Trust is the currency of the digital economy.",
      "Innovation is fueled by data and powered by AI."
    ],
    region: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Natarajan_Chandrasekaran_2010.jpg/640px-Natarajan_Chandrasekaran_2010.jpg"
  },
  {
    name: "Narayana Murthy",
    role: "Founder, Infosys",
    quotes: [
      "AI will improve productivity massively.",
      "Human mind is the most powerful computer.",
      "We must embrace automation to grow.",
      "Youth must learn to learn.",
      "Governance needs AI transparency.",
      "Entrepreneurship is the key to jobs.",
      "Technology is a great leveler.",
      "India's talent pool is its strength.",
      "Values are more important than valuation.",
      "Hard work has no substitute."
    ],
    region: "India",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Narayana_Murthy_World_Economic_Forum_2013.jpg/640px-Narayana_Murthy_World_Economic_Forum_2013.jpg"
  },
  {
    name: "Vinod Khosla",
    role: "Founder, Khosla Ventures",
    quotes: [
      "AI will replace 80% of doctors.",
      "Expertise will eventually be free.",
      "We are inventing the future with AI.",
      "Improbable is the new normal.",
      "Techno-optimism is the only way.",
      "AI is an engine for abundance.",
      "Software eats medicine next.",
      "The future is bionic.",
      "Data science is the new biology.",
      "Risk taking is essential for progress."
    ],
    region: "India/US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Vinod_Khosla_2012.jpg/640px-Vinod_Khosla_2012.jpg"
  },

  // --- UK (5) ---
  {
    name: "Demis Hassabis",
    role: "CEO, DeepMind",
    quotes: [
      "We're solving intelligence to solve everything else.",
      "AlphaFold is just the beginning of digital biology.",
      "AI will accelerate scientific discovery by decades.",
      "We need to understand intelligence to recreate it.",
      "The brain is the only existence proof of general intelligence.",
      "Games are the perfect testing ground for AI.",
      "We prioritize safety and ethics in all our research.",
      "AI can help us solve the climate crisis.",
      "Creativity is the next frontier for AI.",
      "The fusion of AI and science is the future."
    ],
    region: "UK",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Demis_Hassabis_Royal_Society.jpg/640px-Demis_Hassabis_Royal_Society.jpg"
  },
  {
    name: "Richard Branson",
    role: "Founder, Virgin",
    quotes: [
      "The brave may not live forever, but the cautious do not live at all.",
      "AI should enhance the human experience, not replace it.",
      "Innovation happens when you break the rules.",
      "We must ensure technology serves humanity.",
      "The future of travel will be powered by smart systems.",
      "Entrepreneurs must embrace AI to stay ahead.",
      "Customer service will be revolutionized by AI.",
      "We need to educate the next generation for an AI world.",
      "Disruption is at the heart of progress.",
      "Always look for the opportunity in the challenge."
    ],
    region: "UK",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Richard_Branson_March_2015_%28cropped%29.jpg/640px-Richard_Branson_March_2015_%28cropped%29.jpg"
  },
  {
    name: "Geoffrey Hinton",
    role: "AI Pioneer",
    quotes: [
      "I have always been convinced that the only way to get AI is to build a brain.",
      "Deep learning is capturing the essence of cognition.",
      "We need to worry about AI getting smarter than us.",
      "The existential risk is real and needs attention.",
      "Neural networks are the best model we have of the mind.",
      "I am surprised by how fast the field has moved.",
      "We might be just a temporary stage in the evolution of intelligence.",
      "Digital intelligence can share knowledge instantly.",
      "We need to ensure AI goals align with human goals.",
      "Backpropagation is a beautiful algorithm."
    ],
    region: "UK",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Geoffrey_Hinton_at_UBC.jpg/640px-Geoffrey_Hinton_at_UBC.jpg"
  },
  {
    name: "Mustafa Suleyman",
    role: "CEO, Microsoft AI",
    quotes: [
      "The coming wave is inevitable.",
      "We need containment for AI safety.",
      "AI is a new kind of digital species.",
      "Power is shifting to technologists.",
      "Democracy needs to adapt to AI.",
      "We must define the boundaries.",
      "Emotional intelligence in AI matters.",
      "The Turing test is obsolete.",
      "Personal AIs will be a human right.",
      "Governance is the challenge of our time."
    ],
    region: "UK",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mustafa_Suleyman_2017.jpg/640px-Mustafa_Suleyman_2017.jpg"
  },
  {
    name: "Alan Turing",
    role: "Father of AI",
    quotes: [
      "Machines will eventually think.",
      "We can only see a short distance ahead.",
      "Mathematical reasoning can be modeled.",
      "Intelligence is the ability to adapt.",
      "A computer would deserve to be called intelligent.",
      "Science is a differential equation.",
      "We are building a brain.",
      "Logic is the foundation.",
      "Can machines think?",
      "The imitation game."
    ],
    region: "UK",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/640px-Alan_Turing_Aged_16.jpg"
  },

  // --- Russia (5) ---
  {
    name: "Pavel Durov",
    role: "Founder, Telegram",
    quotes: [
      "Privacy is not for sale, and AI must respect that.",
      "We need decentralized AI to protect freedom.",
      "Communication should be secure and intelligent.",
      "The big tech monopolies threaten open AI development.",
      "Encryption is the only defense against surveillance.",
      "We are building a platform for free speech and AI.",
      "Users should own their data, not corporations.",
      "Speed and security are our core values.",
      "The future is distributed, not centralized.",
      "We resist censorship in all its forms."
    ],
    region: "Russia",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pavel_Durov_2017.jpg/640px-Pavel_Durov_2017.jpg"
  },
  {
    name: "Vitalik Buterin",
    role: "Co-founder, Ethereum",
    quotes: [
      "Decentralized AI is the only way to ensure fairness.",
      "Blockchain and AI are converging technologies.",
      "We need to solve the alignment problem with math.",
      "Open source is essential for trust in AI.",
      "Smart contracts will govern autonomous agents.",
      "The metaverse will be built on crypto and AI.",
      "We are building the infrastructure for a free digital world.",
      "Privacy-preserving AI is the next big hurdle.",
      "DAOs will manage AI resources in the future.",
      "We must avoid central points of failure in AI."
    ],
    region: "Russia/Canada",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/640px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg"
  },
  {
    name: "Eugene Kaspersky",
    role: "CEO, Kaspersky",
    quotes: [
      "In an AI world, cyber immunity is the new standard.",
      "AI will create new threats we haven't seen before.",
      "Security must be built into AI from the ground up.",
      "We are fighting a war against automated cybercrime.",
      "Trust nothing, verify everything.",
      "The industrial internet needs AI protection.",
      "We use AI to fight AI-driven attacks.",
      "Cybersecurity is a race between offense and defense.",
      "The digital world is fragile without protection.",
      "We protect the future by securing the present."
    ],
    region: "Russia",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Eugene_Kaspersky_2016.jpg/640px-Eugene_Kaspersky_2016.jpg"
  },
  {
    name: "Sergey Brin",
    role: "Co-founder, Google",
    quotes: [
      "AI is the most significant development.",
      "We want to solve big problems.",
      "Technology should be invisible.",
      "Search is the ultimate AI.",
      "We are still in the early stages.",
      "Curiosity is the engine of progress.",
      "Information should be free.",
      "Neural networks are surprising.",
      "Deep learning is the future.",
      "We need to be responsible."
    ],
    region: "Russia/US",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sergey_Brin_cropped.jpg/640px-Sergey_Brin_cropped.jpg"
  },
  {
    name: "Yuri Milner",
    role: "Founder, DST Global",
    quotes: [
      "The universe is full of mysteries.",
      "Science is the only way forward.",
      "We need to invest in fundamental physics.",
      "The internet is a global brain.",
      "Connectivity changes everything.",
      "We look for founders with global ambition.",
      "The future is about speed and scale.",
      "Knowledge is the most valuable asset.",
      "We are searching for life in the universe.",
      "Big bets drive big progress."
    ],
    region: "Russia/Global",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Yuri_Milner_2011.jpg/640px-Yuri_Milner_2011.jpg"
  },

  // --- Global (5) ---
  {
    name: "Masayoshi Son",
    role: "CEO, SoftBank",
    quotes: [
      "Those who rule data and AI will rule the world.",
      "I am a believer in the singularity.",
      "We invest in the visionaries of the AI revolution.",
      "AI will redefine every industry on Earth.",
      "Smart robots will revitalize the economy.",
      "We must have a long-term vision for humanity.",
      "The information revolution is just beginning.",
      "Happiness for everyone through the information revolution.",
      "Speed is the most important factor in business.",
      "My passion is to help create a better future."
    ],
    region: "Japan",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Masayoshi_Son_%2816825700432%29.jpg/640px-Masayoshi_Son_%2816825700432%29.jpg"
  },
  {
    name: "Jack Ma",
    role: "Co-founder, Alibaba",
    quotes: [
      "Machines have chips, but humans have hearts.",
      "We should teach our children to be creative, not machines.",
      "Love is the one thing AI cannot replicate.",
      "The future is about service, not manufacturing.",
      "Data technology will replace information technology.",
      "Small businesses will thrive with AI tools.",
      "Trust is the most expensive thing in the world.",
      "Opportunities lie in the place where the complaints are.",
      "We need to work happily and live seriously.",
      "The world needs IQ, EQ, and LQ (Love Quotient)."
    ],
    region: "China",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jack_Ma_2016.jpg/640px-Jack_Ma_2016.jpg"
  },
  {
    name: "Bernard Arnault",
    role: "CEO, LVMH",
    quotes: [
      "Technology is just a tool to tell a better story.",
      "Luxury is about heritage meets innovation.",
      "We use AI to enhance craftsmanship, not replace it.",
      "The desire for beauty is timeless.",
      "Innovation is the key to longevity.",
      "We must stay ahead of the curve.",
      "Quality is our primary focus.",
      "Digital experiences must be as exquisite as physical ones.",
      "Creativity is the heart of our business.",
      "We are custodians of history looking to the future."
    ],
    region: "France",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bernard_Arnault_%283%29_-_2017_%28cropped%29.jpg/640px-Bernard_Arnault_%283%29_-_2017_%28cropped%29.jpg"
  },
  {
    name: "Satya Nadella",
    role: "CEO, Microsoft",
    quotes: [
      "AI will redefine every category of software we know.",
      "Empathy is the most important skill for a leader.",
      "We want to empower every person on the planet.",
      "Trust is the foundation of our AI principles.",
      "Cloud and AI are the two big transformational shifts.",
      "We need to ensure AI is inclusive.",
      "The copilot era is here.",
      "Learning is a lifelong journey.",
      "We are moving from mobile-first to AI-first.",
      "Technology must respect human values."
    ],
    region: "Global",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/640px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg"
  },
  {
    name: "Tim Cook",
    role: "CEO, Apple",
    quotes: [
      "AI is essential to our products and our future.",
      "Privacy is a fundamental human right.",
      "We design technology to enrich people's lives.",
      "Machine learning is behind every Apple feature.",
      "We care deeply about how our products are used.",
      "Innovation is in our DNA.",
      "We want to leave the world better than we found it.",
      "Technology should be invisible and magical.",
      "User trust is everything to us.",
      "The intersection of technology and liberal arts."
    ],
    region: "Global",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tim_Cook_2009_cropped.jpg/640px-Tim_Cook_2009_cropped.jpg"
  },
  {
    name: "Mark Zuckerberg",
    role: "CEO, Meta",
    quotes: [
      "The future of AI is open source.",
      "We are building the metaverse with AI.",
      "Connectivity is a human right.",
      "AI will help us understand the world better.",
      "We want to connect the whole world.",
      "Virtual reality is the next computing platform.",
      "We move fast and break things.",
      "AI agents will be useful for everyone.",
      "The biggest risk is not taking any risk.",
      "We are betting big on the future of AI."
    ],
    region: "Global",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/640px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
  }
];

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

const VisionaryCard: React.FC<{ person: Visionary; index: number }> = ({ person, index }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Cycle quotes every 6-9 seconds, staggered by index to avoid robotic uniformity
    const intervalTime = 6000 + (index % 3) * 1000;
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % person.quotes.length);
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [person.quotes.length, index]);

  return (
    <div className="relative group flex flex-col items-center w-[280px] shrink-0">
      {/* Speech Bubble */}
      <div className="mb-6 w-full relative h-[120px] flex items-end justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white text-slate-900 rounded-2xl p-5 shadow-xl speech-tail relative z-10 w-full absolute bottom-0"
          >
            <p className="font-bold text-sm leading-snug mb-2 line-clamp-3">
              "{person.quotes[quoteIndex]}"
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {person.region}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Card */}
      <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group-hover:border-purple-500/30 transition-colors">
          {/* Image */}
          {!imgError ? (
            <img 
              src={person.image} 
              alt={person.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                <span className="text-6xl font-bold text-slate-700/50 select-none">{getInitials(person.name)}</span>
             </div>
          )}
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

          {/* Text Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white font-bold text-lg leading-none mb-1">{person.name}</h3>
            <p className="text-slate-400 text-xs">{person.role}</p>
          </div>
      </div>
    </div>
  );
};

export const Visionaries: React.FC = () => {
  // Triple list for smoother infinite marquee
  const scrollList = [...visionaries, ...visionaries, ...visionaries];

  return (
    <section className="w-full relative pt-24 pb-12 overflow-hidden bg-slate-950">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Global Consensus
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
            Visionaries on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">The AI Revolution</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

        {/* Scrolling Track */}
        <motion.div
          className="flex gap-8 pl-8 w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 100, // Speed up: Reduced duration to 100s for a longer list (was 150s for shorter list)
          }}
          style={{ willChange: 'transform' }} // Optimization hint
        >
          {scrollList.map((person, i) => (
            <VisionaryCard key={`${person.name}-${i}`} person={person} index={i} />
          ))}
        </motion.div>
      </div>

    </section>
  );
};