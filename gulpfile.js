'use strict';

var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    bourbon        = require('node-bourbon'),
    autoprefixer   = require('gulp-autoprefixer'),
    cleanCSS       = require('gulp-clean-css'),
    cssbeautify    = require('gulp-cssbeautify'),
    browserSync    = require('browser-sync'),
    rename         = require('gulp-rename'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    del            = require('del'),
    cache          = require('gulp-cache');

// Browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: true
  });
});

// Sass compilation
gulp.task('sass', function() {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths
  }))
  .pipe(rename({
    suffix: '.min',
    prefix : ''
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(cleanCSS())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

// Unminified CSS to Source-files Folder
gulp.task('buildexpandedcss', function() {
  return gulp.src('sass/**/*.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths,
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(gulp.dest('dist/source-files/mixio-css-files'));
});

// Unminified Bootstrap Grid to Source-files Folder
gulp.task('buildBootstrap', function() {
  return gulp.src('sass/bootstrap.sass')
  .pipe(sass({
    includePaths: bourbon.includePaths,
    outputStyle: 'expanded'
  }))
  .pipe(autoprefixer(['last 15 versions', 'ie >= 7', 'Firefox < 20']))
  .pipe(gulp.dest('dist/source-files/bootstrap'));
});

// Deject tag delete and beautiful html - for deject tag pages only
gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist/'))
});

// JS libs minification
gulp.task('libs', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery.transit/jquery.transit.js',
    'bower_components/fullpage.js/dist/jquery.fullpage.js',
    'bower_components/swiper/dist/js/swiper.js',
    'bower_components/kbw-countdown/dist/js/jquery.plugin.min.js',
    'bower_components/kbw-countdown/dist/js/jquery.countdown.min.js',
    'bower_components/photoswipe/dist/photoswipe.js',
    'bower_components/photoswipe/dist/photoswipe-ui-default.js',
    'bower_components/ajaxchimp/jquery.ajaxchimp.min.js',
    //'bower_components/particles.js/particles.min.js',
    'bower_components/vegas/dist/vegas.js',
    'bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
    'app/app_components/app.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

// JS Libs Unminified
gulp.task('buildexpandedlibs', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js',
    'bower_components/jquery.transit/jquery.transit.js',
    'bower_components/fullpage.js/dist/jquery.fullpage.js',
    'bower_components/swiper/dist/js/swiper.js',
    'bower_components/kbw-countdown/dist/js/jquery.plugin.min.js',
    'bower_components/kbw-countdown/dist/js/jquery.countdown.min.js',
    'bower_components/photoswipe/dist/photoswipe.js',
    'bower_components/photoswipe/dist/photoswipe-ui-default.js',
    'bower_components/ajaxchimp/jquery.ajaxchimp.min.js',
    //'bower_components/particles.js/particles.min.js',
    'bower_components/vegas/dist/vegas.js',
    'bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
    'app/app_components/app.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest('dist/source-files/mixio-js-files'));
});

// Watch
gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
  gulp.watch('sass/**/*.sass', ['sass']).on("change", browserSync.reload);
  gulp.watch('app/*.html').on("change", browserSync.reload);
  gulp.watch('app/js/**/*.js').on("change", browserSync.reload);
});

