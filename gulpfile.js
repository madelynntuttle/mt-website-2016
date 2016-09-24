/*global require*/
"use strict";

var gulp = require('gulp'),
	path = require('path'),
	data = require('gulp-data'),
	pug = require('gulp-pug'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
    htmlbeautify = require('gulp-html-beautify');
/*
* Change directories here
*/
var settings = {
	buildDir: '_build',
	sassDir: '_assets/styles',
    imgDir: '_assets/images',
    scriptsDir: '_assets/scripts',
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
 * Recompile .pug files and live reload the browser
 */
gulp.task('pug-rebuild', ['pug'], function () {
	browserSync.reload();
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
 * Copy images to build directory
 */
gulp.task('images', function () {
	return gulp.src(settings.imgDir + '/**/*')
		.pipe(gulp.dest(settings.buildDir + '/assets/images'))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Copy scripts to build directory
 */
gulp.task('scripts', function () {
	return gulp.src(settings.scriptsDir + '/**/*')
		.pipe(gulp.dest(settings.buildDir + '/assets/scripts'))
		.pipe(browserSync.reload({stream: true}));
});


/**
 * Wait for pug and sass tasks, then launch the browser-sync server
 */
gulp.task('browser-sync', ['sass', 'images', 'scripts', 'pug'], function () {
	browserSync.init({
		server: {
            baseDir: settings.buildDir,  
        }
	});
});

/**
 * Watch scss files for changes & recompile
 * Watch image files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(settings.sassDir + '/**', ['sass']);        gulp.watch(settings.imgDir + '/**', ['images']);
    gulp.watch(settings.scriptsDir + '/**', ['scripts']);
	gulp.watch(settings.pugDir + '/**', ['pug-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);