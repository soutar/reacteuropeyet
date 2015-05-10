var config      = require('./config.json');
var gulp        = require('gulp');
var babel       = require('babelify').configure(config.babel_opts || {});
var sass        = require('gulp-sass');
var browserify  = require('gulp-browserify');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var minifycss   = require('gulp-minify-css');
var gulpif      = require('gulp-if');

var options     = require('minimist')(process.argv.slice(2));
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


gulp.task('dev', ['js', 'scss', 'bsync'], function () {
    gulp.watch(config.source_directory + '/' + config.js.source_glob, ['js']);
    gulp.watch(config.source_directory + '/' + config.scss.source_glob, ['scss']);
    gulp.watch('./index.html', function () {
        reload();
    });
});

gulp.task('js', function () {
    return gulp.src(config.source_directory + '/' + config.js.source_glob, { base: config.source_directory })
        .pipe(gulpif(options.debug, sourcemaps.init()))
            .pipe(browserify({
              transform: [babel]
            }))
            .pipe(uglify())
        .pipe(gulpif(options.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.build_directory))
        .pipe(reload({ stream: true }));
});

gulp.task('scss', function () {
    return gulp.src(config.source_directory + '/' + config.scss.source_glob, { base: config.source_directory })
        .pipe(gulpif(options.debug, sourcemaps.init()))
            .pipe(sass())
            .pipe(minifycss())
        .pipe(gulpif(options.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.build_directory))
        .pipe(reload({ stream: true }));

});

gulp.task('bsync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});
