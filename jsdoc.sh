echo "JSDocing..."
for file in *.js
do
  echo "JSDocing $file..."
  ./node_modules/.bin/jsdoc -d ./doc/$file ./$file
done;