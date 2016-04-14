/**
 * Created by GoForBroke on 05.04.2016.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('jade'),
    gulpJade = require('gulp-jade');

gulp.task('jade', function () {
    var YOUR_LOCALS = {
        name: 'Vasya'
    };

    gulp.src('./app/templates/**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload())
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
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.jade', ['jade']);
});

gulp.task('default', ['connect', 'watch']);