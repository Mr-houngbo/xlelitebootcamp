# XL Elite Bootcamp - Formation Microsoft Excel Expert

Application web mobile-first premium pour la gestion des inscriptions au bootcamp de certification Microsoft Excel Expert.

## 🎯 Objectif

Maximiser les inscriptions en offrant une expérience utilisateur exceptionnelle avec un funnel de conversion optimisé et une gestion business complète.

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Emails**: Resend
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion

## 📁 Structure du Projet

```
app/
├── (public)/              # Pages publiques
│   ├── page.tsx          # Landing page
│   ├── programme/        # Détail du programme
│   ├── inscription/      # Formulaire d'inscription
│   ├── temoignages/      # Témoignages
│   └── ...
├── (admin)/              # Dashboard admin
│   ├── dashboard/        # KPIs et analytics
│   ├── participants/     # Gestion des participants
│   └── settings/         # Configuration
├── api/                  # API routes
├── components/           # Composants réutilisables
│   ├── ui/              # shadcn/ui components
│   ├── forms/           # Formulaires
│   ├── sections/        # Sections de pages
│   └── admin/           # Composants admin
├── lib/                  # Utilitaires
│   ├── supabase.ts      # Client Supabase
│   ├── validations.ts   # Schémas Zod
│   ├── emails.ts        # Templates emails
│   └── utils.ts         # Fonctions utilitaires
└── types/               # Types TypeScript
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- Compte Supabase
- Compte Resend

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd xl-elite-bootcamp
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configuration des variables d'environnement**
```bash
cp .env.local.example .env.local
```

Configurer les variables suivantes dans `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase

# Resend
RESEND_API_KEY=votre_cle_resend
RESEND_FROM_EMAIL=noreply@xlbootcamp.com
RESEND_FROM_NAME=XL Elite Bootcamp

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@xlbootcamp.com
```

4. **Initialiser la base de données**
```bash
pnpm db:push
```

5. **Démarrer le serveur de développement**
```bash
pnpm dev
```

L'application est disponible sur `http://localhost:3000`.

## 🗄️ Base de Données

### Tables principales

- **users**: Administrateurs
- **groups**: Groupes de formation (G1, G2, G3)
- **participants**: Participants inscrits
- **registrations**: Inscriptions avec statut de paiement
- **testimonials**: Témoignages clients
- **companies**: Entreprises partenaires
- **gallery**: Galerie de photos

### Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Politiques granulaires par rôle
- Validation backend avec Zod

## 📱 Pages Publiques

### Landing Page (`/`)
- Hero section avec CTA principal
- Statistiques animées
- Témoignages vedettes
- Avantages de la formation

### Programme (`/programme`)
- Timeline détaillée des 4 jours
- Compétences acquises
- Résultats concrets

### Inscription (`/inscription`)
- Formulaire optimisé pour la conversion
- Affichage temps réel des places disponibles
- Urgence avec deadline
- Validation stricte

## 🔧 Dashboard Admin

### KPIs principaux
- Taux de conversion global
- Revenus générés
- Taux de remplissage par groupe
- Évolution des inscriptions

### Gestion des participants
- Tableau complet avec filtres
- Actions bulk (email, export)
- Mise à jour statut paiement

### Configuration
- Gestion des groupes
- Ajout de témoignages
- Upload photos galerie

## 📧 Emails Transactionnels

### Templates disponibles
- **Confirmation inscription**: Détails formation + instructions paiement
- **Confirmation paiement**: Validation inscription + prochaines étapes
- **Notification admin**: Nouvelle inscription à traiter

### Configuration Resend
```typescript
// Envoi d'email
await sendRegistrationConfirmation({
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean@example.com",
  groupName: "G1",
  timeSlot: "09h-12h",
  registrationFee: 25000,
  trainingFee: 125000,
  totalAmount: 150000,
  deadline: "02 juin 2025"
});
```

## 🎨 Design System

### Couleurs
- **Vert principal**: #10B981 (succès, confiance)
- **Orange accent**: #F59E0B (urgence, action)
- **Gris foncé**: #1F2937 (premium, autorité)

### Composants
- Boutons avec effets hover premium
- Cards avec shadows élégants
- Forms validation temps réel
- Animations subtiles (Framer Motion)

## 📊 Analytics & Tracking

### Métriques business
- Funnel d'inscription (visite → inscription → paiement)
- Source acquisition (direct, social, referral)
- Taux conversion par page

### KPIs techniques
- Performance Lighthouse (95+)
- Core Web Vitals
- Taux de rebond mobile (< 40%)

## 🔒 Sécurité

### Protection formulaire
- Rate limiting API routes
- Honeypot field anti-spam
- Validation Zod côté client et serveur
- Sanitization inputs

### Authentification admin
- Supabase Auth avec JWT
- Rôle admin obligatoire pour dashboard
- Sessions sécurisées

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Build
pnpm build

# Deploy
vercel --prod
```

### Environment variables Vercel
Configurer toutes les variables dans le dashboard Vercel.

### Domaine personnalisé
1. Configurer le domaine dans Vercel
2. Mettre à jour les DNS
3. Configurer SSL (automatique avec Vercel)

## 📈 Performance Optimisation

### Next.js optimizations
- Static Generation pour pages publiques
- Images optimisées avec next/image
- Code splitting automatique
- Bundle analysis

### Database optimizations
- Index sur colonnes fréquemment queryées
- Connection pooling Supabase
- Views pour analytics complexes

## 🧪 Tests

### Tests unitaires (à implémenter)
```bash
pnpm test
```

### Tests E2E (à implémenter)
```bash
pnpm test:e2e
```

## 🔄 Maintenance

### Tâches régulières
- Backup base de données (automatique Supabase)
- Monitoring performances (Vercel Analytics)
- Mise à jour dépendances (mensuel)
- Review logs erreurs (hebdomadaire)

### Monitoring
- Erreurs: Sentry (à configurer)
- Performance: Vercel Speed Insights
- Uptime: UptimeRobot (recommandé)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Créer une Pull Request

## 📝 License

MIT License - voir fichier LICENSE

## 📞 Support

Pour toute question ou support technique:
- 📧 Email: support@xlbootcamp.com
- 📱 Téléphone: +226 XX XX XX XX

---

**XL Elite Bootcamp** - L'excellence Excel, en 4 jours.
