/**
 * Created by kattamum on 9/30/2016.
 */

var gulp = require('gulp');

var jshint = require('gulp-jshint');

var jscs = require('gulp-jscs');

var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {

    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(jscs());

});

gulp.task('inject', function () {

    //for injecting extrnal libss
    var wiredep = require('wiredep').stream;

    //for injecting local js files
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js'], { read: false });

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {

        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.ejs')  // type of file you specify for views
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));

});

gulp.task('serve', ['style', 'inject'], function () {

    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (env) {
            console.log('Restarting..');
        });

});
