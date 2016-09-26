var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del')

gulp.task('default', ['clean', 'compress', 'lint']);

gulp.task('lint', function(){
  return gulp.src('./dist/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function(){
  return gulp.src('./game/battle/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('clean', function(){
  return del('./dist')
});