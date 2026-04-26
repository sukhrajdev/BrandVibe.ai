package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.configuration.file.YamlConfiguration;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public final class ArenaManager {
    private final FlatMcFFAPlugin plugin;
    private final Map<String, Location> arenas = new ConcurrentHashMap<>();
    private final Map<UUID, String> playerArenas = new ConcurrentHashMap<>();
    private final File file;
    private final YamlConfiguration yaml;

    public ArenaManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
        this.file = new File(plugin.getDataFolder(), "arenas.yml");
        if (!file.exists()) plugin.saveResource("arenas.yml", false);
        this.yaml = YamlConfiguration.loadConfiguration(file);
        load();
    }

    public void load() {
        arenas.clear();
        if (!yaml.isConfigurationSection("arenas")) return;
        for (String name : yaml.getConfigurationSection("arenas").getKeys(false)) {
            String path = "arenas." + name;
            World world = Bukkit.getWorld(yaml.getString(path + ".world", ""));
            if (world == null) continue;
            Location loc = new Location(world,
                    yaml.getDouble(path + ".x"),
                    yaml.getDouble(path + ".y"),
                    yaml.getDouble(path + ".z"),
                    (float) yaml.getDouble(path + ".yaw"),
                    (float) yaml.getDouble(path + ".pitch"));
            arenas.put(name.toLowerCase(), loc);
        }
    }

    public void setArena(String name, Location location) {
        String key = name.toLowerCase();
        arenas.put(key, location.clone());
        String path = "arenas." + key;
        yaml.set(path + ".world", location.getWorld().getName());
        yaml.set(path + ".x", location.getX());
        yaml.set(path + ".y", location.getY());
        yaml.set(path + ".z", location.getZ());
        yaml.set(path + ".yaw", location.getYaw());
        yaml.set(path + ".pitch", location.getPitch());
        saveAsync();
    }

    public Optional<Location> getArena(String name) {
        Location loc = arenas.get(name.toLowerCase());
        return Optional.ofNullable(loc == null ? null : loc.clone());
    }

    public Collection<String> getArenaNames() {
        return arenas.keySet();
    }

    public void setPlayerArena(UUID playerId, String arenaName) {
        playerArenas.put(playerId, arenaName.toLowerCase());
    }

    public String getPlayerArena(UUID playerId) {
        return playerArenas.get(playerId);
    }

    public void saveAsync() {
        Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
            try {
                yaml.save(file);
            } catch (IOException e) {
                plugin.getLogger().warning("Failed to save arenas.yml: " + e.getMessage());
            }
        });
    }
}