// Images
gulp.task('pics', function() {
  return gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

// Remove "dist" folder
gulp.task('clean', function() {
  return del.sync('dist');
});

// Build
gulp.task('build', ['clean', 'sass', 'buildhtml', 'pics', 'libs', 'buildexpandedcss', 'buildBootstrap', 'buildexpandedlibs'], function() {

  var buildCss = gulp.src([
    'app/css/fonts.min.css',
    'app/css/main.min.css',
    'app/css/fonts-demo.min.css',
    'app/css/main-demo.min.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildColors = gulp.src([
    'app/css/colors/*.css'
  ])
  .pipe(gulp.dest('dist/css/colors'));

  var buildFiles = gulp.src([
    'app/.htaccess',
    'app/mail.php'
  ]).pipe(gulp.dest('dist'));

  var buildIESupport = gulp.src([
    'bower_components/es5-shim/es5-shim.min.js',
    'bower_components/html5shiv/dist/html5shiv.min.js',
    'bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
    'bower_components/respond/dest/respond.min.js'
  ]).pipe(gulp.dest('dist/js/libs'));

  var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));


  // Build Source Files & Unminified Plugins

  // JSON Files
  var buildAssets = gulp.src('app/assets/**/*').pipe(gulp.dest('dist/source-files/template-json-files'));

  // Unminificated Template JS Files
  var buildUnminifiedJs = gulp.src([
    'app/app_components/app.js',
    'app/js/demo/app-demo.js',
    'app/js/maps/*.js',
    'app/js/gallery-init.js',
    'app/js/mixio-custom.js'
  ])
  .pipe(gulp.dest('dist/source-files/mixio-js-files'));

  // Jquery
  var buildJquery = gulp.src('bower_components/jquery/dist/jquery.js').pipe(gulp.dest('dist/source-files/jquery'));

  // Modernizr
  var buildModernizr = gulp.src('bower_components/modernizr/modernizr.js').pipe(gulp.dest('dist/source-files/modernizr'));

  // Jquery.transit
  var buildTransit = gulp.src('bower_components/jquery.transit/jquery.transit.js').pipe(gulp.dest('dist/source-files/jquery.transit'));

  // Ajaxchimp Files
  var buildAjaxchimp = gulp.src('bower_components/ajaxchimp/jquery.ajaxchimp.js').pipe(gulp.dest('dist/source-files/ajaxchimp'));

  // KBW Countdown Files
  var buildKBW = gulp.src([
    'bower_components/kbw-countdown/dist/js/jquery.plugin.js',
    'bower_components/kbw-countdown/dist/js/jquery.countdown.js'
  ])
  .pipe(gulp.dest('dist/source-files/kbw-countdown'));

  // Photoswipe Files
  var buildPhotoSwipe = gulp.src([
    'bower_components/photoswipe/dist/photoswipe.js',
    'bower_components/photoswipe/dist/photoswipe-ui-default.js',
    'bower_components/photoswipe/dist/photoswipe.css',
    'bower_components/photoswipe/dist/default-skin/default-skin.css'
  ])
  .pipe(gulp.dest('dist/source-files/photoswipe'));

  // Fullpage.js Files
  var buildFullpage = gulp.src([
    'bower_components/fullpage.js/dist/jquery.fullpage.js',
    'bower_components/fullpage.js/dist/jquery.fullpage.css'
  ])
  .pipe(gulp.dest('dist/source-files/fullpage.js'));

  // Swiper Slider Files
  var buildSwiper = gulp.src([
    'bower_components/swiper/dist/js/swiper.js',
    'bower_components/swiper/dist/css/swiper.css'
  ])
  .pipe(gulp.dest('dist/source-files/swiper'));

  // Ionicons Files
  var buildIonicons = gulp.src([
    'bower_components/Ionicons/css/ionicons.css',
    'bower_components/Ionicons/fonts/*'
  ])
  .pipe(gulp.dest('dist/source-files/Ionicons'));

  // IE Support Unminified Files
  var buildIESupport = gulp.src([
    'bower_components/es5-shim/es5-shim.js',
    'bower_components/html5shiv/dist/html5shiv.js',
    'bower_components/html5shiv/dist/html5shiv-printshiv.js',
    'bower_components/respond/src/respond.js'
  ]).pipe(gulp.dest('dist/source-files/ie-support'));

  // Vegas Files
  var buildVegas = gulp.src([
    'bower_components/vegas/dist/vegas.js',
    'bower_components/vegas/dist/vegas.css'
  ])
  .pipe(gulp.dest('dist/source-files/vegas'));

  // YTPlayer Files
  var buildYTPlayer = gulp.src([
    'bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js',
    'bower_components/jquery.mb.ytplayer/src/css/**/*'
  ])
  .pipe(gulp.dest('dist/source-files/jquery.mb.ytplayer'));


  // Available in Future Updates:

  // Particles.js Files
  //var buildParticles = gulp.src('bower_components/particles.js/particles.js').pipe(gulp.dest('dist/source-files/particles.js'));

});

// Clear cache
gulp.task('clearcache', function () {
  return cache.clearAll();
});

// Default task
gulp.task('default', ['watch']);
