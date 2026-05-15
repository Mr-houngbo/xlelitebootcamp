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
    
    // Nettoyage et hachage des données utilisateur
    const user_data: any = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };

    if (userData.email) user_data.em = [hashData(userData.email)];
    if (userData.phone) user_data.ph = [hashData(userData.phone, 'phone')];
    if (userData.firstName) user_data.fn = [hashData(userData.firstName)];
    if (userData.lastName) user_data.ln = [hashData(userData.lastName)];
    if (userData.externalId) user_data.external_id = [hashData(userData.externalId)];

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: currentTimestamp,
          action_source: 'website',
          event_source_url: eventUrl,
          ...(eventId && { event_id: eventId }),
          user_data,
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
import crypto from 'crypto';

function hashData(data: string, type: 'email' | 'phone' | 'other' = 'other'): string {
  if (!data) return '';
  
  let normalizedData = data.trim().toLowerCase();
  
  // Pour les téléphones, Meta veut uniquement les chiffres (incluant l'indicatif pays)
  if (type === 'phone') {
    normalizedData = data.replace(/\D/g, ''); // Supprime tout ce qui n'est pas un chiffre
  }
  
  return crypto.createHash('sha256').update(normalizedData).digest('hex');
}
