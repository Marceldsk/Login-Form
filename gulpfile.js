const {
    src,
    dest,
    parallel,
    watch,
} = require('gulp'); //destrukturyzacja gulpa zeby nie wyciagac z niego wszystkich metod
const connect = require('gulp-connect');
const open = require('gulp-open');
const sass = require('gulp-sass');

function server() {
    connect.server({
        port: 8888,
        livereload: true
    });
}

function html() {
    return src('*.html')
        .pipe(connect.reload())
}

function css() {
    return src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./'))
        .pipe(connect.reload());
}

function js() {
    return src('*.js')
        .pipe(connect.reload())
}

function openPage() {
    src('index.html')
        .pipe(open({
            uri: 'http://localhost:8888/'
        }));
}

function dev() {
    watch(['*.html'], html);
    watch(['*.js'], js);
    watch(['scss/*.scss'], css);
    server();
    openPage();
}

exports.dev = dev;
exports.default = parallel(openPage, server, css);