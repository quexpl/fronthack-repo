#!/bin/bash
# This script automates adding new Sass components:
# - makes new sass file inside the sass/components directory
# - makes new html file with example HTML markup
# - adds sass file import to sass/app.sass


read -p "Type a machine name of new component: "  name
human_name="$(echo "$name" | sed 's/.*/\u&/')"
read -p "Type it's short description: " descr
read -p "Do you want to include also html file with example markup? [Y/n]"  html

echo ""
echo "------------------------------------------------------------"


echo "   Creating Sass file for the new $human_name component"
sed "s/Example/$human_name/g" sass/components/!EXAMPLE.sass > sass/components/_$name.sass
sed -i "s/example/$name/g" sass/components/_$name.sass
sed -i "3,8d" sass/components/_$name.sass
sed -i "3i\/\/ $descr" sass/components/_$name.sass


if [[ $html =~ ^([yY][eE][sS]|[yY])$ ]]
then
  echo "   Creating example html file for the new $human_name component"
  sed "s/[Ee][Xx][Aa][Mm][Pp][Ll][Ee]/$name/g" sass/components/html/!EXAMPLE.html > sass/components/html/$name.html
  sed -i "s/\!EXAMPLE/$name/g" sass/components/_$name.sass
else
  sed -i "/\!EXAMPLE\.html/d" sass/components/_$name.sass
fi


echo "   Adding import to app.sass file"
sed -i "s/New components/&\n@import \"components\/$name\"/g" sass/app.sass

echo "   Done!"
echo "------------------------------------------------------------"


echo "If you are a MacOS user and \"sed\" throws you errors, install gnu-sed instead:"
echo "   $ brew install gnu-sed --default-names"
