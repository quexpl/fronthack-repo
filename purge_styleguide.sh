#!/bin/bash
# In case when you decide to not use styleguide on the project, run
# ./purge_styleguide.sh command in the root of the bootsmacss directory to remove
# styleguide and all it's generating stuff.

echo "Removing styleguide files"
rm -rf ./styleguide
rm ./sass/styleguide-overrides.sass

echo "Removing styleguide generation tasks from Gulp"
sed -i '' 's/"gulp-watch": "~4.3.5",/"gulp-watch": "~4.3.5"/' package.json
sed -i '' "/sc5-styleguide/d" package.json

sed -i '' "/styleguide = require/d" gulpfile.js
sed -i '' "23,30d" gulpfile.js
sed -i '' "47,89d" gulpfile.js
sed -i '' "/    'styleguide',/d" gulpfile.js
sed -i '' "/    'images',/d" gulpfile.js
sed -i '' "/    'js',/d" gulpfile.js
sed -i '' "s/paths\.styleguide\.html, //g" gulpfile.js

echo "Done"
