/*global require*/
"use strict";

var gulp = require('gulp'),
	path = require('path'),
	data = require('gulp-data'),
	pug = require('gulp-pug'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
//    connect = require('gulp-connect'),
	browserSync = require('browser-sync').create(),
    htmlbeautify = require('gulp-html-beautify');
/*
* Change directories here
*/
var settings = {
	buildDir: '_build',
	sassDir: '_assets/styles',
    pugDir: '_templates'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
	var options = {
        indent_size: 2
    };
    
    return gulp.src(settings.pugDir + '/**/*.pug')
//		.pipe(data(function (file) {
//			return require('./_data/' + path.basename(file.path) + '.json');
//		}))
		.pipe(pug())
        .pipe(htmlbeautify(options))
		.pipe(gulp.dest(settings.buildDir));
});

/** 
 * Beautify _build HTML files 
 */
//gulp.task('htmlbeautify', function() {
//  var options = {
//    {indentSize: 2}
//  };
//  gulp.src(settings.buildDir + '/**/*.html')
//    .pipe(htmlbeautify(options))
//    .pipe(gulp.dest(settings.buildDir + '/'))
//});


/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('pug-rebuild', ['pug'], function () {
	browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync server
 */
gulp.task('browser-sync', ['sass', 'pug'], function () {
	browserSync.init({
		server: {
            baseDir: settings.buildDir,  
        }
	});
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
	return gulp.src(settings.sassDir + '/**/*.scss')
		.pipe(sass({
			includePaths: [settings.sassDir],
			outputStyle: 'compressed'
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(settings.buildDir + '/assets/styles'))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
//gulp.task('webserver', function () {
//	connect.server({
//        port: 3000,
//        root: settings.buildDir
//    });
//});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(settings.sassDir + '/**', ['sass']);
	gulp.watch(settings.pugDir + '/**', ['pug-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);