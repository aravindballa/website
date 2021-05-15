import { useEffect } from 'react';

export default function useViews() {
  useEffect(() => {
    fetch(`/api/views?slug=${location.pathname}`, { method: 'POST' }).then(() => {
      console.info('view registered');
    });
  }, []);
}
