// <binding BeforeBuild='default' />

var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('./wwwroot/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./wwwroot/css/'))
});

gulp.task('watch', ['sass'], function () {
	gulp.watch('./wwwroot/sass/*.scss', ['sass']);

});