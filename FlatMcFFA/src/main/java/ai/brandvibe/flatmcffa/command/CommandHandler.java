package ai.brandvibe.flatmcffa.command;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public final class CommandHandler implements CommandExecutor, TabCompleter {
    private final FlatMcFFAPlugin plugin;

    public CommandHandler(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage("Players only.");
            return true;
        }
        if (plugin.getCombatManager().isTagged(player) && args.length > 0 && !args[0].equalsIgnoreCase("kits")) {
            player.sendMessage("§cYou cannot use this while in combat.");
            return true;
        }

        if (args.length == 0) {
            plugin.getGuiManager().openArenaMenu(player, 0);
            return true;
        }

        switch (args[0].toLowerCase()) {
            case "setarena" -> {
                if (args.length < 2) return false;
                plugin.getArenaManager().setArena(args[1], player.getLocation());
                player.sendMessage("§aArena saved: " + args[1]);
            }
            case "arenas" -> player.sendMessage("§eArenas: §f" + String.join(", ", plugin.getArenaManager().getArenaNames()));
            case "arena" -> {
                if (args.length < 2) return false;
                if (args.length >= 3 && args[2].equalsIgnoreCase("reset")) {
                    plugin.getResetManager().resetArena(args[1]);
                    player.sendMessage("§aArena reset started: " + args[1]);
                    return true;
                }
                plugin.getArenaManager().getArena(args[1]).ifPresentOrElse(loc -> {
                    plugin.getArenaManager().setPlayerArena(player.getUniqueId(), args[1]);
                    plugin.getTeleportManager().requestTeleport(player, loc, () -> {});
                }, () -> player.sendMessage("§cArena not found."));
            }
            case "setkit" -> {
                if (args.length < 2) return false;
                plugin.getKitManager().setKit(args[1], player);
                player.sendMessage("§aKit saved: " + args[1]);
            }
            case "kits" -> player.sendMessage("§eKits: §f" + String.join(", ", plugin.getKitManager().getKits()));
            case "kit" -> {
                if (args.length < 2) return false;
                if (plugin.getCooldownManager().isOnCooldown(player.getUniqueId(), "kit")) {
                    long remain = plugin.getCooldownManager().getRemainingMs(player.getUniqueId(), "kit") / 1000;
                    player.sendMessage("§cKit cooldown: " + remain + "s");
                    return true;
                }
                if (!plugin.getKitManager().giveKit(player, args[1])) {
                    player.sendMessage("§cKit not found.");
                    return true;
                }
                plugin.getCooldownManager().set(player.getUniqueId(), "kit", plugin.getConfig().getLong("cooldowns.kit-ms", 3000));
                player.sendMessage("§aKit applied: " + args[1]);
            }
            case "reload" -> {
                plugin.getConfigManager().reload();
                player.sendMessage("§aFlatMcFFA config reloaded.");
            }
            default -> {
                return false;
            }
        }
        return true;
    }

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {
        List<String> out = new ArrayList<>();
        if (args.length == 1) {
            out.addAll(List.of("setarena", "arenas", "arena", "setkit", "kits", "kit", "reload"));
            return out;
        }
        if (args.length == 2 && (args[0].equalsIgnoreCase("arena") || args[0].equalsIgnoreCase("kit"))) {
            if (args[0].equalsIgnoreCase("arena")) out.addAll(plugin.getArenaManager().getArenaNames());
            else out.addAll(plugin.getKitManager().getKits());
        }
        if (args.length == 3 && args[0].equalsIgnoreCase("arena")) out.add("reset");
        return out;
    }
}
