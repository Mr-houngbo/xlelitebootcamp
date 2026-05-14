import { NextResponse } from 'next/server';

// Variables d'environnement requises
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
const API_VERSION = 'v19.0'; // Version actuelle recommandée de l'API Graph

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, eventData, userData, eventId, eventUrl, userAgent } = body;

    // Vérification des variables d'environnement
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      console.warn('Meta CAPI: Pixel ID ou Token manquant');
      return NextResponse.json(
        { error: 'Configuration Meta CAPI incomplète' },
        { status: 500 }
      );
    }

    // Récupérer l'adresse IP du client depuis les headers
    const clientIp = 
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
      request.headers.get('x-real-ip') || 
      '';

    // Construction de la payload pour l'API Conversions
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: currentTimestamp,
          action_source: 'website',
          event_source_url: eventUrl,
          ...(eventId && { event_id: eventId }), // event_id pour déduplication
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            // Hachage des données utilisateur (Doit être en SHA256 côté client idéalement, 
            // ou ici si les données brutes sont passées)
            ...(userData.email && { em: [hashData(userData.email)] }),
            ...(userData.phone && { ph: [hashData(userData.phone)] }),
            ...(userData.firstName && { fn: [hashData(userData.firstName)] }),
            ...(userData.lastName && { ln: [hashData(userData.lastName)] }),
          },
          custom_data: {
            ...eventData,
          },
        },
      ],
      // Indiquer qu'il s'agit d'un événement de test si la variable est définie
      ...(process.env.META_TEST_EVENT_CODE && { test_event_code: process.env.META_TEST_EVENT_CODE })
    };

    // Appel à l'API Graph de Facebook
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Erreur API Meta Conversions:', data);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi à Meta', details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, fbResponse: data });
  } catch (error) {
    console.error('Erreur inattendue API Meta:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour hacher les données (requis par Meta CAPI)
// Note: Dans un environnement de production réel, utilisez crypto de Node.js
import crypto from 'crypto';

function hashData(data: string): string {
  if (!data) return '';
  // Meta requiert des données en minuscules, sans espaces avant hachage
  const normalizedData = data.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalizedData).digest('hex');
}
