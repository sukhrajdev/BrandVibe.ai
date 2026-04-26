package ai.brandvibe.flatmcffa.manager;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public final class CooldownManager {
    private final Map<UUID, Map<String, Long>> cooldowns = new ConcurrentHashMap<>();

    public boolean isOnCooldown(UUID playerId, String key) {
        Map<String, Long> playerCooldowns = cooldowns.get(playerId);
        if (playerCooldowns == null) return false;
        Long until = playerCooldowns.get(key);
        return until != null && until > System.currentTimeMillis();
    }

    public long getRemainingMs(UUID playerId, String key) {
        Map<String, Long> playerCooldowns = cooldowns.get(playerId);
        if (playerCooldowns == null) return 0;
        Long until = playerCooldowns.get(key);
        if (until == null) return 0;
        return Math.max(0, until - System.currentTimeMillis());
    }

    public void set(UUID playerId, String key, long durationMs) {
        cooldowns.computeIfAbsent(playerId, id -> new ConcurrentHashMap<>())
                .put(key, System.currentTimeMillis() + durationMs);
    }
}
