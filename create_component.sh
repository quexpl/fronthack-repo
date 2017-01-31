#!/bin/bash
# This script creates tasks necessarry to create new component:
# - create new sass gile inside sass/components directory
# - create new html filr with example markup
# - adds sass file to sass/app.sass


read -p "Type machine name of new component: "  name
read -p "Type it's short description: " descr
read -p "Do you want to include also html file with example markup? [Y/n]"  html


echo ""
echo "---"


echo "Creating Sass file for $name"
sed "s/[Ee]xample/$name/g" sass/components/!EXAMPLE.sass > sass/components/_$name.sass
sed -i "3,8d" sass/components/_$name.sass
sed -i "3i\/\/ $descr" sass/components/_$name.sass


if [[ $html =~ ^([yY][eE][sS]|[yY])$ ]]
then
  echo "Creating example html file for $name"
  sed "s/[Ee][Xx][Aa][Mm][Pp][Ll][Ee]/$name/g" sass/components/html/!EXAMPLE.html > sass/components/html/$name.html
  sed -i "s/\!EXAMPLE/$name/g" sass/components/_$name.sass
else
  sed -i "/\!EXAMPLE\.html/d" sass/components/_$name.sass
fi


echo "Adding import to app.sass file"
sed -i "s/New components/&\n@import \"components\/$name\"/g" sass/app.sass


echo "---"


echo "If you use MacOS and \"sed\" throws you errors, install gnu-sed instead:"
echo "$ brew install gnu-sed --default-names"
