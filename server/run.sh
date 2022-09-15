rm -rf view/*
cd ../app
npm run build
cp -r build/* ../server/view/
cd ../server
npm start