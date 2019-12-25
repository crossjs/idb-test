echo "Deploying..."

rm -rf dist

parcel build index.html

# commit
cd dist
git init
git add -A
git commit -m "pub"
git push -f https://github.com/crossjs/idb-test.git master:gh-pages

# back to root
cd ..
