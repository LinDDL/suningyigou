const gulp = require("gulp");
const babel = require("gulp-babel");
const concat=require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const sass=require("gulp-sass");
sass.compiler=require("node-sass")
const connect =require("gulp-connect");
const proxy = require("http-proxy-middleware");
const uglify = require('gulp-uglify');

gulp.task("html",()=>{
    return gulp.src("*.html")
    .pipe(gulp.dest("./dist/"))
    .pipe(connect.reload())
})
gulp.task("script1",()=>{
    return gulp.src([
            "./javascripts/Accordion.js",
            "./javascripts/banner-swiper.js",
            "./javascripts/index.js",
            "./javascripts/Mounting.js",
            "./javascripts/renderPage.js",
            "./javascripts/select-check.js",
            "./javascripts/select1.js",
            "./javascripts/swiper.js",
            "./javascripts/time.js",
            "./javascripts/top_active.js",
            "./javascripts/totop-swiper.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("script2",()=>{
    return gulp.src([
            "./javascripts/detail.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("detail.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("script3",()=>{
    return gulp.src([
            "./javascripts/list.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("list.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("script4",()=>{
    return gulp.src([
            "./javascripts/login.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("login.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("script6",()=>{
    return gulp.src([
            "./javascripts/register.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("register.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("script5",()=>{
    return gulp.src([
            "./javascripts/cart.js",
        ])
    .pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(concat("cart.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/javascripts"))
})
gulp.task("uglifyjs",function(){
    return gulp.src("./dist/javascripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/javascripts/min.js"))
})
gulp.task("build",["script","uglifyjs"])
gulp.task("images",()=>{
    return gulp.src(["images/*.*"])
    .pipe(gulp.dest("dist/images/"))
})
gulp.task("styles", ()=>{
    return gulp.src(["stylesheets/*.css"])
    .pipe(gulp.dest("dist/stylesheets/"));
})
gulp.task("sass",()=>{
    return gulp.src("./sass/*.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("./dist/stylesheets/"))
})
gulp.task("connect",()=>{
    connect.server({
        port: 8001,
        root:"dist/",
        livereload:true,
        middleware:function(connect,opt){
            return [
                proxy("/api",{
                    target:"http://localhost:3000",
                    pathRewrite:{
                        "^/api":"/"
                    }
                })
            ]
        }
    })
})
gulp.task("watch",()=>{
    gulp.watch("*.html",["html"])
    gulp.watch("images/*.*",["html","images"]);
    gulp.watch("javascripts/*.js",["html","script1"])
    gulp.watch("javascripts/*.js",["html","script2"])
    gulp.watch("javascripts/*.js",["html","script3"])
    gulp.watch("javascripts/*.js",["html","script4"])
    gulp.watch("javascripts/*.js",["html","script5"])
    gulp.watch("javascripts/*.js",["html","script6"])
    gulp.watch("sass/*.scss",["html","sass"])

})
gulp.task("default",["watch","connect","html","script1","images","sass","script2","script3","script4","script5","script6"]);
