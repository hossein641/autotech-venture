#!/bin/bash

echo "🔍 Checking blog component files..."
echo "════════════════════════════════════════"

# Check if blog component directory exists
if [ ! -d "components/blog" ]; then
    echo "❌ components/blog directory missing"
    echo "📝 Creating components/blog directory..."
    mkdir -p components/blog
else
    echo "✅ components/blog directory exists"
fi

# List of required blog components
components=(
    "BlogCard.tsx"
    "BlogFilters.tsx" 
    "FeaturedPost.tsx"
    "RelatedPosts.tsx"
)

echo ""
echo "📄 Required Blog Components:"
echo "────────────────────────────"

missing_components=()

for component in "${components[@]}"; do
    if [ -f "components/blog/$component" ]; then
        echo "✅ $component exists"
    else
        echo "❌ $component missing"
        missing_components+=("$component")
    fi
done

# Check layout components
echo ""
echo "📄 Layout Components:"
echo "─────────────────────"

layout_components=(
    "Header.tsx"
    "Footer.tsx"
)

for component in "${layout_components[@]}"; do
    if [ -f "components/layout/$component" ]; then
        echo "✅ layout/$component exists"
    else
        echo "❌ layout/$component missing"
        missing_components+=("layout/$component")
    fi
done

echo ""
echo "📋 Summary:"
echo "───────────"

if [ ${#missing_components[@]} -eq 0 ]; then
    echo "🎉 All components found!"
    echo ""
    echo "🔍 If blog page still doesn't work, the issue might be:"
    echo "   1. Export/import mismatch in components"
    echo "   2. TypeScript errors in component files"
    echo "   3. Circular dependency between components"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Check browser console for specific error"
    echo "   2. Run: npm run build (to check for TypeScript errors)"
    echo "   3. Share the exact error message from console"
else
    echo "❌ Missing ${#missing_components[@]} component(s):"
    for component in "${missing_components[@]}"; do
        echo "   - $component"
    done
    echo ""
    echo "🔧 These components need to be created for the blog to work."
fi

echo ""
echo "🔍 To see the exact error:"
echo "   1. Open browser dev tools (F12)"
echo "   2. Go to Console tab"
echo "   3. Visit the blog page"
echo "   4. Share the red error message"