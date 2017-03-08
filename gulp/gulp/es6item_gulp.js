import gulp from 'gulp';
import concat from 'gulp-concat';
import jshint from 'gulp-jshint';
import livereload from 'gulp-livereload';
import less from 'gulp-less';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import minifycss from 'gulp-minify-css';
import del from 'del';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import es2015 from 'babel-preset-es2015';
import stage3 from 'babel-preset-stage-3';
import sourcemaps from 'gulp-sourcemaps';

const pathUrl = '../es6item/';
import {signArr} from './es6item_const';

signArr.forEach(file=>{
	gulp.task(file, ()=>{
		return browserify({entries: pathUrl+'src/js/' + file + '.js', debug: false})
		.transform("babelify", { presets: [es2015, stage3] })
		.bundle()
		.pipe(source(file + '.js')) //'test.js'
		.pipe(buffer())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		//.pipe(sourcemaps.init())
		.pipe(rename({ suffix: '.min'})) //extname: '.bundle.js',
		.pipe(uglify())
		//.pipe(sourcemaps.write(pathUrl+'public/js/maps'))
		.pipe(gulp.dest(pathUrl+'public/js'));
	});

});

gulp.task('es6_comps', ()=>{
	signArr.forEach((file)=>babelTransform(file));
	/*
	return browserify({entries: pathUrl+'src/js/news.js',debug: true})
			.transform("babelify",{presets: [es2015]})
			.bundle()
			.pipe(source('news.js'))
			.pipe(buffer())
			//.pipe(sourcemaps.init())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(rename({ suffix: '.min'}))
			.pipe(uglify())
			//.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(pathUrl+'public/js'))
			*/
});

function babelTransform(file){
	browserify({entries: pathUrl+'src/js/' + file + '.js', debug: false})
	.transform("babelify", { presets: [es2015, stage3] })
	.bundle()
	.pipe(source(file + '.js')) //'test.js'
	.pipe(buffer())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	//.pipe(sourcemaps.init())
	.pipe(rename({ suffix: '.min'})) //extname: '.bundle.js',
	.pipe(uglify())
	//.pipe(sourcemaps.write(pathUrl+'public/js/maps'))
	.pipe(gulp.dest(pathUrl+'public/js'));
}

gulp.task('es6_clean', function(cb){
	//del(['../public/css/*.css', '../public/js/*.js'], cb);
	del.sync([pathUrl+'public/css/', pathUrl+'public/js/'], {force: true});
});

//js检查,合并，压缩公共js文件
gulp.task('es6_libs', function(){
	//合并压缩第三方库
	gulp.src([
			pathUrl + 'node_modules/jquery/dist/jquery.min.js',
			//'../node_modules/lodash/lodash.min.js'			
		])
		.pipe(concat('libs.js'))
		//.pipe(sourcemaps.init())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		//.pipe(sourcemaps.write(pathUrl+'public/js/maps'))
		.pipe(gulp.dest(pathUrl+'public/js'))
});

//less编译
gulp.task('es6_less', function(){
	gulp.src([pathUrl+'src/less/style.less'])
		.pipe(less())
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ff 18', 'safari 5','ie 8','ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
		.pipe(concat('style.css'))
		.pipe(minifycss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(pathUrl+'public/css'))
});

//图片压缩
gulp.task('es6_images', function() {
	console.log(pathUrl+'src/images/**/*.*');
	return gulp.src([pathUrl+'src/images/**/*.*'])
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true,svgoPlugins: [{removeViewBox: false}],use: [pngquant()]})))
		.pipe(gulp.dest(pathUrl+'public/images'))
});

gulp.task('es6_watch', ()=>{
	gulp.watch(pathUrl+'src/less/*.*', ['es6_less']);
	gulp.watch(pathUrl+'src/images/**/*.*', ['es6_images']);
	//gulp.watch(pathUrl+'src/js/*.js', ['es6_comps']);
	signArr.forEach((file)=>{
		gulp.watch(pathUrl+'src/js/'+file+'.js', [file]);
	});
});

//js检查,合并，压缩公共js文件
gulp.task('util', function(){
	gulp.src(['../src/util/ajax.js', '../src/util/util.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('util.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('../public/js'));
});

const comps = [
	{name:'voiceType',dependencies:[]},
	{name:'voiceOrder',dependencies:[]},
	{name:'bbsDetail',dependencies:[]},
	{name:'bbsSearch',dependencies:[]},
	{name:'bbsUserCenter',dependencies:[]},
	{name:'contractType',dependencies:[]},
	{name:'contractList',dependencies:[]},
	{name:'contractDownload',dependencies:[]},
	{name:'contractConsultOrder',dependencies:[]},
	{name:'textType',dependencies:[]},
	{name:'textOrder',dependencies:[]},
	{name:'index',dependencies:[]},
	{name:'chat',dependencies:[]},
	{name:'bbsIndex',dependencies:[]}
];

//组件js合并压缩(comp)
gulp.task('comps', function(){
	for(var i=0;i<comps.length;i++){
		if(!comps[i].dependencies) comps[i].dependencies=[];
		//comps[i].dependencies.push("../src/comp/ui/class/ui.js");
		comps[i].dependencies.push("../src/comp/" + comps[i].name + "/class/*.js");
		comps[i].dependencies.push("../src/comp/" + comps[i].name + "/main.js");
		gulp.src(comps[i].dependencies)	
			/*
			.pipe(babel({
			  presets: ["es2015"]
			}))
			.pipe(through2.obj(function(file, enc, next) {
				browserify(file.path)
				// .transform(reactify)
				  .bundle(function(err, res) {
				  err && console.log(err.stack);
				  file.contents = res;
				  next(null, file);
				});
			}))*/
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat(comps[i].name + '.js'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('../public/js'));		
	}
});

//压缩前删除原来文件夹里的内容
gulp.task('clean', function(cb){
	//del(['../public/css/*.css', '../public/js/*.js'], cb);
	del.sync(['../public/css/', '../public/js/'], {force: true});
});

gulp.task('live', function(){
	livereload.listen();
	gulp.watch(['../src/**']).on('change', livereload.changed);
});

// 默认任务
gulp.task('default', function(){
	//gulp.run('clean', 'libs', 'util', 'comps', 'ie8Html5', 'copy', 'less', 'images', 'live');
	gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');

	gulp.watch('../src/less/*.*', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
	gulp.watch('../src/comp/**/main.js', ['comps']);
	gulp.watch('../src/util/*.*', ['util']);
});

// bower
gulp.task('bower', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd .bower && bower install';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
	})
});

//初始化项目
gulp.task('all', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd .bower && bower install';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
		gulp.run('libs', 'util', 'less', 'comps', 'less', 'images');
	})
});

//yuidoc . -o ../.doc
//生成js文档
gulp.task('doc', function(){
	var exec = require('child_process').exec;
	var cmdStr = 'cd .. && cd src && yuidoc . -o ../.doc';
	exec(cmdStr, function(err,stdout,stderr){
		console.log(stdout);
	})
});