const gulpConfig = require('./gulpfile.config');
const { watch, src, dest, series } = require('gulp');
const useref = require('gulp-useref');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rimraf = require('gulp-rimraf');
const browsersync = require('browser-sync').create();
const useSourcemaps = gulpConfig.environment === 'development' ? true : false;




/**
 *
 *  Remove build folder
 *
 */
function removeBuildFolder() {
  return src(gulpConfig.output, { allowEmpty: true , read: false})
  .pipe(rimraf());
}


/**
 *
 *  HTML
 *
 */
function optimizeHtml() {

  return src(gulpConfig.paths.html)
  .pipe(useref({ noAssets: true }))
  .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
  .pipe(dest(gulpConfig.output, { sourcemaps: '.' }))
  .pipe(browsersync.stream());

}


/**
 *
 *  CSS
 *
 */
function optimizeCSS() {

  return src(gulpConfig.paths.css, { sourcemaps: useSourcemaps })
  .pipe(concat('style.min.css'))
  .pipe(cssnano())
  .pipe(dest(gulpConfig.output + '/css', { sourcemaps: '.' }))
  .pipe(browsersync.stream());

}


/**
 *
 *  JavaScript
 *
 */
function optimizeJavascript() {

  return src(gulpConfig.paths.javascript, { sourcemaps: useSourcemaps })
  .pipe(concat('script.min.js'))
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(uglify())
  .pipe(dest(gulpConfig.output + '/js', { sourcemaps: '.' }))
  .pipe(browsersync.stream());

}


/**
 *
 *  Images
 *
 */
function optimizeImages() {

  return src(gulpConfig.paths.images)
  .pipe(imagemin())
  .pipe(dest(gulpConfig.output));

}


/**
 *
 *  Public folder
 *
 */
function transferStaticAssets() {

  return src(gulpConfig.paths.static)
  .pipe(dest(gulpConfig.output));

}


/**
 *
 *  Browsersync
 *
 */
function initBrowsersync(callback) {
  browsersync.init({

    server: {
      baseDir: gulpConfig.output
    }

  });


  callback();
}


/**
 *
 *  Watch
 *
 */
function watchSourceCode() {
  watch(gulpConfig.paths.css, optimizeCSS);
  watch(gulpConfig.paths.javascript, optimizeJavascript);
  watch(gulpConfig.paths.html, optimizeHtml);
}


/**
 *
 *  Start task
 *
 */
exports.start = series(
  removeBuildFolder,
  transferStaticAssets,
  optimizeHtml,
  optimizeCSS,
  optimizeJavascript,
  optimizeImages,
  initBrowsersync,
  watchSourceCode
);


/**
 *
 *  Build task
 *
 */
exports.build = series(
  removeBuildFolder,
  transferStaticAssets,
  optimizeHtml,
  optimizeCSS,
  optimizeJavascript,
  optimizeImages
);