import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.if(
            app.isProd,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.isProd,
            webpcss({
                webpClass: '.webp',
                noWebpClass: '.no-webp',
            })
        ))
        .pipe(app.plugins.if(
            app.isProd,
            autoprefixer({
                grid: 'autoplace',
                overrideBrowserslist: ['last 3 versions'],
                cascade: true,
            })
        ))
        .pipe(app.plugins.if(
            app.isProd,
            app.gulp.dest(app.path.build.css)
        ))
        .pipe(app.plugins.if(
            app.isProd,
            cleanCss()
        ))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}