/**
 * Created by GoForBroke on 05.04.2016.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);