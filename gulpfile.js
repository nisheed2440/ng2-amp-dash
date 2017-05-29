const gulp = require('gulp');
const htmlMinifier = require('html-minifier');
const inlineNg2Template = require('gulp-inline-ng2-template');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sequence = require('gulp-sequence');
const del = require('del');

function minifyTemplate(path, ext, file, cb) {
    try {
        var minifiedFile = htmlMinifier.minify(file, {
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeRedundantAttributes: true,
            minifyCSS: true,
            removeComments: true
        });
        cb(null, minifiedFile);
    } catch (err) {
        cb(err);
    }
}

gulp.task('copy:temp', function () {
    return gulp.src(['./src/amp-dash/**/*.*'])
        .pipe(gulp.dest('./src/temp'));
});

gulp.task('css', function () {
    return gulp.src(['./src/temp/**/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/temp'));
});

gulp.task('inline', function () {
    return gulp.src(['./src/temp/**/*.ts'])
        .pipe(inlineNg2Template({
            base: '/src/temp',
            useRelativePaths: true,
            templateProcessor: minifyTemplate,
            removeLineBreaks:true
        }))
        .pipe(gulp.dest('./src/temp'));
});

gulp.task('clean:before', function () {
    return del([
        'temp',
        'dist',
        'lib',
        'aot',
        'src/temp'
    ]);
});

gulp.task('clean:after', function () {
    return del([
        'src/temp'
    ]);
});

gulp.task('pre:build', sequence('clean:before', 'copy:temp', 'css', 'inline'));
gulp.task('post:build', sequence('clean:after'));