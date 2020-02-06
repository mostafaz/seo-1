// first Requirements
/*
  npm init
*/
/*
  npm install --global gulp
  npm install --save-dev gulp
  npm install --save-dev gulp-plumber
  npm install --save-dev gulp-autoprefixer
  npm install --save-dev gulp-concat
  npm install --save-dev gulp-minify-css
  npm install --save-dev gulp-sass
  npm install --save-dev gulp-htmlmin
  npm install --save-dev gulp-uglify-es
  npm install --save-dev gulp-image
  npm install gulp-file-include
*/

// second requirements
/*
  gulp create
  gulp image
  gulp
*/

// require gulp tools
var gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  minifyCss = require("gulp-minify-css"),
  sass = require("gulp-sass"),
  uglify = require("gulp-uglify-es").default,
  fileinclude = require("gulp-file-include"),
  htmlmin = require("gulp-htmlmin"),
  image = require("gulp-image");

// create gulp task for create structure folders
gulp.task("create", function() {
  return gulp
    .src("*.*", { read: false })
    .pipe(gulp.dest("./assets/src/scss"))
    .pipe(gulp.dest("./assets/src/scripts"))
    .pipe(gulp.dest("./assets/dist/css"))
    .pipe(gulp.dest("./assets/dist/scripts"))
    .pipe(gulp.dest("./assets/dist/imgs"))
    .pipe(gulp.dest("./assets/dist/fonts"));
});

// css task
gulp.task("css", function() {
  return gulp
    .src("assets/src/css/*.css")
    .pipe(plumber())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("styles.min.css"))
    .pipe(minifyCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("assets/dist/css"));
});

// RTL css task
gulp.task("rtl", function() {
  return gulp
    .src("assets/src/css/rtl/*.css")
    .pipe(plumber())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("styles.rtl.min.css"))
    .pipe(minifyCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("assets/dist/css"));
});

// scss task
gulp.task("scss", function() {
  return gulp
    .src("assets/src/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("styles.min.css"))
    .pipe(minifyCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("assets/dist/css"));
});

// RTL scss task
gulp.task("rtl", function() {
  return gulp
    .src("assets/src/scss/rtl/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("styles.min.css"))
    .pipe(minifyCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("assets/dist/css"));
});

// js task
gulp.task("scripts", function() {
  return gulp
    .src("assets/src/scripts/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest("assets/dist/scripts"));
});

// create gulp task for compressed img
gulp.task("image", function() {
  return gulp
    .src("assets/dist/imgs/**/*")
    .pipe(plumber())
    .pipe(image())
    .pipe(gulp.dest("assets/dist/imgs"));
});

// create gulp task for split Html
gulp.task("fileinclude", function() {
  return gulp
    .src("./assets/src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(fileinclude())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./assets/dist/"));
});

// gulp watch
gulp.task("watch", function() {
  gulp.watch("assets/src/css/*.css", gulp.series("css")); // for css
  gulp.watch("assets/src/css/rtl/*.css", gulp.series("rtl")); // for rtl css
  gulp.watch("assets/src/scss/*.scss", gulp.series("scss")); // for scss
  gulp.watch("assets/src/scss/rtl/*.scss", gulp.series("scss")); // for rtl scss
  gulp.watch("assets/src/scripts/*.js", gulp.series("scripts")); // for scripts
  gulp.watch("assets/src/*.html", gulp.series("fileinclude")); // for split Html
});

// default task
gulp.task("default", gulp.series("watch"));
