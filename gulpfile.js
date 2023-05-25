const { src, dest, watch, series, parallel } = require("gulp");
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');
const gcmq = require('gulp-group-css-media-queries');
const sassGlob = require('gulp-sass-glob');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
//const webpHtml = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');


function html() {
    return src('src/**/*.html', {
        ignore: 'src/parts/**/*'
    })
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'HTML',
            message: error.message
        }))
    }))
    //.pipe(webpHtml())
    .pipe(size({title: 'До сжатия'}))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({title: 'После сжатия'}))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
};

exports.html = html;

function copyHtml() {
    return src('src/**/*.html', {
        ignore: 'src/parts/**/*'
    })
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'HTML',
            message: error.message
        }))
    }))
    //.pipe(webpHtml())
    .pipe(dest('dist/nominifi/'));
};

exports.copyHtml = copyHtml;

function styles() {
    return src('src/scss/main.scss')
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'SCSS',
            message: error.message
        }))
    }))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(webpCss())
    .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(concat('style.min.css'))
    .pipe(size({title: 'До сжатия'}))
    .pipe(cleanCss())
    .pipe(size({title: 'После сжатия'}))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
};

exports.styles = styles;

function copyStyles() {
    return src('src/scss/main.scss')
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'SCSS',
            message: error.message
        }))
    }))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(webpCss())
    .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(shorthand())
    .pipe(gcmq())
    .pipe(dest('dist/nominifi/'));
};

exports.copyStyles = copyStyles;

function normalizeCss() {
    return src('src/css/normalize.css')
    .pipe(concat('normalize.min.css'))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
};

exports.normalizeCss = normalizeCss;

function fonts() {
    return src('src/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}')
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'FONTS',
            message: error.message
        }))
    }))
    .pipe(newer('dist/'))
    .pipe(fonter({
        formats: ['ttf', 'woff', 'eot', 'svg']
    }))
    .pipe(dest('dist/fonts/'))
    .pipe(ttf2woff2())
    .pipe(dest('dist/fonts/'));
};

exports.fonts = fonts;

function scripts() {
    return src('src/js/*.js')
    .pipe(concat('script.min.js'))
    .pipe(terser({
        format: {
            comments: false,
        },
    }))
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream());
};

exports.scripts = scripts;

function images() {
    return src('src/img/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'IMAGES',
            message: error.message
        }))
    }))
    .pipe(newer('dist/'))
    .pipe(webp())
    .pipe(dest('dist/img/'))
    .pipe(src('src/img/**/*.{jpg,jpeg,png,gif,svg}'))
    .pipe(newer('dist/'))
    .pipe(imagemin({
        verbose: true
    }))
    .pipe(dest('dist/img/'));
};

exports.images = images;

function copySvg() {
  return src('src/img/sprite.svg')
  .pipe(dest('dist/img/'));
};

exports.copySvg = copySvg;

function copyPhp() {
  return src('src/**/*.php')
  .pipe(dest('dist/'));
};

exports.copyPhp = copyPhp;

function watcher() {
    watch('src/**/*.html', html);
    watch('src/**/*.html', copyHtml);
    watch('src/scss/**/*.scss', styles);
    watch('src/scss/**/*.scss', copyStyles);
    watch('src/css/normalize.css', normalizeCss);
    watch('src/js/*.js', scripts);
    watch('src/img/*.{jpg,jpeg,png,gif,svg}', images);
    watch('src/img/sprite.svg', copySvg);
    watch('src/img/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}', fonts);
    watch('src/**/*.php', copyPhp);
};

exports.watcher = watcher;

function clear() {
    return del('dist');
};

exports.clear = clear;

function server() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false,
    });
};

exports.default = parallel(series(clear, html, copyHtml, normalizeCss, styles, copyStyles, fonts, images, copySvg, copyPhp, scripts, server), watcher);
exports.dev = series(clear, html, copyHtml, normalizeCss, styles, copyStyles, fonts, images, copySvg, copyPhp, scripts);
