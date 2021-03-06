"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');       //Runs a local dev server
var open = require('gulp-open');             //Opens a url in the web browser
var browserify = require('browserify');      //Bundles JS
var gutil = require('gulp-util');            //Gulp Utilities
var reactify = require('reactify');          //Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat');         //Concatenates files
var lint = require('gulp-eslint');           //Lint our JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		jsx: './src/**/*.jsx',
		images: './src/images/*',
        fonts: [
            'node_modules/font-awesome/fonts/*'
        ],
		css: [
			'node_modules/foundation-sites/dist/foundation.min.css',
			'node_modules/toastr/build/toastr.css',
            'node_modules/font-awesome/css/font-awesome.css'
		],
		dist: './public',
		mainJs: './src/main.jsx'
	}
}

gulp.task('connect', function(){
	connect.server({
		root: [config.paths.dist],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function(){
	gulp.src(config.paths.dist+'/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}))
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload())
});

gulp.task('js', function(){
	browserify(config.paths.mainJs, {extensions: ['.jsx']})
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
});

gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
		
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('fonts', function(){
	gulp.src(config.paths.fonts)
		.pipe(gulp.dest(config.paths.dist + '/fonts'))
		.pipe(connect.reload());
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format())
});

gulp.task("watch", function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.jsx, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'fonts', 'images', 'lint', 'open', 'watch']);
gulp.task('build', ['html', 'js', 'css', 'fonts', 'images', 'lint']);
