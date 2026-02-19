'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics({ measurementId }) {
  const pathname = usePathname();

  // Track client-side navigation
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_path: pathname,
      });
    }
  }, [pathname, measurementId]);

  return null;
}
