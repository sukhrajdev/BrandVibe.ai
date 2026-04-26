package ai.brandvibe.flatmcffa;

import ai.brandvibe.flatmcffa.command.CommandHandler;
import ai.brandvibe.flatmcffa.config.ConfigManager;
import ai.brandvibe.flatmcffa.manager.ArenaManager;
import ai.brandvibe.flatmcffa.manager.CombatManager;
import ai.brandvibe.flatmcffa.manager.CooldownManager;
import ai.brandvibe.flatmcffa.manager.GUIManager;
import ai.brandvibe.flatmcffa.manager.KitManager;
import ai.brandvibe.flatmcffa.manager.PlayerManager;
import ai.brandvibe.flatmcffa.manager.ResetManager;
import ai.brandvibe.flatmcffa.manager.ScoreboardManager;
import ai.brandvibe.flatmcffa.manager.StatsManager;
import ai.brandvibe.flatmcffa.manager.TeleportManager;
import org.bukkit.command.PluginCommand;
import org.bukkit.plugin.java.JavaPlugin;

public final class FlatMcFFAPlugin extends JavaPlugin {

    private ConfigManager configManager;
    private CooldownManager cooldownManager;
    private ArenaManager arenaManager;
    private KitManager kitManager;
    private StatsManager statsManager;
    private CombatManager combatManager;
    private TeleportManager teleportManager;
    private ScoreboardManager scoreboardManager;
    private GUIManager guiManager;
    private ResetManager resetManager;
    private PlayerManager playerManager;

    @Override
    public void onEnable() {
        saveDefaultConfig();

        this.configManager = new ConfigManager(this);
        this.cooldownManager = new CooldownManager();
        this.arenaManager = new ArenaManager(this);
        this.kitManager = new KitManager(this);
        this.statsManager = new StatsManager(this);
        this.combatManager = new CombatManager(this);
        this.teleportManager = new TeleportManager(this);
        this.scoreboardManager = new ScoreboardManager(this);
        this.guiManager = new GUIManager(this);
        this.resetManager = new ResetManager(this);
        this.playerManager = new PlayerManager(this);

        CommandHandler commandHandler = new CommandHandler(this);
        PluginCommand ffaCommand = getCommand("ffa");
        if (ffaCommand != null) {
            ffaCommand.setExecutor(commandHandler);
            ffaCommand.setTabCompleter(commandHandler);
        }

        getServer().getPluginManager().registerEvents(combatManager, this);
        getServer().getPluginManager().registerEvents(teleportManager, this);
        getServer().getPluginManager().registerEvents(guiManager, this);
        getServer().getPluginManager().registerEvents(playerManager, this);

        combatManager.startActionbarTask();
        scoreboardManager.start();
        resetManager.startAutoReset();

        getLogger().info("FlatMcFFA enabled.");
    }

    @Override
    public void onDisable() {
        statsManager.saveAsync();
        arenaManager.saveAsync();
        kitManager.saveAsync();
        resetManager.shutdown();
        scoreboardManager.shutdown();
        getLogger().info("FlatMcFFA disabled.");
    }

    public ConfigManager getConfigManager() { return configManager; }
    public CooldownManager getCooldownManager() { return cooldownManager; }
    public ArenaManager getArenaManager() { return arenaManager; }
    public KitManager getKitManager() { return kitManager; }
    public StatsManager getStatsManager() { return statsManager; }
    public CombatManager getCombatManager() { return combatManager; }
    public TeleportManager getTeleportManager() { return teleportManager; }
    public ScoreboardManager getScoreboardManager() { return scoreboardManager; }
    public GUIManager getGuiManager() { return guiManager; }
    public ResetManager getResetManager() { return resetManager; }
    public PlayerManager getPlayerManager() { return playerManager; }
}
