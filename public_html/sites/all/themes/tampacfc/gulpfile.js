// run the FOLLOWING BEFORE trying to run gulp
// npm install gulp-cli -g
// npm install gulp -D
// npm install
//
var gulp = require("gulp");
var sass = require("gulp-sass");
var prefix = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");
var postcss = require("gulp-postcss");
var mqpacker = require("css-mqpacker");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

// ########### Variables ############
// specify js files you would like to bundle and process here
// so you don't have to modify tasks below
// First we grab minified, then vendors then this apps JS
var jsToBundle = [
  "node_modules/babel-polyfill/dist/polyfill.js",
  "./src/js/vendor/jquery.min.js",
  "./src/js/vendor/*.min.js",
  "./src/js/vendor/*.js",
  "./src/js/app.js",
];

// ########### Tasks ############
/**
 * The primary build task, that spawns sub tasks
 *  `gulp` or `gulp build` is the primary task
 */
gulp.task("build", ["css", "bundle-js"]);

/**
 * Compile files from scss into css
 */
gulp.task("sass", function() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(
      sass({
        includePaths: ["scss"],
      }).on("error", sass.logError)
    )
    .pipe(postcss([mqpacker]))
    .pipe(prefix(["cover 99.5%", "ie 11"], { cascade: true }))
    .pipe(
      cleanCSS({
        compatibility: "ie9",
        processImportFrom: ["!fonts.googleapis.com"],
      })
    )
    .pipe(gulp.dest("./src/css"));
});

// Combine all vendor CSS
gulp.task("css-vendor", function() {
  return gulp
    .src("./src/css/vendor/*.min.css")
    .pipe(concat("vendor.css"))
    .pipe(gulp.dest("./src/css/"));
});

// Copy Compiled CSS into final css directory combining with any vendor css first
gulp.task("css", ["sass", "css-vendor"], function() {
  return gulp
    .src(["./src/css/vendor.css", "./src/css/style.css"])
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest("./css"));
});

/**
 * Bundle js files together and then created minified versions and publish them to the correct locations.
 */
gulp.task("bundle-js", function() {
  return gulp
    .src(jsToBundle)
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("js"))
    .pipe(
      babel({
        presets: ["env"],
        targets: {
          chrome: "58",
          ie: "11",
        },
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("js"));
});

/**
 * Watch scss files for changes & recompile
 *  run 'gulp watch'
 */
gulp.task("watch:css", function() {
  gulp.watch("./src/scss/*.scss", ["sass"]);
});
gulp.task("watch:js", function() {
  gulp.watch(jsToBundle, ["bundle-js"]);
});

/**
 * Copy Vendor Tasks - This will copy in common vendor files from npm
 */
// Add all vendors
gulp.task("vendors", ["jquery", "font-awesome", "bootstrap3"]);
// Add individual vendors to project
gulp.task("jquery", function() {
  gulp
    .src(["node_modules/jquery/dist/jquery.min.js"])
    .pipe(gulp.dest("./src/js/vendor"));
});
gulp.task("font-awesome", function() {
  gulp
    .src(["node_modules/font-awesome/css/*.min.css"])
    .pipe(gulp.dest("./src/css/vendor"));
  gulp.src(["node_modules/font-awesome/fonts/**"]).pipe(gulp.dest("fonts"));
});
gulp.task("bootstrap3", function() {
  gulp
    .src(["node_modules/bootstrap3/dist/css/*.min.css"])
    .pipe(gulp.dest("./src/css/vendor"));
  gulp.src(["node_modules/bootstrap3/fonts/**"]).pipe(gulp.dest("fonts"));
  gulp
    .src(["node_modules/bootstrap3/dist/js/*.min.js"])
    .pipe(gulp.dest("./src/js/vendor/"));
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task("default", ["build"]);
gulp.task("watch", ["watch:css", "watch:js"]);
