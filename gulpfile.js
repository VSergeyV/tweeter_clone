var gulp = require('gulp'),		
	browserSync = require('browser-sync'),		
	less = require('gulp-less'),			
	notify = require('gulp-notify'),			
	plumber = require('gulp-plumber');

gulp.task('server', ['less'], function () {
	browserSync.init({
		server: { baseDir: './app/'}
	});
});
gulp.watch('./app/**/*.html').on('change', browserSync.reload);	
gulp.watch('./app/**/*.js').on('change', browserSync.reload);	
gulp.watch('./app/less/**/*.less', ['less']);

gulp.task('less', function() {
	return gulp.src('./app/less/**/*.less')
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'less',
				suund: false,
				message: err.message
			}
		})
	}))
	.pipe(less())
	.pipe(gulp.dest('./app/css'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['server']);		