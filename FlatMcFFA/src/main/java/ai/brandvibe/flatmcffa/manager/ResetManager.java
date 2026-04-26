package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Item;
import org.bukkit.entity.Projectile;
import org.bukkit.scheduler.BukkitTask;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public final class ResetManager {
    private final FlatMcFFAPlugin plugin;
    private BukkitTask autoTask;

    public ResetManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    public void startAutoReset() {
        long intervalTicks = plugin.getConfig().getLong("arena.auto-reset-interval-seconds", 600) * 20L;
        autoTask = Bukkit.getScheduler().runTaskTimer(plugin, this::resetAllArenas, intervalTicks, intervalTicks);
    }

    public void resetArena(String arenaName) {
        plugin.getArenaManager().getArena(arenaName).ifPresent(this::resetAt);
    }

    public void resetAllArenas() {
        for (String arena : plugin.getArenaManager().getArenaNames()) {
            resetArena(arena);
        }
        Bukkit.broadcastMessage("§e[FFA] Arenas cleaned.");
    }

    private void resetAt(Location center) {
        int radius = plugin.getConfig().getInt("arena.reset-radius", 100);
        List<Entity> targets = new ArrayList<>();
        for (Entity entity : center.getWorld().getEntities()) {
            if (entity.getLocation().distanceSquared(center) > radius * radius) continue;
            if (entity instanceof Item || entity instanceof Projectile) targets.add(entity);
        }
        int batch = plugin.getConfig().getInt("arena.reset-batch-size", 150);
        Iterator<Entity> it = targets.iterator();
        Bukkit.getScheduler().runTaskTimer(plugin, task -> {
            int processed = 0;
            while (processed < batch && it.hasNext()) {
                Entity e = it.next();
                if (e.isValid()) e.remove();
                processed++;
            }
            if (!it.hasNext()) task.cancel();
        }, 0L, 1L);
    }

    public void shutdown() {
        if (autoTask != null) autoTask.cancel();
    }
}
