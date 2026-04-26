package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import ai.brandvibe.flatmcffa.model.PlayerStats;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public final class StatsManager {
    private final FlatMcFFAPlugin plugin;
    private final Map<UUID, PlayerStats> statsCache = new ConcurrentHashMap<>();
    private final File file;
    private final YamlConfiguration yaml;

    public StatsManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
        this.file = new File(plugin.getDataFolder(), "playerdata.yml");
        if (!file.exists()) plugin.saveResource("playerdata.yml", false);
        this.yaml = YamlConfiguration.loadConfiguration(file);
    }

    public PlayerStats get(UUID uuid) {
        return statsCache.computeIfAbsent(uuid, id -> {
            String p = "players." + id;
            return new PlayerStats(
                    yaml.getInt(p + ".kills", 0),
                    yaml.getInt(p + ".deaths", 0),
                    yaml.getInt(p + ".streak", 0),
                    yaml.getInt(p + ".bestStreak", 0));
        });
    }

    public void saveAsync() {
        Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
            for (Map.Entry<UUID, PlayerStats> e : statsCache.entrySet()) {
                String p = "players." + e.getKey();
                PlayerStats s = e.getValue();
                yaml.set(p + ".kills", s.getKills());
                yaml.set(p + ".deaths", s.getDeaths());
                yaml.set(p + ".streak", s.getStreak());
                yaml.set(p + ".bestStreak", s.getBestStreak());
            }
            try {
                yaml.save(file);
            } catch (IOException ex) {
                plugin.getLogger().warning("Failed to save playerdata.yml: " + ex.getMessage());
            }
        });
    }
}
