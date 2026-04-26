package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.Bukkit;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class KitManager {
    private final FlatMcFFAPlugin plugin;
    private final Map<String, ItemStack[]> contents = new ConcurrentHashMap<>();
    private final Map<String, ItemStack[]> armor = new ConcurrentHashMap<>();
    private final File file;
    private final YamlConfiguration yaml;

    public KitManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
        this.file = new File(plugin.getDataFolder(), "kits.yml");
        if (!file.exists()) plugin.saveResource("kits.yml", false);
        this.yaml = YamlConfiguration.loadConfiguration(file);
        load();
    }

    public void load() {
        contents.clear();
        armor.clear();
        if (!yaml.isConfigurationSection("kits")) return;
        for (String kit : yaml.getConfigurationSection("kits").getKeys(false)) {
            ItemStack[] c = ((java.util.List<ItemStack>) yaml.getList("kits." + kit + ".contents", java.util.List.of())).toArray(ItemStack[]::new);
            ItemStack[] a = ((java.util.List<ItemStack>) yaml.getList("kits." + kit + ".armor", java.util.List.of())).toArray(ItemStack[]::new);
            contents.put(kit.toLowerCase(), c);
            armor.put(kit.toLowerCase(), a);
        }
    }

    public void setKit(String name, Player player) {
        String key = name.toLowerCase();
        contents.put(key, player.getInventory().getContents());
        armor.put(key, player.getInventory().getArmorContents());
        yaml.set("kits." + key + ".contents", player.getInventory().getContents());
        yaml.set("kits." + key + ".armor", player.getInventory().getArmorContents());
        saveAsync();
    }

    public boolean giveKit(Player player, String name) {
        String key = name.toLowerCase();
        ItemStack[] c = contents.get(key);
        ItemStack[] a = armor.get(key);
        if (c == null) return false;
        player.getInventory().clear();
        player.getInventory().setContents(c.clone());
        if (a != null) player.getInventory().setArmorContents(a.clone());
        player.updateInventory();
        return true;
    }

    public Collection<String> getKits() {
        return contents.keySet();
    }

    public void saveAsync() {
        Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
            try {
                yaml.save(file);
            } catch (IOException e) {
                plugin.getLogger().warning("Failed to save kits.yml: " + e.getMessage());
            }
        });
    }
}
