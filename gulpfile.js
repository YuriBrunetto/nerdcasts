'use strict'

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const pump = require('pump')

gulp.task('serve', ['sass'], () => {
  browserSync.init({ server: './' })

  gulp.watch('./scss/*.scss', ['sass'])
  gulp.watch('./*.html').on('change', browserSync.reload)
  gulp.watch('./js/*.js', ['js-watch'])
})

// sass
gulp.task('sass', () => {
  return gulp.src('./scss/*.scss')
    .pipe(autoprefixer())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
})

// js
gulp.task('js', (cb) => {
  pump([
    gulp.src('./js/*.js'),
    uglify(),
    gulp.dest('./dist'),
    browserSync.stream()
  ], cb)
})

gulp.task('js-watch', ['js'], browserSync.reload)

gulp.task('default', ['serve'])
