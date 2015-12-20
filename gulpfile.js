var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    bourbon = require('bourbon');

var paths = {
    scss: './assets/scss/*.scss'
};

gulp.task('images', function () {
    return gulp.src('assets/img/**/*')
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

gulp.task('default', function () {
    runSequence(['styles', 'images']);
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
});
