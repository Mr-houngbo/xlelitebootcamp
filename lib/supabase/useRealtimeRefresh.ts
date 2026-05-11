import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';

/**
 * Combines Supabase Realtime subscriptions with a polling fallback.
 * Works even if tables are not published in supabase_realtime.
 *
 * @param tables - Supabase table names to watch
 * @param onRefresh - Callback to run on any change or poll tick
 * @param pollingMs - Polling interval in ms (default: 30 000)
 */
export function useRealtimeRefresh(
  tables: string[],
  onRefresh: () => void,
  pollingMs = 30_000
) {
  const onRefreshRef = useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  useEffect(() => {
    // 1. Supabase Realtime subscription
    const channelName = `realtime-${tables.join('-')}-${Math.random()}`;
    let channel = supabase.channel(channelName);

    tables.forEach(table => {
      channel = channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => onRefreshRef.current()
      );
    });

    channel.subscribe();

    // 2. Polling fallback — ensures freshness even without realtime
    const interval = setInterval(() => {
      onRefreshRef.current();
    }, pollingMs);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
