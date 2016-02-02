var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    bourbon = require('bourbon'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean');

var paths = {
    scss: './assets/scss/*.scss'
};

gulp.task('images', function () {
    return gulp.src(['assets/img/**/*.jpg', 'assets/img/**/*.png'])
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            use: [
                imageminPngquant({quality: '65-80', speed: 4})
            ]
        }))
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({message: 'Image task complete'}));
});

gulp.task('styles', function() {
    return sass('assets/scss/main.scss', {
        loadPath: bourbon.includePaths
    })
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function() {
    return browserify('assets/js/main.js', {
        debug: true
    })
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // loads map from browserify file
        //.pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'ES6 Scripts task complete'
        }));
});

gulp.task('default', function () {
    runSequence(['styles', 'images']);
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['scripts']);
});
