const rulePrefix = '.chatchilla_bubble_chat';
const sourcePath = './node_modules/antd/dist/antd.css';
const targetFolder = './src/';
const targetFile = 'antd-namespaced.min.css';

/****/

const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefixwrap = require('postcss-prefixwrap');

gulp.task('build-namespaced-css', function () {
  return gulp
    .src(sourcePath)
    .pipe(
      postcss([
        prefixwrap(rulePrefix),
        // Minify after prefixwrap
        cssnano({ preset: 'default' }),
      ]),
    )
    .pipe(rename(targetFile))
    .pipe(gulp.dest(targetFolder));
});
