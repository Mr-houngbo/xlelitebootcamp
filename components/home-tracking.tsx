'use client';

import { useEffect } from 'react';
import { event as fbEvent } from '@/components/meta-pixel';

export default function HomeTracking() {
  useEffect(() => {
    // Événement ViewContent pour la page d'accueil
    fbEvent('ViewContent', {
      content_name: 'XL Elite Bootcamp - Page Accueil',
      content_category: 'Formation Excel',
    });
  }, []);

  return null;
}
