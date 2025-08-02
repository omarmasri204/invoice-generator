#!/bin/bash

echo "🚀 Invoice Generator Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Please add your GitHub repository as remote origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/invoice-generator.git"
    echo "   git push -u origin main"
    echo ""
    echo "📋 After pushing to GitHub, follow these steps:"
else
    echo "✅ Git remote already configured"
    echo "📤 Pushing to GitHub..."
    git push origin main
fi

echo ""
echo "🎯 Deployment Options:"
echo "======================"
echo ""
echo "1. 🚀 Deploy to Vercel (Frontend) + Railway (Backend)"
echo "   - Frontend: https://vercel.com"
echo "   - Backend: https://railway.app"
echo ""
echo "2. 📖 Read the full deployment guide:"
echo "   - Open DEPLOYMENT.md for detailed instructions"
echo ""
echo "3. 🔧 Quick setup commands:"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Install Railway CLI: npm i -g @railway/cli"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway"
echo "3. Deploy frontend to Vercel"
echo "4. Configure environment variables"
echo "5. Test your deployment"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your deployment!" 