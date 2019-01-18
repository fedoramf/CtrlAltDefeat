// <binding BeforeBuild='default' />

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
gulp.task('sass', function () {
    return gulp.src('./wwwroot/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./wwwroot/css/'))
});

gulp.task('scripts', function () {
    gulp.src('site.js')
        .pipe(browserify({
            insertGlobals: false,
            debug: false
        })).pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('watch', ['sass', 'scripts'], function () {
    gulp.watch('./wwwroot/sass/*.scss', ['sass']);
    gulp.watch('site.js', ['scripts']);

});