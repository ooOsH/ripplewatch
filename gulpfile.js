'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
  gulp.src('assets/src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/dist/css'))
});

gulp.task('scripts', function() {
  gulp.src('assets/src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/dist/js'))
});

gulp.task('images', function() {
  gulp.src('assets/src/images/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('assets/dist/images'))
});

gulp.task('watch', function () {
  gulp.watch('assets/src/sass/**/*.scss', ['sass']);
  gulp.watch('assets/src/js/*.js', ['scripts']);
  gulp.watch('assets/src/images/**/*', ['images']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'images', 'watch']);
