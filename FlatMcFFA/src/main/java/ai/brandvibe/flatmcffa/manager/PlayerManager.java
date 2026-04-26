package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import ai.brandvibe.flatmcffa.model.PlayerStats;
import org.bukkit.Bukkit;
import org.bukkit.GameMode;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.FoodLevelChangeEvent;
import org.bukkit.event.entity.PlayerDeathEvent;
import org.bukkit.event.player.PlayerDropItemEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.player.PlayerRespawnEvent;

public final class PlayerManager implements Listener {
    private final FlatMcFFAPlugin plugin;

    public PlayerManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent e) {
        Player player = e.getPlayer();
        player.setGameMode(GameMode.SURVIVAL);
        int prot = plugin.getConfig().getInt("player.join-protection-seconds", 4);
        Bukkit.getScheduler().runTaskLater(plugin, () -> {}, prot * 20L);

        String defaultArena = plugin.getConfig().getString("arena.default", "").toLowerCase();
        if (!defaultArena.isEmpty() && plugin.getArenaManager().getArena(defaultArena).isPresent()) {
            plugin.getArenaManager().setPlayerArena(player.getUniqueId(), defaultArena);
            plugin.getTeleportManager().requestTeleport(player, plugin.getArenaManager().getArena(defaultArena).orElseThrow(), () -> {});
        }
        String defaultKit = plugin.getConfig().getString("kits.default", "").toLowerCase();
        if (!defaultKit.isEmpty()) plugin.getKitManager().giveKit(player, defaultKit);
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent e) {
        if (plugin.getCombatManager().isTagged(e.getPlayer()) && plugin.getConfig().getBoolean("combat.logout-penalty", true)) {
            e.getPlayer().setHealth(0.0);
        }
        plugin.getStatsManager().saveAsync();
    }

    @EventHandler
    public void onDeath(PlayerDeathEvent e) {
        Player victim = e.getEntity();
        Player killer = victim.getKiller();
        PlayerStats victimStats = plugin.getStatsManager().get(victim.getUniqueId());
        victimStats.addDeath();
        plugin.getCombatManager().clear(victim);

        if (killer != null) {
            PlayerStats killerStats = plugin.getStatsManager().get(killer.getUniqueId());
            killerStats.addKill();
            killer.sendMessage("§a+1 kill §7(§f" + killerStats.getKills() + "§7)");
            victim.sendMessage("§cKilled by " + killer.getName());
        }
    }

    @EventHandler
    public void onRespawn(PlayerRespawnEvent e) {
        Player player = e.getPlayer();
        String arena = plugin.getArenaManager().getPlayerArena(player.getUniqueId());
        if (arena != null) {
            plugin.getArenaManager().getArena(arena).ifPresent(e::setRespawnLocation);
        }
        Bukkit.getScheduler().runTask(plugin, () -> {
            String defaultKit = plugin.getConfig().getString("kits.default", "").toLowerCase();
            if (!defaultKit.isEmpty()) plugin.getKitManager().giveKit(player, defaultKit);
        });
    }

    @EventHandler
    public void onMove(PlayerMoveEvent e) {
        if (e.getTo() != null && e.getTo().getY() < plugin.getConfig().getInt("player.void-y", -20)) {
            String arena = plugin.getArenaManager().getPlayerArena(e.getPlayer().getUniqueId());
            if (arena != null) plugin.getArenaManager().getArena(arena).ifPresent(loc -> e.getPlayer().teleportAsync(loc));
        }
    }

    @EventHandler
    public void onFood(FoodLevelChangeEvent e) {
        if (plugin.getConfig().getBoolean("player.disable-hunger", true)) {
            e.setCancelled(true);
        }
    }

    @EventHandler
    public void onDrop(PlayerDropItemEvent e) {
        if (plugin.getConfig().getBoolean("player.disable-item-drops", true)) {
            e.setCancelled(true);
        }
    }
}
