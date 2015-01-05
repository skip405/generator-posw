# generator-posw [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

POSW stands for **P**lain **O**ld **S**emantic **W**ebsite. It's an opinionated [Yeoman](http://yeoman.io) generator that will help you code a static website from design mockups. As Yeoman uses [npm](http://npmjs.org/) and [Bower](http://bower.io/) you need to have those two installed too, but you already know that, don't you? :)

Those who don't like the word _Semantic_ when I speak about a website, not markup, can freely substitute that for something similar... **S**pectacular perhaps.

## Features

POSW comes with a bunch of stuff:

* It allows you to code either in PHP or HTML.
* It uses Sass as a CSS preprocessor. You need to have [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Sass](http://sass-lang.com) installed and in your PATH for this to work.
* The ``styles`` folder structure is made with [BEM](http://bem.info) in mind.
* Also it has a bunch of ready-to-use Grunt tasks that just work. More on that [below](#grunt-tasks).
* It encourages you to use [Bower](http://bower.io) as your dependencies manager

## Getting Started

Depending on your setup, you may need to run the commands with ``sudo``.

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
<project-folder>
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

The ``default`` task will [wire your Bower dependencies](https://github.com/stephenplusplus/grunt-wiredep), compile the [default sass](https://github.com/gruntjs/grunt-contrib-sass) files, supply the needed [vendor prefixes](https://github.com/nDmitry/grunt-autoprefixer) for some CSS properties and will [watch for changes](https://github.com/gruntjs/grunt-contrib-watch) to the files. After this task successfully runs and waits watching your files, you can start coding :) 

### ``grunt build``

The ``build`` task will create the ``build`` folder and copy the source files there making them production ready. Making HTML from PHP (if you choose PHP, otherwise grunt will copy the source files), concating Bower dependencies into one file and uglifying it, optimizing images using [``grunt-contrib-imagemin``](https://github.com/gruntjs/grunt-contrib-imagemin) and so on. Do make sure to open at least one file to check if the paths to files are correct, which they should be :)

The ``build`` folder will look like this:

```
<project-folder>
|_<build>
|___<images>
|___<scripts>
|______vendor.js
|______project-slug.min.js
|___<styles>
|______libs.css
|______project-slug.css
|___index.html
```

The ``vendor.js`` file will contain all of the Bower dependencies plus the files you choose to include into it (like custom jQuery plugins you don't want to inject by Bower and what not).

### ``grunt pack``

The ``pack`` task will make a fresh build, then compress it into a zipball with a name ``<projectSlug>.<dd-mm-yyyy>.zip`` and put it into the ``archives`` folder.

## PHP

As it's said in the features description you can choose to code in PHP. It will add the [grunt-php2html](https://github.com/bezoerb/grunt-php2html) task to convert PHP to HTML when running the ``build`` task. Make sure you carefully [set up the ``php-cgi`` binary](https://github.com/bezoerb/grunt-php2html#installing-php-cgi) for your system.

In order to just open the coded PHP in the browser you need a PHP interpreter. It may come in a form of a WAMP, MAMP, XAMPP or any other ..AMP of your choice. If you speak Russian you may prefer to use [Denwer](http://www.denwer.ru). Besides that, if you happen to use [PHPStorm](https://www.jetbrains.com/phpstorm/), you can set this up even fancier.

If you have any troubles making PHP work for you, please fire an issue and I'll do my best to help, if I can.

## License

MIT