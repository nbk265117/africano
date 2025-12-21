# 🚀 Démarrage Rapide - GitHub & Netlify

## Étape 1 : Créer le repository sur GitHub

1. Allez sur https://github.com/new
2. Nommez votre repository (ex: `africano-can2025`)
3. **Ne cochez PAS** "Initialize with README"
4. Cliquez sur **"Create repository"**

## Étape 2 : Pousser le code sur GitHub

### Option A : Utiliser le script automatique

```bash
./push-to-github.sh
```

Le script vous demandera votre nom d'utilisateur GitHub et le nom du repository.

### Option B : Commandes manuelles

Remplacez `VOTRE_USERNAME` et `NOM_DU_REPO` par vos valeurs :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/NOM_DU_REPO.git
git branch -M main
git push -u origin main
```

## Étape 3 : Déployer sur Netlify

1. **Allez sur https://www.netlify.com**
2. **Connectez-vous** avec votre compte GitHub
3. Cliquez sur **"Add new site"** > **"Import an existing project"**
4. **Sélectionnez** votre repository `africano-can2025`
5. Netlify détectera automatiquement :
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Cliquez sur **"Deploy site"**
7. Attendez quelques minutes... 🎉
8. Votre site sera accessible sur `https://votre-site.netlify.app`

## ✅ C'est tout !

Votre site est maintenant en ligne ! Chaque fois que vous pousserez du code sur GitHub, Netlify redéploiera automatiquement.

## 🔄 Mettre à jour le site

```bash
# Faire vos modifications
# ...

# Commiter et pousser
git add .
git commit -m "Description des modifications"
git push

# Netlify redéploiera automatiquement !
```

