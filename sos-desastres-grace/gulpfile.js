var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
/*var rename = require('gulp-rename');*/
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('script-bootstrap', function(cb){
	// tarea script
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./src/js'));        
});

gulp.task('script-jquery', function(){
    return gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./src/js'));
});

gulp.task('fontawesome', function(){
    return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./src/fonts'));
});

gulp.task('fontawesome-css', function(){
    return gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    .pipe(gulp.dest('./src/css'));
});

gulp.task('style', function() {
	// tarea style
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./src/css'));
});

gulp.task('images', function() {
	return gulp.src('./docs/*.jpg')
    .pipe(gulp.dest('./src/img/img-docs'));
});
/*copy to dist*/
gulp.task('pocy-css-style-to-dist',function(){
    return gulp.src('./src/css/style.css')
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('pocy-css-queries-to-dist',function(){
    return gulp.src('./src/css/queries/queries.css')
    .pipe(gulp.dest('./dist/css/queries'));
});
gulp.task('pocy-js-to-dist',function(){
    return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
});
/*gulp.task('pocy-index-to-src',function(){
    return gulp.src('./index.html')
    .pipe(gulp.dest('./src'));
});*/
gulp.task('pocy-index-to-dist',function(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});
gulp.task('pocy-package-to-dist',function(){
    return gulp.src('./package.json')
    .pipe(gulp.dest('./dist'));
});
gulp.task('pocy-gulpfile-to-dist',function(){
    return gulp.src('./gulpfile.js')
    .pipe(gulp.dest('./dist'));
});
gulp.task('pocy-gitignore-to-dist',function(){
    return gulp.src('./.gitignore')
    .pipe(gulp.dest('./dist'));
});
gulp.task('pocy-img-to-dist',function(){
    return gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('default', ['fontawesome-css','fontawesome','images', 'style', 'script-bootstrap','script-jquery','pocy-css-style-to-dist','pocy-css-queries-to-dist','pocy-js-to-dist','pocy-index-to-dist','pocy-package-to-dist','pocy-gulpfile-to-dist','pocy-gitignore-to-dist','pocy-img-to-dist']);
