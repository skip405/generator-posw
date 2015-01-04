# generator-posw [![Build Status](https://secure.travis-ci.org/skip405/generator-posw.png?branch=master)](https://travis-ci.org/skip405/generator-posw)

POSW stands for **P**lain **O**ld **S**emantic **W**ebsite. It's an opinionated [Yeoman](http://yeoman.io) generator that will help you code a static website from design mockups.

## Features

POSW comes with a bunch of stuff:

* It allows you to code either in PHP or HTML.
* It uses [Sass](http://sass-lang.com) as a CSS preprocessor.
* The ``styles`` folder structure is made with [BEM](http://bem.info) in mind.
* Also it has a bunch of ready-to-use Grunt tasks that just work. More on that below.
* It encourages you to use [Bower](http://bower.io) as your dependencies manager


## Getting Started

First you need to install Yeoman:

```bash
npm install -g yo
```

Then you need to install generator-posw from npm:

```bash
npm install -g generator-posw
```

Create a directory for your project and ``cd`` into it.

Finally, initiate the generator:

```bash
yo posw
```

Running this command will get you through a couple of questions to set you up. You'll need to specify what minimal version of Internet Explorer you need to support, what your language of preference is (PHP or HTML) and some other stuff.

If you choose PHP as your coding language, after this command you will hopefully get the following folder structure:

```
<project-slug>
|_<mockups>
|_<source>
|___<images>
|___<partials>
|___<scripts>
|______<libs>
|______project-slug.min.js
|___<styles>
|______<blocks>
|______<libs>
|______some default scss files
|___index.php
.bowerrc
bower.json
Gruntfile.js
package.json
```

and that's it, just a Plain Old Semantic Website.

## Grunt tasks

There are three powerful Grunt tasks that are pre-configured for you:

### ``grunt``

The default task will [wire your Bower dependencies](https://github.com/stephenplusplus/grunt-wiredep), compile the default sass

## PHP

As it's said in the features description you can choose to code in PHP. You'll have to set up a PHP interpreter.

### Getting To Know POSW




## License

MIT
