package ai.brandvibe.flatmcffa.model;

public final class PlayerStats {
    private int kills;
    private int deaths;
    private int streak;
    private int bestStreak;

    public PlayerStats() {}

    public PlayerStats(int kills, int deaths, int streak, int bestStreak) {
        this.kills = kills;
        this.deaths = deaths;
        this.streak = streak;
        this.bestStreak = bestStreak;
    }

    public int getKills() { return kills; }
    public int getDeaths() { return deaths; }
    public int getStreak() { return streak; }
    public int getBestStreak() { return bestStreak; }

    public void addKill() {
        kills++;
        streak++;
        if (streak > bestStreak) bestStreak = streak;
    }

    public void addDeath() {
        deaths++;
        streak = 0;
    }
}
