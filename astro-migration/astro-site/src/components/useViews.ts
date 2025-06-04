import { useEffect } from 'react';

export default function useViews() {
  useEffect(() => {
    fetch(`/api/views`, {
      method: 'POST',
      body: JSON.stringify({
        slug: location.pathname,
        width: window.innerWidth,
        timestamp: new Date().toISOString(),
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }).then(() => {
      console.info('view registered');
    });
  }, []);
}
