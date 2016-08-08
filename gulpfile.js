'use strict';

// get dependencies
var gulp = require('gulp'),
    path = require('path'),
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
 * Compiles SASS code into a CSS file
 */
gulp.task('sass', function () {
    return gulp
        .src(path.join(config.src, 'css', 'style.scss'))
        .pipe(plugins.sass())
        .pipe(plugins.cleanCSS())
        .pipe(gulp.dest(path.join(config.dst, 'css')));
});

/**
 * Injects CSS dependencies into the index file
 */
gulp.task('inject-css', [ 'copy-index', 'sass' ], function () {
    return gulp
        .src(path.join(config.dst, 'index.php'))
        .pipe(
            plugins.inject(
                gulp.src(path.join(config.dst, 'css', 'style.css'), { 'read': false }),
                {
                    'relative': true
                }
            )
        )
        .pipe(gulp.dest(config.dst));
});

/**
 * Main task
 */
gulp.task('build', function (callback) {
    plugins.runSequence(
        'clean',
        ['copy-index', 'sass', 'inject-css'],
        callback
    );
});
