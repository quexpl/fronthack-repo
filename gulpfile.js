// Gather used gulp plugins
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    styleguide = require('sc5-styleguide'),
    livereload = require('gulp-livereload');
    mustache = require('gulp-mustache');


// Set paths
var paths = {
  sass: {
    input: 'src/sass/app.sass',
    allfiles: 'src/sass/**/*.+(scss|sass)',
    output: 'dist/css'
  },
  mustache: {
    input: './src/*.html',
    allfiles: './src/**/*.{html,mustache}',
    output: './dist'
  },
  styleguide: {
    sass: [
      'src/sass/**/*.+(scss|sass)',
      'src/!sass/_*.+(scss|sass)'
    ],
    html: 'src/sass/**/*.html',
    output: 'dist/styleguide',
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

// Define Mustache compiling task
gulp.task('mustache', function() {
  return gulp.src(paths.mustache.input)
    .pipe(mustache())
    .pipe(gulp.dest(paths.mustache.output));
});

// Define rendering styleguide task
// https://github.com/SC5/sc5-styleguide#build-options
gulp.task('styleguide:generate', function() {
  return gulp.src(paths.styleguide.sass)
    .pipe(styleguide.generate({
        title: 'Fronthack styleguide',
        server: true,
        sideNav: true,
        rootPath: paths.styleguide.output,
        overviewPath: 'README.md',
        commonClass: 'body',
        extraHead: [
          '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>',
          '<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.0/owl.carousel.min.js"></script>',
          '<script src="/js/components/owl-carousel.js"></script>',
        ],
        disableEncapsulation: true,
        disableHtml5Mode: true
      }))
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide:applystyles', function() {
  return gulp.src([
      'src/sass/app.sass',
      'src/sass/styleguide-overrides.sass'
    ])
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(paths.styleguide.output));
});
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Define copying images for styleguide task
gulp.task('images', function() {
  gulp.src(['dist/images/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/images'));
});

// Define copying javascript for styleguide task
gulp.task('js', function() {
  gulp.src(['dist/js/components/**'])
    .pipe(gulp.dest(paths.styleguide.output + '/js/components'));
});


// Listen folders for changes and apply defined tasks
gulp.task('default', [
    'styleguide',
    'sass',
    'images',
    'js',
    'mustache'
  ], function() {
  livereload.listen();
  gulp.watch([paths.sass.allfiles, paths.styleguide.html, paths.mustache.allfiles], [
    'styleguide',
    'sass',
    'images',
    'js',
    'mustache'
  ]);
});
