package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import ai.brandvibe.flatmcffa.model.PlayerStats;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.scoreboard.DisplaySlot;
import org.bukkit.scoreboard.Objective;
import org.bukkit.scoreboard.Scoreboard;

public final class ScoreboardManager {
    private final FlatMcFFAPlugin plugin;
    private int taskId = -1;

    public ScoreboardManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    public void start() {
        if (!plugin.getConfig().getBoolean("scoreboard.enabled", true)) return;
        taskId = Bukkit.getScheduler().scheduleSyncRepeatingTask(plugin, () -> {
            for (Player player : Bukkit.getOnlinePlayers()) {
                render(player);
            }
        }, 20L, 20L);
    }

    public void render(Player player) {
        PlayerStats stats = plugin.getStatsManager().get(player.getUniqueId());
        Scoreboard board = Bukkit.getScoreboardManager().getNewScoreboard();
        Objective objective = board.registerNewObjective("ffa", "dummy", "§6§lFlatMcFFA");
        objective.setDisplaySlot(DisplaySlot.SIDEBAR);
        objective.getScore("§7Arena: §f" + (plugin.getArenaManager().getPlayerArena(player.getUniqueId()) == null ? "none" : plugin.getArenaManager().getPlayerArena(player.getUniqueId()))).setScore(4);
        objective.getScore("§7Kills: §f" + stats.getKills()).setScore(3);
        objective.getScore("§7Deaths: §f" + stats.getDeaths()).setScore(2);
        objective.getScore("§7Streak: §f" + stats.getStreak()).setScore(1);
        player.setScoreboard(board);
    }

    public void shutdown() {
        if (taskId != -1) Bukkit.getScheduler().cancelTask(taskId);
    }
}
