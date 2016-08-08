'use strict';

// get dependencies
var gulp = require('gulp'),
    path = require('path'),
    args = require('yargs').argv,
    plugins = require('gulp-load-plugins')({
        'pattern': ['gulp-*', 'del', 'run-sequence'],
        'rename': {
            'run-sequence': 'runSequence',
            'gulp-clean-css': 'cleanCSS'
        }
    });

// configuration
var config = {
    'src': path.join(__dirname, 'src'),
    'dst': path.join(__dirname, 'public')
};

/***********************************************************************************************************************
 * Tasks
 **********************************************************************************************************************/

/**
 * Empties the destination folder
 */
gulp.task('clean', function () {
    return plugins.del([ config.dst ]);
});

/**
 * Copies the index file from the source to the destination folder
 */
gulp.task('copy-index', function () {
    return gulp
        .src(path.join(config.src, 'index.php'))
        .pipe(gulp.dest(config.dst));
});

/**
 * Copies the JS vendor files from their sources to the destination folder
 */
gulp.task('copy-js-vendor', function () {
    return gulp
        .src([
            path.join(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.min.js')
        ])
        .pipe(plugins.concat('vendor.js'))
        .pipe(gulp.dest(path.join(config.dst, 'js')));
});

/**
 * Compiles SASS code into a CSS file
 */
gulp.task('sass', function () {
    return gulp
        .src(path.join(config.src, 'css', 'wedding.scss'))
        .pipe(plugins.sass())
        .pipe(plugins.cleanCSS())
        .pipe(gulp.dest(path.join(config.dst, 'css')));
});

/**
 * Injects all the proper dependencies into the index file
 */
gulp.task('inject-all', [ 'copy-index', 'copy-js-vendor', 'sass', 'js' ], function () {
    var dependencies = [
        ['wedding', path.join(config.dst, 'js', 'wedding.js')],
        ['vendor',  path.join(config.dst, 'js', 'vendor.js')],
        ['wedding', path.join(config.dst, 'css', 'wedding.css')]
    ];

    var stream = gulp.src(path.join(config.dst, 'index.php'));
    for (var i = 0; i < dependencies.length; i += 1) {
        stream = stream.pipe(
            plugins.inject(
                gulp.src(dependencies[i][1], { 'read': false }),
                {
                    'name': dependencies[i][0],
                    'relative': true
                }
            )
        );
    }

    return stream.pipe(gulp.dest(config.dst));
});

/**
 * Compiles the JS code into a single minified file
 */
gulp.task('js', function () {
    var stream = gulp
        .src(path.join(config.src, 'js', '**/*.js'))
        .pipe(plugins.concat('wedding.js'));

    if (args.debug === undefined) {
        stream = stream.pipe(plugins.uglifyjs())
    }

    return stream.pipe(gulp.dest(path.join(config.dst, 'js')));
});

/**
 * Main task
 */
gulp.task('build', function (callback) {
    plugins.runSequence(
        'clean',
        ['copy-index', 'copy-js-vendor', 'sass', 'js', 'inject-all'],
        callback
    );
});
