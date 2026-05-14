# Meta Pixel & Conversions API (CAPI) - Guide d'Intégration

## 📋 Vue d'ensemble

Cette application utilise une **approche hybride** (Pixel côté navigateur + API Conversions côté serveur) pour maximiser la précision du tracking et éviter la perte de données due aux bloqueurs de cookies tiers.

## 🔧 Configuration requise

### 1. Variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Meta Pixel & CAPI Configuration
NEXT_PUBLIC_META_PIXEL_ID=votre_pixel_id_ici
META_CAPI_TOKEN=votre_token_acces_ici
META_TEST_EVENT_CODE=votre_code_test_ici
```

### 2. Obtenir les valeurs depuis Meta Business Manager

#### Pixel ID
1. Allez dans [Meta Business Manager](https://business.facebook.com/)
2. Menu : **Gestionnaire d'événements** → **Paramètres** → **Pixels**
3. Copiez l'ID du pixel (ex: `123456789012345`)

#### CAPI Token (Access Token)
1. Dans le même Gestionnaire d'événements
2. Cliquez sur **Paramètres** → **API Conversions**
3. Cliquez sur **Générer un token d'accès**
4. Copiez le token généré (ne sera pas sauvegardé par Meta)

#### Test Event Code
1. Dans **Paramètres** → **API Conversions**
2. Cliquez sur **Tester les événements**
3. Copiez le code de test (ex: `TEST12345`)

## 🎯 Événements implémentés

### 1. ViewContent
- **Quand :** Page d'accueil visitée
- **Type :** Pixel uniquement
- **Payload :** content_name, content_category

### 2. InitiateCheckout
- **Quand :** Formulaire d'inscription ouvert
- **Type :** Pixel uniquement
- **Payload :** value: 30000, currency: XOF

### 3. Lead
- **Quand :** Inscription réussie
- **Type :** Pixel + CAPI (avec déduplication via event_id)
- **Payload :** 
  - value: 30000, currency: XOF
  - Données utilisateur hachées (email, téléphone, nom)

## 🔒 Paramètres critiques pour le score EMQ

L'implémentation inclut tous les paramètres requis pour un score EMQ optimal :

### Côté Serveur (CAPI)
- ✅ `client_user_agent` : Agent utilisateur du navigateur (non haché)
- ✅ `client_ip_address` : Adresse IP du client (non haché)
- ✅ `event_source_url` : URL de la page où l'événement s'est produit
- ✅ `action_source` : Défini sur "website"
- ✅ `event_id` : Identifiant unique pour déduplication

### Données utilisateur hachées (SHA256)
- ✅ `em` : Email (haché)
- ✅ `ph` : Téléphone (haché)
- ✅ `fn` : Prénom (haché)
- ✅ `ln` : Nom (haché)

## 🧪 Test et validation

### 1. Tester avec le Test Event Code

Avant d'aller en production, activez le mode test :

```env
META_TEST_EVENT_CODE=votre_code_test_ici
```

Les événements envoyés apparaîtront dans **Tester les événements** du Gestionnaire d'événements.

### 2. Vérifier la déduplication

Dans l'outil "Tester les événements", vérifiez que :
- Les événements envoyés via Pixel et CAPI apparaissent
- Meta affiche "Dédoublonné" pour les événements avec le même `event_id`

### 3. Surveiller le score EMQ

1. Allez dans le Gestionnaire d'événements
2. Onglet : **Qualité des données**
3. Visez un score **EMQ ≥ 6.0**

Si le score est bas :
- Ajoutez d'autres paramètres (ville, pays, date de naissance)
- Vérifiez que les données utilisateur sont bien hachées

### 4. Surveiller la fraîcheur des données

- Vérifiez que l'envoi CAPI se fait en temps réel (délai ~0 minute)
- Un délai élevé peut indiquer un problème de configuration

## 📊 Structure des fichiers

```
components/
├── meta-pixel.tsx           # Composant Pixel + fonctions de tracking
└── home-tracking.tsx        # Tracking ViewContent page accueil

app/
├── api/meta/capi/route.ts   # API Route pour CAPI
└── layout.tsx               # Integration Pixel global

components/forms/
└── registration-form.tsx    # InitiateCheckout + Lead (avec event_id)
```

## 🚀 Prochaines étapes

1. **Configurer les variables d'environnement** avec vos vraies valeurs Meta
2. **Tester avec le Test Event Code** avant production
3. **Vérifier le score EMQ** dans le Gestionnaire d'événements
4. **Surveiller les métriques** (déduplication, fraîcheur des données)
5. **Désactiver le Test Event Code** pour aller en production

## 🔧 Débogage

### Problème : Aucun événement reçu
- Vérifiez que `NEXT_PUBLIC_META_PIXEL_ID` est correct
- Vérifiez que `META_CAPI_TOKEN` est valide et non expiré
- Consultez la console du navigateur pour les erreurs

### Problème : Score EMQ bas
- Ajoutez plus de paramètres utilisateur (ville, pays, etc.)
- Vérifiez que les données sont bien hachées en SHA256
- Vérifiez que client_ip_address et client_user_agent sont envoyés

### Problème : Événements non dédoublonnés
- Vérifiez que le même `event_id` est envoyé via Pixel et CAPI
- Vérifiez que `event_name` est identique pour les deux envois

## 📚 Références Meta

- [Documentation API Conversions](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Guide de déduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [Paramètres recommandés](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event)
