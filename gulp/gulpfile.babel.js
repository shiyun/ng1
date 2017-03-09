'use strict';
import gulp from 'gulp';
import cache from 'gulp-cache';
import open from 'gulp-open';
import wrench from 'wrench';
import {signArr} from './gulp/es6item_const';

wrench.readdirSyncRecursive('./gulp').filter(file => {
	return (/\.js$/i).test(file);
}).map(file => {
	require('./gulp/'+file);
});

gulp.task('test', ()=>{
	gulp.start(['es6_libs']);
});

gulp.task('es6', ()=>{
	let arr = ['es6_clean', 'es6_libs', 'es6_less', 'es6_images', 'es6_watch'];
	Array.prototype.push.apply(arr, signArr);
	gulp.start(arr);
});

gulp.task('ng1', ()=>{
	let arr = ['ng1_libs', 'ng1_images', 'ng1_less', 'ng1view', 'ng1_watch'];
	//Array.prototype.push.apply(arr, signArr);
	gulp.start(arr);
});


gulp.task('open', ['ng1'], ()=>{
	gulp.src(__filename)
		//.pipe(open({uri: 'http://localhost:3000/item/index.html'}));
		.pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('cleanCache', function (done) {  
    return cache.clearAll(done);  
}); 

// 默认任务
gulp.task('default', function(){
	gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');
	gulp.watch('../src/less/*.*', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
	gulp.watch('../src/comp/**/main.js', ['comps']);
	gulp.watch('../src/util/*.*', ['util']);
});