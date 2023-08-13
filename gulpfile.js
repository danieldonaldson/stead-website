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
    responsive = require('gulp-responsive'),
    sass = require('gulp-sass'),
    log = require('fancy-log'),
    critical = require('critical'),
    replace = require('gulp-replace'),
    debug = require('gulp-debug');


const srcFolder = 'v2',
    destFolder = 'dist',
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
        .pipe(gulp.dest('dist'));
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
        .pipe(gulp.dest('dist/.'));
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
        .pipe(gulp.dest('dist'));
};

gulp.task('watch', function () {
    gulp.watch(srcFolder + '/**/*.html', gulp.series(buildhtml, updateReferences));
    // gulp.watch(srcFolder + '/templates/*.html', gulp.series(buildhtml));
    // gulp.watch(destFolder + '/assets/img/*.jpg', gulp.series('webp'));
    // gulp.watch(destFolder + '/assets/img/*.png', gulp.series('webp'));
});

function webpunresponsive(cb) {
    return gulp.src([srcFolder + '/assets/img/nuk-pro-*.{jpg,png}', srcFolder + '/assets/img/{fav,apple-}icon*.{jpg,png}', srcFolder + '/assets/img/blurred-image-1.*'])
        .pipe(newer(destFolder + '/assets/img-responsive'))
        .pipe(responsive({
            '*.jpg': [{
                    rename: {
                        extname: '.webp'
                    },
                },
                {
                    rename: {
                        extname: '.jpg'
                    }
                }
            ],
            '*.png': [{
                    rename: {
                        extname: '.webp'
                    }
                },
                {
                    rename: {
                        extname: '.png'
                    }
                }
            ]
        }, {
            errorOnUnusedConfig: false
        }))
        .pipe(gulp.dest(destFolder + '/assets/img'));
}

function webpresponsive(cb) {
    return gulp.src(['./assets/img/*.{jpg,png}', '!./assets/img/*favicon*.{jpg,png}'])
        .pipe(responsive({
            '*.jpg': [
                //originals
                {
                    width: 60,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-tiny',
                        extname: '.jpg'
                    }
                },
                {
                    width: 120,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extrasmall',
                        extname: '.jpg'
                    }
                },
                {
                    width: 240,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-small',
                        extname: '.jpg'
                    }
                },
                {
                    width: 480,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-med',
                        extname: '.jpg'
                    }
                },
                {
                    width: 1024,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-large',
                        extname: '.jpg'
                    }
                },
                {
                    width: 2048,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extralarge',
                        extname: '.jpg'
                    }
                },
                {
                    width: 4096,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-huge',
                        extname: '.jpg'
                    }
                },
                //Webps
                {
                    width: 60,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-tiny',
                        extname: '.webp'
                    }
                },
                {
                    width: 120,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extrasmall',
                        extname: '.webp'
                    }
                },
                {
                    width: 240,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-small',
                        extname: '.webp'
                    }
                },
                {
                    width: 480,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-med',
                        extname: '.webp'
                    }
                },
                {
                    width: 1024,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-large',
                        extname: '.webp'
                    }
                },
                {
                    width: 2048,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extralarge',
                        extname: '.webp'
                    }
                },
                {
                    width: 4096,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-huge',
                        extname: '.webp'
                    }
                }
            ],
            '*.png': [
                //originals
                {
                    width: 60,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-tiny',
                        extname: '.png'
                    }
                },
                {
                    width: 120,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extrasmall',
                        extname: '.png'
                    }
                },
                {
                    width: 240,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-small',
                        extname: '.png'
                    }
                },
                {
                    width: 480,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-med',
                        extname: '.png'
                    }
                },
                {
                    width: 1024,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-large',
                        extname: '.png'
                    }
                },
                {
                    width: 2048,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extralarge',
                        extname: '.png'
                    }
                },
                {
                    width: 4096,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-huge',
                        extname: '.png'
                    }
                },
                //Webps
                {
                    width: 60,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-tiny',
                        extname: '.webp'
                    }
                },
                {
                    width: 120,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extrasmall',
                        extname: '.webp'
                    }
                },
                {
                    width: 240,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-small',
                        extname: '.webp'
                    }
                },
                {
                    width: 480,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-med',
                        extname: '.webp'
                    }
                },
                {
                    width: 1024,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-large',
                        extname: '.webp'
                    }
                },
                {
                    width: 2048,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-extralarge',
                        extname: '.webp'
                    }
                },
                {
                    width: 4096,
                    withoutEnlargement: false,
                    rename: {
                        suffix: '-huge',
                        extname: '.webp'
                    }
                }
            ],

        }, {
            errorOnUnusedConfig: false,
            errorOnEnlargement: false
        }))
        .pipe(gulp.dest(destFolder + '/assets/img-responsive'))
}

// Generate & Inline Critical-path CSS
function gulpcritical(cb) {
    return gulp.src(tempFolder + '/nunjuckshtml/*.html')
        .pipe(critical.stream({
            base: 'dist/',
            //rebase: './dist',
            inline: true,
            minify: true,
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

exports.builddev = gulp.series(cleanall, cleanTemp, buildhtml, gulpsass, gulpcopydev, gulpcopyBS, gulpcopyStatic);
exports.buildall = gulp.series(cleanall, cleanTemp, buildhtml, gulpsass, gulppurgecss, gulpcopyBS, gulpCleanCss, uglyJS, gulpcritical, rebaseURLs, hashCSSJS, updateReferences, gsitemap, compressAll, gulpcopyStatic);
exports.buildhtml = buildhtml;
exports.cleanall = cleanall;
exports.gulpcritical = gulpcritical;
exports.webpres = webpresponsive;
exports.webpun = webpunresponsive;
exports.copystatic = gulpcopyStatic;

// exports.minify = minify;
// exports.nunj = nunj;
// exports.webp = webp;