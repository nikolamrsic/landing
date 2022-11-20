const gulp = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
// PATHS
const paths = {
  sass: "./Sass/**/*.scss",
};

// Sass task

function sassTask() {
  return gulp
    .src(paths.sass)
    .pipe(sass())
    .pipe(autoPrefixer("last 2 versions"))
    .pipe(gulp.dest("./dist/css"));
}

function browsersyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

//wathc

function watchTask() {
  gulp.watch("*.html", browserSyncReload);
  gulp.watch([paths.sass], gulp.series(sassTask, browserSyncReload));
}
exports.default = gulp.series(sassTask, browsersyncServer, watchTask);
