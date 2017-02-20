// Gather used gulp plugins
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    livereload = require('gulp-livereload');


// Set paths
var paths = {
  sass: {
    input: 'sass/app.sass',
    allfiles: 'sass/**/*.+(scss|sass)',
    output: 'css'
  },
  mustache: {
    input: './html-workspace/*.html',
    allfiles: './html-workspace/**/*.{html,mustache}',
    output: './html-preview'
  },
  styleguide: {
    sass: [
      'sass/**/*.+(scss|sass)',
      '!sass/_*.+(scss|sass)'
    ],
    html: 'sass/**/*.html',
    output: 'styleguide',
  }
};

// Define SASS compiling task
gulp.task('sass', function () {
  gulp.src(paths.sass.input)
    .pipe(sass(
      {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.sass.output))
    .pipe(livereload());
});


// Listen folders for changes and apply defined tasks
gulp.task('default', [
    'sass'
  ], function() {
  livereload.listen();
  gulp.watch([paths.sass.allfiles, paths.styleguide.html, paths.mustache.allfiles], [
    'sass'
  ]);
});
