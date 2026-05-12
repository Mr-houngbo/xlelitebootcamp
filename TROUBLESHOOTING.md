# Guide de dépannage

## Erreur: "fetch failed" dans le middleware

### Symptômes
```
Error: fetch failed
    at context.fetch (E:\xlelitebootcamp\node_modules\next\dist\server\web\sandbox\context.js:321:60)
    at eval (webpack-internal:///(middleware)/./node_modules/@supabase/auth-js/dist/module/lib/helpers.js:121:25)
```

Ou avec plus de détails:
```
Error: unable to verify the first certificate
code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
```

### Cause
Le middleware Next.js ne peut pas se connecter à Supabase. Cela peut être dû à:

1. **Variables d'environnement manquantes ou incorrectes**
2. **URL Supabase invalide ou placeholder**
3. **Problème de certificat SSL** (proxy d'entreprise, antivirus, firewall)
4. **Problème de connexion réseau**

### Solution

#### 1. Vérifier la configuration Supabase

Exécutez le script de diagnostic:

```bash
node scripts/check-supabase-config.js
```

#### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service-role
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Où trouver ces valeurs:**

1. Connectez-vous à [supabase.com](https://supabase.com)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

#### 3. Résoudre le problème de certificat SSL

Si vous obtenez l'erreur "unable to verify the first certificate", cela signifie que votre environnement (proxy d'entreprise, antivirus, etc.) intercepte le trafic HTTPS.

**Solution temporaire (développement uniquement):**

Le script `npm run dev` a été configuré pour désactiver la vérification SSL:

```bash
npm run dev
```

**Solutions permanentes:**

1. **Configurer le certificat CA de votre entreprise:**
   ```bash
   set NODE_EXTRA_CA_CERTS=C:\path\to\your\company\ca-certificate.crt
   ```

2. **Désactiver temporairement l'antivirus/proxy** pour le développement

3. **Utiliser un VPN** si vous êtes sur un réseau d'entreprise restrictif

4. **Contacter votre administrateur réseau** pour obtenir les certificats appropriés

#### 4. Redémarrer le serveur

Après avoir configuré `.env.local`, redémarrez le serveur:

```bash
npm run dev
```

---

## Erreur: Hydration mismatch (RÉSOLU ✅)

### Symptômes
```
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties
className="scroll-smooth" vs className="scroll-smooth light"
```

### Solution appliquée
Ajout de `suppressHydrationWarning` sur l'élément `<html>` dans `app/layout.tsx`:

```tsx
<html lang="fr" className="scroll-smooth" suppressHydrationWarning>
```

Cet attribut indique à React que la différence entre le rendu serveur et client est intentionnelle (causée par next-themes).

---

## Commandes utiles

### Vérifier la configuration
```bash
node scripts/check-supabase-config.js
```

### Nettoyer et redémarrer
```bash
# Arrêter tous les processus Node
taskkill /F /IM node.exe

# Nettoyer le cache Next.js
rm -rf .next

# Redémarrer
npm run dev
```

### Tester l'authentification admin
```bash
node scripts/create-admin.js
```
