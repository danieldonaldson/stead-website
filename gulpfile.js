import {stream as critical} from 'critical';

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const gulp = require('gulp'),
    nunjucks = require('gulp-nunjucks'),
    purgecss = require('gulp-css-purge'),
    htmlmin = require('gulp-htmlmin'),
    gzip = require('gulp-gzip'),
    hash = require('gulp-hash'),
    references = require('gulp-hash-references'),
    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline,
    del = require('del'),
    sitemap = require('gulp-sitemap'),
    newer = require('gulp-newer'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass')(require('sass')),
    log = require('fancy-log'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug');

var exports = {};

const srcFolder = 'src',
    destFolder = 'dist-stead',
    tempFolder = 'tmp',
    currentUrl = 'https://stead.africa';

function gulpsass(cb) {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(tempFolder + '/assets/css'));
}

function gulppurgecss(cb) {
    //this doesnt seem to work with bootstrap. who knows why???
    return gulp.src([tempFolder + '/assets/css/*.css', './assets/css/*.css', ])
        .pipe(purgecss({
            content: ['./assets/**/*.{html,js,css}', tempFolder + '/**/*.{html,js,css}'],
            trim: true,
            shorten: true,
            //verbose: true
        }))
        .pipe(gulp.dest(tempFolder + '/assets/css'))
}

function gulpcopyBS(cb) {
    return gulp.src(['assets/css/bootstrap.min.css'])
        .pipe(gulp.dest(tempFolder + '/assets/css'))
}

function gulpcopyStatic(cb) {
    return gulp.src('./assets/{img,fonts,favicon,img-responsive,signature,files}/**/*')
        // .pipe(debug())
        .pipe(newer(destFolder + '/assets'))
        .pipe(gulp.dest(destFolder + '/assets'))

}

function gulpCleanCss(cb) {
    return gulp.src(tempFolder + '/assets/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(tempFolder + '/assets/css'));
}

function compressAll(cb) {
    return gulp.src(destFolder + '/**/*.{html,css,js,xml,ttf,otf,md,eot,woff,woff2,svg}')
        .pipe(gzip({
            gzipOptions: {
                level: 9
            },
            threshold: 1024,
            skipGrowingFiles: true
        }))
        .pipe(gulp.dest('dist-stead'));
};

function hashCSSJS(cb) {
    return gulp.src(tempFolder + '/assets/{css,js}/**/*.{js,css}')
        .pipe(hash()) // Generate hashes for the CSS files
        .pipe(gulp.dest(destFolder + '/assets')) // Save the renamed CSS files (e.g. style.123456.css)
        .pipe(hash.manifest('asset-manifest.json')) // Generate a manifest file
        .pipe(gulp.dest(tempFolder)); // Save the manifest file
};

function updateReferences(cb) {
    return gulp.src(tempFolder + '/rebasedcss/*.html')
        .pipe(references(tempFolder + '/asset-manifest.json')) // Replace file paths in index.html according to the manifest
        .pipe(gulp.dest('dist-stead/.'));
};

function uglyJS(cb) {
    return pipeline(
        gulp.src('assets/**/*.js'),
        uglify(),
        gulp.dest(tempFolder + '/assets')
    );
}

function cleanall(cb) {
    return del([
        destFolder + '/assets/css/',
        destFolder + '/assets/js/',
        destFolder + '/**/*.html',
        destFolder + '/**/*.gz',
        destFolder + '/**/*.xml',
        '!' + destFolder + '/brAlgIdEReoDclATerATEnESTRINuLaiNa/*'
    ]);
};

function cleanTemp(cb) {
    return del([
        tempFolder
    ]);
};

function gsitemap(cb) {
    return gulp.src(srcFolder + '/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: currentUrl
        }))
        .pipe(gulp.dest('dist-stead'));
};

gulp.task('watch', function () {
    gulp.watch(srcFolder + '/**/*.html', gulp.series(buildhtml, updateReferences));
    // gulp.watch(srcFolder + '/templates/*.html', gulp.series(buildhtml));
    // gulp.watch(destFolder + '/assets/img/*.jpg', gulp.series('webp'));
    // gulp.watch(destFolder + '/assets/img/*.png', gulp.series('webp'));
});

// Generate & Inline Critical-path CSS
function gulpcritical(cb) {
    return gulp.src(tempFolder + '/nunjuckshtml/*.html')
        .pipe(critical({
            base: 'dist-stead/',
            //rebase: './dist',
            inline: true,
            css: [
                tempFolder + '/assets/css/bootstrap.min.css',
                tempFolder + '/assets/css/font-awesome.min.css',
                // tempFolder + '/assets/css/now-ui-kit.css',
                tempFolder + '/assets/css/googlefont.css',
            ]
        }))
        .on('error', err => {
            log.error(err.message);
        })
        .pipe(gulp.dest('tmp/inlinecss'));
};

function rebaseURLs(cb) {
    return gulp.src(['./tmp/inlinecss/*.html'])
        .pipe(replace('../assets/fonts/', './assets/fonts/'))
        .pipe(gulp.dest('./tmp/rebasedcss'));
};


function buildhtml(cb) {
    return gulp.src(srcFolder + '/*.html')
        .pipe(nunjucks.compile({
            path: [srcFolder + '/templates']
        }))
        //.pipe(newer(tempFolder + 'nunjuckshtml'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
        }))
        .pipe(gulp.dest(tempFolder + '/nunjuckshtml'));
};

function gulpcopydev(cb) {
    gulp.src([tempFolder + '/nunjuckshtml/**/*.html'])
        .pipe(gulp.dest(destFolder));
    return gulp.src([tempFolder + '/assets/**/*.css', './assets/**/*.js','./assets/**/*.css'])
        .pipe(gulp.dest(destFolder + '/assets/'));
    // gulp.src(['./assets/**/*.js','./assets/**/*.css'])
    //     .pipe(gulp.dest(destFolder + '/assets/'));
};




// const {
//   series
// } = require('gulp');

// exports.buildall = series(cleanTemp, buildhtml, gulppurgecss, uglyJS, hashCSSJS, updateReferences, gsitemap,compressAll);

// exports.builddev = gulp.series(cleanall, cleanTemp, buildhtml, gulpsass, gulpcopydev, gulpcopyBS, gulpcopyStatic);
gulp.task("build", 
    gulp.series(cleanall, cleanTemp, buildhtml, gulpsass, gulppurgecss, gulpcopyBS, gulpCleanCss, uglyJS, gulpcritical, rebaseURLs, hashCSSJS, updateReferences, gsitemap, compressAll, gulpcopyStatic)
);
// exports.buildhtml = buildhtml;
// exports.cleanall = cleanall;
// exports.gulpcritical = gulpcritical;
// exports.copystatic = gulpcopyStatic;

// exports.minify = minify;
// exports.nunj = nunj;
// exports.webp = webp;