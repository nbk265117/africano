# CAN 2025 - Maroc 🇲🇦

Application de suivi de la Coupe d'Afrique des Nations 2025 au Maroc, construite avec Astro et React.

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:4321`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📁 Structure du projet

- `src/data/groups.ts` - Données des groupes et équipes
- `src/data/matches.ts` - Données des matchs (36 matchs programmés)
- `src/components/` - Composants React
- `src/pages/` - Pages Astro
- `src/layouts/` - Layouts Astro

## 🎨 Style

Le design s'inspire des couleurs du drapeau marocain (rouge et vert) avec des motifs africains.

## 🌐 Déploiement

### Netlify

Le projet est configuré pour être déployé sur Netlify. Il suffit de :

1. Connecter votre repository GitHub à Netlify
2. Netlify détectera automatiquement la configuration dans `netlify.toml`
3. Le déploiement se fera automatiquement à chaque push

### GitHub

Pour pousser le projet sur GitHub :

```bash
git init
git add .
git commit -m "Initial commit: CAN 2025 tracking app"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/africano-can2025.git
git push -u origin main
```

## 📝 Fonctionnalités

- ✅ Affichage des 6 groupes avec classements
- ✅ Calendrier complet des 36 matchs
- ✅ Filtrage par groupe
- ✅ Organisation des matchs par date
- ✅ Design responsive et style africain/marocain

## 🏆 Matchs

36 matchs programmés sur 3 journées :
- Journée 1 : 21-24 décembre 2025
- Journée 2 : 26-28 décembre 2025
- Journée 3 : 29-31 décembre 2025

