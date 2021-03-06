'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

var notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
});

if (notifier.update) {
    notifier.notify();
}

var SkipcodeGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = pkg;
    },

    prompting: function () {
        var done = this.async();

        this.log(yosay(
            'Welcome to the Skipcode world!'
        ));

        var prompts = [{
            name: 'appname',
            message: 'What is your app\'s name?',
            default: process.cwd().split(path.sep).pop()
        }, {
            type: 'list',
            name: 'versionOfIE',
            message: 'What version of IE do you need to support?',
            choices: [
                { name: "IE8", value: "ie8" },
                { name: "IE9", value: "ie9" },
                { name: "No IE, lucky? :)", value: "iefree" }
            ]
        }, {
            type: 'list',
            name: 'templateLang',
            message: 'HTML or PHP?',
            choices: [
                { name: "HTML", value: "html" },
                { name: "PHP (Partials directory and grunt-php2html will be added )", value: "php" }
            ]
        }, {
            type: 'confirm',
            name: 'includeNormalize',
            message: 'Include normalize.css as a Bower dependency?',
            default: true
        }, {
            type: 'confirm',
            name: 'includeJquery',
            message: 'Include jQuery?',
            default: true
        }, {
            type: 'list',
            name: 'isJqueryLocal',
            message: 'Local install via Bower or from Google CDN?',
            choices: [
                { name: "Bower", value: "yes" },
                { name: "Google CDN", value: "no" }
            ],
            when: function(answers){
                return answers && answers.includeJquery;
            }
        }, {
            type: 'confirm',
            name: 'installDep',
            message: 'Run bower install and npm install after configuring?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.appname = props.appname;
            this.appnameSlug = this._.slugify(this.appname);
            this.versionOfIE = props.versionOfIE;
            this.includeNormalize = props.includeNormalize;
            this.includeJquery = props.includeJquery;
            this.isJqueryLocal = props.isJqueryLocal;
            this.templateLang = props.templateLang;
            this.installDep = props.installDep;

            done();
        }.bind(this));
    },

    bower: function () {
        var bower = {
            name: this.appnameSlug,
            version: '0.1.0',
            private: true,
            dependencies: {}
        };

        this.jQueryVersion = "~1.11.1";

        if ( this.includeJquery && this.isJqueryLocal == 'yes' ){
            if( this.versionOfIE === 'ie9' || this.versionOfIE === 'iefree' ) {
                this.jQueryVersion = '~2.1.1'
            }

            bower.dependencies.jquery = this.jQueryVersion;
        }

        if( this.includeNormalize ) {
            bower.dependencies["normalize.css"] = "~3.0.3";
        }

        this.copy('bowerrc', '.bowerrc');
        this.write('bower.json', JSON.stringify(bower, null, 2));
    },

    packageFile: function () {
        var packageFile = {
            name: this.appnameSlug,
            devDependencies: {
                "autoprefixer-core": "^5.2.1",
                "cssnano": "^2.1.1",
                "grunt": "^0.4.5",
                "grunt-contrib-clean": "^0.6.0",
                "grunt-contrib-compress": "^0.13.0",
                "grunt-contrib-concat": "^0.5.1",
                "grunt-contrib-copy": "^0.8.0",
                "grunt-contrib-imagemin": "^0.9.4",
                "grunt-contrib-sass": "^0.9.2",
                "grunt-contrib-uglify": "^0.9.1",
                "grunt-contrib-watch": "^0.6.1",
                "grunt-filerev": "^2.3.1",
                "grunt-postcss": "^0.5.5",
                "grunt-usemin": "^3.0.0",
                "grunt-wiredep": "^2.0.0",
                "load-grunt-tasks": "^3.2.0",
                "time-grunt": "^1.2.1"
            }
        };

        if ( this.templateLang === 'php' ) {
            packageFile.devDependencies["grunt-php2html"] = "^0.2.0";
        }

        this.write('package.json', JSON.stringify(packageFile, null, 2));
    },

    writing: {
        app: function () {
            var i = 0,
                len = 0,
                templateFiles = {},
                context = {
                    appname: this.appname,
                    appnameSlug: this.appnameSlug,
                    versionOfIE: this.versionOfIE,
                    includeJquery: this.includeJquery,
                    isJqueryLocal: this.isJqueryLocal,
                    templateLang: this.templateLang,
                    jQueryVersion: this.jQueryVersion
                },
                directories = ['mockups', 'source/images', 'source/styles/libs', 'source/styles/blocks', 'source/scripts/lib', 'source/scripts/build-lib'],
                emptyFiles = ['source/styles/libs/libs.scss', 'source/styles/fonts.scss', 'source/styles/blocks/blocks.scss'],
                filesToCopy = {
                    '_mixins.scss': 'source/styles/mixins.scss',
                    '_variables.scss': 'source/styles/variables.scss',
                    '_base.scss': 'source/styles/base.scss',
                    '_projectname.scss': 'source/styles/' + this.appnameSlug + '.scss',
                    '_scripts.js': 'source/scripts/' + this.appnameSlug + '.js'
                };

            if( this.templateLang === 'php' ) {
                templateFiles['_index_php.html'] = 'source/index.php';
                templateFiles['_header.html'] = 'source/partials/header.php';
                templateFiles['_footer.html'] = 'source/partials/footer.php';
            } else {
                templateFiles['_index.html'] = 'source/index.html'
            }

            templateFiles['_gruntfile.html'] = 'Gruntfile.js';

            //create empty directories
            for( i = 0, len = directories.length; i < len; i++ ) {
                this.dest.mkdir(directories[i]);
            }

            //create empty files
            for( i = 0, len = emptyFiles.length; i < len; i++ ) {
                this.dest.write(emptyFiles[i], '');
            }

            //copy project files
            for ( var file in filesToCopy ) {
                if( filesToCopy.hasOwnProperty( file ) ) {
                    this.src.copy(file, filesToCopy[file]);
                }
            }

            //copy tweaked template files
            for ( var template in templateFiles ) {
                if( templateFiles.hasOwnProperty( template ) ) {
                    this.template(template, templateFiles[template], context);
                }
            }
        }
    },

    end: function () {
        this.installDep && this.installDependencies();
    }
});

module.exports = SkipcodeGenerator;
