package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.scheduler.BukkitTask;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public final class TeleportManager implements Listener {
    private final FlatMcFFAPlugin plugin;
    private final Map<UUID, PendingTeleport> pending = new ConcurrentHashMap<>();

    public TeleportManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    public boolean requestTeleport(Player player, Location target, Runnable callback) {
        if (plugin.getCombatManager().isTagged(player)) {
            player.sendMessage("§cYou cannot teleport while combat tagged.");
            return false;
        }
        if (plugin.getCooldownManager().isOnCooldown(player.getUniqueId(), "teleport")) {
            long remain = plugin.getCooldownManager().getRemainingMs(player.getUniqueId(), "teleport") / 1000;
            player.sendMessage("§cTeleport cooldown: " + remain + "s");
            return false;
        }
        int delay = plugin.getConfig().getInt("teleport.delay-seconds", 3);
        Location from = player.getLocation().clone();
        BukkitTask task = Bukkit.getScheduler().runTaskTimer(plugin, new Runnable() {
            int left = delay;
            @Override public void run() {
                PendingTeleport p = pending.get(player.getUniqueId());
                if (p == null) return;
                if (left <= 0) {
                    player.teleportAsync(target).thenRun(() -> {
                        callback.run();
                        player.sendMessage("§aTeleported.");
                    });
                    plugin.getCooldownManager().set(player.getUniqueId(), "teleport", plugin.getConfig().getLong("cooldowns.teleport-ms", 2000));
                    p.task.cancel();
                    pending.remove(player.getUniqueId());
                    return;
                }
                player.sendMessage("§eTeleporting in " + left + "...");
                left--;
            }
        }, 0L, 20L);
        pending.put(player.getUniqueId(), new PendingTeleport(from, target, task));
        return true;
    }

    @EventHandler(ignoreCancelled = true)
    public void onMove(PlayerMoveEvent event) {
        if (!plugin.getConfig().getBoolean("teleport.cancel-on-move", true)) return;
        PendingTeleport pendingTeleport = pending.get(event.getPlayer().getUniqueId());
        if (pendingTeleport == null) return;
        if (event.getFrom().distanceSquared(event.getTo()) < 0.0001) return;
        pendingTeleport.task.cancel();
        pending.remove(event.getPlayer().getUniqueId());
        event.getPlayer().sendMessage("§cTeleport cancelled because you moved.");
    }

    private record PendingTeleport(Location from, Location target, BukkitTask task) {}
}
