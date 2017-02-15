### Homepage - [frontcraft.github.io/fronthack](http://frontcraft.github.io/fronthack/)

## Getting started

### 1. You need to have node.js installed in your system.

Using Mac? Do that with homebrew
```
brew update
brew install node
```

Using Ubuntu?
```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```


### 2. Download or clone

**[Use download link](https://github.com/frontcraft/fronthack/archive/master.zip)**
or paste that at a Terminal prompt:
```
git clone --depth=1 https://github.com/frontcraft/fronthack.git
cd fronthack
rm -rf .git
```


### 3. Install project dependencies

While being in fronthack folder, run this in terminal:
```
npm install
```


### 4. Start hacking

To start a gulp-based server which will watch your SASS changes and compile them into CSS run:

```
npm run dev
```
Now checkout files inside **sass/** and start hacking!

Get more info from our [How to work with Fronthack](https://github.com/frontcraft/fronthack/wiki/1.-How-to-work-with-Fronthack) wiki.

----------

Development Supported by [WAAT Ltd](http://waat.eu)