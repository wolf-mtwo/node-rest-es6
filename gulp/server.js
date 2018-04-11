import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import print from 'gulp-print';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import changed from 'gulp-changed';
import gulpSequence from 'gulp-sequence';

gulp.task('clean', () => {
  return gulp.src(['dist', '.tmp'], {read: false})
  .pipe(clean());
});

gulp.task('serve:dist', () => {
  return gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('copy:assets', () => {
  return gulp.src(['./src/**/*.*', '!./src/**/*.js'])
      .pipe(changed('.tmp'))
      .pipe(print())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('watch', () => {
  return gulp.src('./src/**/*.js')
      .pipe(changed('.tmp'))
      .pipe(print())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe((() => {
        let handler = babel().on('error', (err) => {
          console.log(err.stack);
          handler.emit('end');
        });
        return handler;
      })())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('watch:public', () => {
  return gulp.src(['./src/**/*.*', '!./src/**/*.js'])
      .pipe(changed('.tmp'))
      .pipe(print())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('serve', ['clean'], () => {
  gulpSequence(['serve:dist', 'copy:assets'], () => {
    gulp.watch('./src/**/*.js', ['watch', 'watch:public']);
    nodemon({
      script: './.tmp/server.js',
      watch: ['.tmp'],
      ext: 'js html',
      env: { 'NODE_ENV': 'development' }
    });
  });
});
