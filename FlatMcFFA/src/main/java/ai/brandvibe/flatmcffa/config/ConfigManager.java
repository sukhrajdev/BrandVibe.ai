package ai.brandvibe.flatmcffa.config;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.minimessage.MiniMessage;
import org.bukkit.configuration.file.FileConfiguration;

public final class ConfigManager {
    private final FlatMcFFAPlugin plugin;
    private final MiniMessage miniMessage = MiniMessage.miniMessage();

    public ConfigManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    public void reload() {
        plugin.reloadConfig();
    }

    public FileConfiguration config() {
        return plugin.getConfig();
    }

    public Component message(String key) {
        String raw = config().getString("messages." + key, "<red>Missing message: " + key);
        return miniMessage.deserialize(raw);
    }

    public Component message(String key, String... replacements) {
        String raw = config().getString("messages." + key, "<red>Missing message: " + key);
        for (int i = 0; i + 1 < replacements.length; i += 2) {
            raw = raw.replace(replacements[i], replacements[i + 1]);
        }
        return miniMessage.deserialize(raw);
    }
}
