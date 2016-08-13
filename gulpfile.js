'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jade = require('jade'),
    gulpJade = require('gulp-jade');
var exec = require('child_process').exec;
var distLocation = './build';

gulp.task('clean', function () {
    exec('rm -rf ./build/*');
});

gulp.task('jade', function () {
    var YOUR_LOCALS = {
        project: {
            title: 'Demo project',
            subtitle: 'Gulp rulezzzz!'
        },
        name: 'Vasya'
    };

    gulp.src('./app/templates/**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest(distLocation))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('./app/templates/**/*.html')
        .pipe(gulp.dest(distLocation))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(gulp.dest(distLocation + '/js/'))
        .pipe(connect.reload());
});

gulp.task('image', function () {
    exec('rm -rf ' + distLocation + '/images');
    gulp.src('./app/images/**/*.{png,jpg,jpeg,gif,ico}')
        .pipe(gulp.dest(distLocation + '/images/'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(
        autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        })
    )
        .pipe(concat('dist'))
        .pipe(rename('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(distLocation + '/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch('app/templates/**/*.html', ['html']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/images/**/*.js', ['image']);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.jade', ['jade']);
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('build', ['clean', 'html', 'js', 'image', 'jade', 'sass']);

gulp.task('default', [
    'clean',
    'html',
    'js',
    'image',
    'jade',
    'sass',
    'connect',
    'watch'
]);