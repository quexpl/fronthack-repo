#!/bin/bash
# This script creates tasks necessarry to create new component:
# - create new sass gile inside sass/components directory
# - create new html filr with example markup
# - adds sass file to sass/app.sass


read -p "Type machine name of new component: "  name
read -p "Do you want to include also it's example html file? [Y/n]"  html


echo "Creating Sass file for $name"
sed "s/[Ee]xample/$name/g" sass/components/!EXAMPLE.sass > sass/components/_$name.sass


if [[ $html =~ ^([yY][eE][sS]|[yY])$ ]]
then
  echo "Creating example html file for $name"
  sed "s/[Ee][Xx][Aa][Mm][Pp][Ll][Ee]/$name/g" sass/components/html/!EXAMPLE.html > sass/components/html/$name.html
  sed -i "" "s/\!EXAMPLE/$name/g" sass/components/_$name.sass
else
  sed -i "" "/\!EXAMPLE\.html/d" sass/components/_$name.sass
fi


echo "Adding import to app.sass file - END OF LINE DOES NOT WORK CORRECTLY, CHECK THE sass/app.sass FILE!"
sed -i "" "s/New components/&\
@import \"components\/$name\"/g" sass/app.sass
