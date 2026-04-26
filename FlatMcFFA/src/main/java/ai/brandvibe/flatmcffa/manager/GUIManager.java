package ai.brandvibe.flatmcffa.manager;

import ai.brandvibe.flatmcffa.FlatMcFFAPlugin;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.Inventory;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;

import java.util.ArrayList;
import java.util.List;

public final class GUIManager implements Listener {
    private final FlatMcFFAPlugin plugin;

    public GUIManager(FlatMcFFAPlugin plugin) {
        this.plugin = plugin;
    }

    public void openArenaMenu(Player player, int page) {
        Inventory inv = Bukkit.createInventory(null, 54, "FFA Arenas");
        fillBackground(inv);
        List<String> arenas = new ArrayList<>(plugin.getArenaManager().getArenaNames());
        int start = page * 28;
        for (int i = 0; i < 28 && start + i < arenas.size(); i++) {
            inv.setItem(slotFromIndex(i), named(Material.END_CRYSTAL, "§b" + arenas.get(start + i)));
        }
        player.openInventory(inv);
    }

    public void openKitMenu(Player player, int page) {
        Inventory inv = Bukkit.createInventory(null, 54, "FFA Kits");
        fillBackground(inv);
        List<String> kits = new ArrayList<>(plugin.getKitManager().getKits());
        int start = page * 28;
        for (int i = 0; i < 28 && start + i < kits.size(); i++) {
            inv.setItem(slotFromIndex(i), named(Material.NETHERITE_SWORD, "§d" + kits.get(start + i)));
        }
        player.openInventory(inv);
    }

    @EventHandler
    public void onClick(InventoryClickEvent e) {
        if (!(e.getWhoClicked() instanceof Player player)) return;
        String title = e.getView().getTitle();
        if (!title.equals("FFA Arenas") && !title.equals("FFA Kits")) return;
        e.setCancelled(true);
        if (e.getCurrentItem() == null || !e.getCurrentItem().hasItemMeta()) return;
        if (plugin.getCooldownManager().isOnCooldown(player.getUniqueId(), "gui-click")) return;
        plugin.getCooldownManager().set(player.getUniqueId(), "gui-click", plugin.getConfig().getLong("cooldowns.gui-click-ms", 250));

        String name = e.getCurrentItem().getItemMeta().getDisplayName().replace("§b", "").replace("§d", "").toLowerCase();
        if (title.equals("FFA Arenas")) {
            plugin.getArenaManager().getArena(name).ifPresent(loc -> {
                plugin.getArenaManager().setPlayerArena(player.getUniqueId(), name);
                plugin.getTeleportManager().requestTeleport(player, loc, () -> {});
            });
        } else {
            plugin.getKitManager().giveKit(player, name);
        }
    }

    private void fillBackground(Inventory inv) {
        ItemStack pane = named(Material.GRAY_STAINED_GLASS_PANE, " ");
        for (int i = 0; i < inv.getSize(); i++) inv.setItem(i, pane);
    }

    private int slotFromIndex(int i) {
        int row = i / 7;
        int col = i % 7;
        return 10 + row * 9 + col;
    }

    private ItemStack named(Material material, String name) {
        ItemStack item = new ItemStack(material);
        ItemMeta meta = item.getItemMeta();
        meta.setDisplayName(name);
        item.setItemMeta(meta);
        return item;
    }
}
