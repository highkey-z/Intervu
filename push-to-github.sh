#!/bin/bash

echo "🚀 Pushing changes to GitHub..."
echo ""
echo "Enter your GitHub Personal Access Token when prompted"
echo "(Get one at: https://github.com/settings/tokens)"
echo ""

# Prompt for token
read -s -p "GitHub Token: " TOKEN
echo ""

# Push using token
git push https://$TOKEN@github.com/highkey-z/Intervu.git main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Vercel should automatically deploy your changes"
else
    echo "❌ Push failed. Check your token and try again."
fi
