package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import net.kyori.adventure.text.Component;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityDamageByEntityEvent;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public final class CombatManager implements Listener {
    private final FlatMcFFAPlugin plugin;
    private final Map<UUID, Long> combatUntil = new ConcurrentHashMap<>();

    public CombatManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler(ignoreCancelled = true)
    public void onDamage(EntityDamageByEntityEvent event) {
        if (!(event.getEntity() instanceof Player victim)) return;
        if (!(event.getDamager() instanceof Player attacker)) return;
        tag(victim);
        tag(attacker);
    }

    public void tag(Player player) {
        int sec = plugin.getConfig().getInt("combat.duration-seconds", 10);
        combatUntil.put(player.getUniqueId(), System.currentTimeMillis() + sec * 1000L);
    }

    public boolean isTagged(Player player) {
        Long until = combatUntil.get(player.getUniqueId());
        if (until == null) return false;
        if (until < System.currentTimeMillis()) {
            combatUntil.remove(player.getUniqueId());
            return false;
        }
        return true;
    }

    public long remainingSeconds(Player player) {
        Long until = combatUntil.get(player.getUniqueId());
        if (until == null) return 0;
        return Math.max(0, (until - System.currentTimeMillis()) / 1000);
    }

    public void clear(Player player) {
        combatUntil.remove(player.getUniqueId());
    }

    public void startActionbarTask() {
        Bukkit.getScheduler().runTaskTimer(plugin, () -> {
            for (Player player : Bukkit.getOnlinePlayers()) {
                if (!isTagged(player)) continue;
                player.sendActionBar(Component.text("§cCombat: " + remainingSeconds(player) + "s"));
            }
        }, 20L, 20L);
    }
}
