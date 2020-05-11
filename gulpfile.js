const gulp = require("gulp");
const imagemin = require("gulp-imagemin")
const uglify = require("gulp-uglify")
const sass = require("gulp-sass")
const concat = require("gulp-concat")

// gulp.task - define tasks
// gulp.src - points topfiles to use
// gulp.dest - points to folder to output
// gulp.watch - watch files and folders for changes

// logs message
gulp.task('message', async () =>
  console.log('gulp is running...'));

// copy all html files
gulp.task('copyHTML', async () =>
  gulp.src("src/*.html")
  .pipe(gulp.dest("dist")));

// image optimization
gulp.task('imageMin', async () =>
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images')));

// minify js
gulp.task('minify', async () =>
  gulp.src("src/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("dist/js")));

// compile sass
gulp.task('sass', async () =>
  gulp.src("src/sass/*.scss")
  .pipe(sass())
  .pipe(sass().on("error", sass.logError))
  .pipe(gulp.dest("dist/css")));

// scripts
gulp.task('scripts', async () =>
  gulp.src("src/js/*.js")
  .pipe(concat("main.js"))
  .pipe(uglify())
  .pipe(gulp.dest("dist/js")));

gulp.task('default', gulp.parallel(['message', 'copyHTML', 'imageMin', 'sass', 'scripts']));

gulp.task('watch', async()=>{
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHTML'));
});
