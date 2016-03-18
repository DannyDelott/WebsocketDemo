# copy over images
mkdir -p ./client/public/img/
cp -r ./client/img/ ./client/public/img/

# copy over css files
mkdir -p ./client/public/css/
cp ./client/index.html ./client/public/
cp -r ./client/css/ ./client/public/css/
cp ./node_modules/dropzone/dist/min/dropzone.min.css ./client/public/css/

# concatenate/uglify js files
BUNDLE=./client/public/bundle.js
BUNDLE_MIN=./client/public/bundle.min.js
rm $BUNDLE; touch $BUNDLE
while read p; do
  cat $p >> $BUNDLE
done < ./client/js/manifest.txt
node ./node_modules/uglifyjs/bin/uglifyjs $BUNDLE -o $BUNDLE_MIN

