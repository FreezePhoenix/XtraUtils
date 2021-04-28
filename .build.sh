printf '#include <iostream>\nint main() { std::cout<<"HELLO FROM DOCKER C++"<<std::endl; return 0; }' > helloworld.cpp

docker run \
  --rm \
  -v $(pwd):/src \
  -u emscripten \
  trzeci/emscripten \
  emcc helloworld.cpp -o helloworld.js --closure 1

echo "Installing deps"
npm i jsdoc babel eslint

echo "Compiling ./src to ./lib"
./node_modules/.bin/babel -q ./src -d ./lib

echo "Linting ./src"
./node_modules/.bin/eslint -c ./src/.eslintrc --fix ./src

echo "Documenting ./src"
./node_modules/.bin/jsdoc ./src -d ./docs -R ./README.md -c ./src/.jsdocrc
cp ./src/*.js ./docs/scripts
echo "All done!"
exit 0
