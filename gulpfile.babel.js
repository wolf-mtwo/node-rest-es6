import fs from 'fs';
import gulp from 'gulp';
import babel from 'gulp-babel';

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter((file) => {
  return (/\.(js|coffee)$/i).test(file);
}).map((file) => {
  require('./gulp/' + file);
});
