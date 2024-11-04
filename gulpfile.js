import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

import * as sass from 'sass';

const compileSass = gulpSass(sass);
const server = browserSync.create();

const paths = {
  html: 'src/*.html',
  components: 'src/components/*.html',
  styles: 'src/styles/main.scss',
  scripts: 'src/scripts/**/*.js',
  images: 'src/images/**/*',
  dist: 'dist'
};

function serve(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}


function reload(done) {
  server.reload();
  done();
}


gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    // .pipe(gulp.dest(paths.dist))
    .pipe(gulp.dest('.'))
    .pipe(server.stream());
});


gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(compileSass().on('error', compileSass.logError)) 
    .pipe(autoprefixer()) 
    .pipe(cleanCSS()) 
    // .pipe(gulp.dest(`${paths.dist}/css`))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});


gulp.task('scripts', function() {
  return gulp.src(paths.scripts) 
    .pipe(concat('main.js')) 
    .pipe(uglify()) 
    // .pipe(gulp.dest(`${paths.dist}/js`))
    .pipe(gulp.dest('js'))
    .pipe(server.stream()); 
});


gulp.task('images', function() {
  return gulp.src(paths.images) 
    .pipe(imagemin())
    // .pipe(gulp.dest(`${paths.dist}/images`))
    .pipe(gulp.dest('images'))
    .pipe(server.stream()); 
});


gulp.task('watch', function() {
  gulp.watch([paths.html, paths.components], gulp.series('html', reload)); 
  gulp.watch('src/styles/**/*.scss', gulp.series('styles', reload)); 
  gulp.watch(paths.scripts, gulp.series('scripts', reload)); 
  gulp.watch(paths.images, gulp.series('images', reload)); 
});


gulp.task('default', gulp.series('html', 'styles', 'scripts', 'images', serve, 'watch'));