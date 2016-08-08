'use strict';

// get dependencies
var gulp = require('gulp'),
    path = require('path');

// configuration
var config = {
    'src': path.join(__dirname, 'src'),
    'dst': path.join(__dirname, 'public')
};

/***********************************************************************************************************************
 * Tasks
 **********************************************************************************************************************/

/**
 * Copies index.php from src to dst
 */
gulp.task('copy', function () {
    return gulp
        .src(path.join(config.src, 'index.php'))
        .pipe(gulp.dest(config.dst));
});

/**
 * Main task
 */
gulp.task('build', [ 'copy' ]);
