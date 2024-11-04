import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';

import * as sass from 'sass';

const compileSass = gulpSass(sass);

const paths = {
  html: 'src/*.html',
  components: 'src/components/*.html',
  styles: 'src/styles/main.scss',
  scripts: 'src/scripts/**/*.js',
  images: 'src/images/**/*',
  dist: 'dist'
};

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(compileSass().on('error', compileSass.logError)) 
    .pipe(autoprefixer()) 
    .pipe(cleanCSS()) 
    .pipe(gulp.dest(`${paths.dist}/css`)); 
});


gulp.task('scripts', function() {
  return gulp.src(paths.scripts) 
    .pipe(concat('main.js')) 
    .pipe(uglify()) 
    .pipe(gulp.dest(`${paths.dist}/js`)); 
});


gulp.task('images', function() {
  return gulp.src(paths.images) 
    .pipe(imagemin())
    .pipe(gulp.dest(`${paths.dist}/images`)); 
});


gulp.task('watch', function() {
  gulp.watch([paths.html, paths.components], gulp.series('html')); 
  gulp.watch('src/styles/**/*.scss', gulp.series('styles')); 
  gulp.watch(paths.scripts, gulp.series('scripts')); 
  gulp.watch(paths.images, gulp.series('images')); 
});


gulp.task('default', gulp.series('html', 'styles', 'scripts', 'images', 'watch'));