#!/bin/bash

# Script pour pousser le projet sur GitHub
# Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub

echo "🚀 Préparation du push vers GitHub..."
echo ""

# Demander le nom d'utilisateur GitHub
read -p "Entrez votre nom d'utilisateur GitHub: " GITHUB_USERNAME

# Demander le nom du repository
read -p "Entrez le nom du repository (ou appuyez sur Entrée pour 'africano-can2025'): " REPO_NAME
REPO_NAME=${REPO_NAME:-africano-can2025}

echo ""
echo "📦 Configuration du remote GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

echo ""
echo "🌿 Vérification de la branche..."
git branch -M main

echo ""
echo "📤 Push vers GitHub..."
git push -u origin main

echo ""
echo "✅ Terminé ! Votre projet est maintenant sur GitHub."
echo "🔗 URL: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Allez sur https://www.netlify.com"
echo "   2. Connectez votre compte GitHub"
echo "   3. Importez le repository ${REPO_NAME}"
echo "   4. Netlify déploiera automatiquement votre site !"

