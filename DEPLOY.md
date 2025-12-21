# Guide de Déploiement

## 📦 Préparation pour GitHub

### 1. Créer un repository sur GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le (ex: `africano-can2025`)
4. Ne cochez PAS "Initialize with README" (on a déjà un README)
5. Cliquez sur "Create repository"

### 2. Pousser le code sur GitHub

```bash
# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: CAN 2025 tracking app"

# Renommer la branche en main (si nécessaire)
git branch -M main

# Ajouter le remote (remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/africano-can2025.git

# Pousser le code
git push -u origin main
```

## 🚀 Déploiement sur Netlify

### Option 1 : Via l'interface Netlify (Recommandé)

1. **Connecter GitHub à Netlify**
   - Allez sur [Netlify](https://www.netlify.com)
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "Add new site" > "Import an existing project"
   - Sélectionnez votre repository `africano-can2025`

2. **Configuration automatique**
   - Netlify détectera automatiquement la configuration dans `netlify.toml`
   - Les paramètres suivants seront utilisés :
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: 18

3. **Déploiement**
   - Cliquez sur "Deploy site"
   - Netlify construira et déploiera votre site automatiquement
   - Votre site sera accessible sur une URL comme `https://votre-site.netlify.app`

4. **Déploiements automatiques**
   - Chaque fois que vous pousserez du code sur GitHub, Netlify redéploiera automatiquement

### Option 2 : Via Netlify CLI

```bash
# Installer Netlify CLI globalement
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Initialiser le site
netlify init

# Déployer
netlify deploy --prod
```

## 🔧 Configuration

Le fichier `netlify.toml` contient toute la configuration nécessaire :
- Build command
- Publish directory
- Plugin Astro pour Netlify
- Version de Node.js

## 📝 Mise à jour du site

Pour mettre à jour le site après avoir modifié le code :

```bash
# Faire vos modifications
# ...

# Commiter les changements
git add .
git commit -m "Description des modifications"
git push

# Netlify déploiera automatiquement les changements
```

## 🌐 Domaine personnalisé (Optionnel)

1. Dans Netlify, allez dans "Site settings" > "Domain management"
2. Cliquez sur "Add custom domain"
3. Suivez les instructions pour configurer votre domaine

## ✅ Vérification

Après le déploiement, vérifiez que :
- ✅ La page d'accueil s'affiche correctement
- ✅ Les groupes sont visibles
- ✅ La page des matchs fonctionne
- ✅ Le filtre par groupe fonctionne
- ✅ Le design responsive fonctionne sur mobile

