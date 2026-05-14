'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Déclaration de type pour window.fbq
declare global {
  interface Window {
    fbq: any;
  }
}

// Constante pour l'ID du pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Types pour les événements Facebook
type FbEventOptions = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  [key: string]: any;
};

export const event = (name: string, options?: FbEventOptions, eventId?: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (eventId) {
      window.fbq('track', name, options, { eventID: eventId });
    } else {
      window.fbq('track', name, options);
    }
  }
};

// Fonction pour envoyer l'événement via l'API CAPI (Server-side)
export const capiEvent = async (eventName: string, eventData: Record<string, any> = {}, userData: Record<string, any> = {}, eventId?: string) => {
  try {
    const response = await fetch('/api/meta/capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
        userData,
        eventId,
        eventUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur CAPI:', error);
    return null;
  }
};

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    
    // Déclenche un PageView lors du changement de route
    pageview();
  }, [pathname, searchParams]);

  if (!FB_PIXEL_ID) {
    console.warn('Meta Pixel ID is missing from environment variables');
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt="Meta Pixel"
        />
      </noscript>
    </>
  );
}
