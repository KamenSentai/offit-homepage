// Imports plugins

import gulp            from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync     from 'browser-sync'
import babelify        from 'babelify'
import browserify      from 'browserify'
import source          from 'vinyl-source-stream'
import buffer          from 'vinyl-buffer'
import watchify        from 'watchify'

// Launch plugins loader

const $ = gulpLoadPlugins()

// Create session

browserSync.create()

// Build paths

const server  = 'htdocs'
const folders = process.cwd().split('/')
const project = `${folders[folders.length - 1]}/`

let local = ''

const buildLocal = () => {
  let index = 0
  for (const folder of folders) {
    if (folder == server) {
      index = folders.indexOf(server)
      for (let i = index + 1 ; i < folders.length ; i++) {
        if (folders[i] != project) local += `${folders[i]}/`
        else break
      }
      break
    }
  }
}
buildLocal()

const config = {
  src  : 'src/',
  dist : 'dist/'
}

const message = {
  compiled   : '<%= file.relative %>: file compiled',
  exported   : '<%= file.relative %>: file exported',
  transpiled : '<%= file.relative %>: file transpiled',
  minified   : '<%= file.relative %>: file minified',
  cleaned    : '<%= file.relative %>: file cleaned',
  error      : '<%= error.message %>'
}

/**
 * 
 * Development
 * 
 */

// Server

gulp.task('server', ['data', 'favicons', 'images', 'styles', 'scripts', 'views'], () => {
  browserSync.init({
    proxy   : `http://localhost/${local}${config.dist}`,
    browser : 'Google Chrome'
  })
  gulp.watch(`${config.src}data/*.json`, ['data'])
  gulp.watch(`${config.src}img/*.+(png|jpg|jpeg|gif|svg)`, ['images'])
  gulp.watch([
    `${config.src}scss/**/*.scss`,
    `${config.src}scss/*.scss`
  ], ['styles'])
  gulp.watch([
    `${config.src}**/*.pug`,
    `${config.src}*.pug`
  ],['views'])
})

// Data

gulp.task('data', () => {
  return gulp.src(`${config.src}data/*.json`)
    .pipe($.plumber())
    .on('error', $.notify.onError({
      title   : 'JSON',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}data/`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'JSON',
      message : message.exported,
      sound   : 'beep'
    }))
})

// Favicons

gulp.task('favicons', () => {
  return gulp.src(`${config.src}favicons/*.*`)
    .pipe($.plumber())
    .on('error', $.notify.onError({
      title   : 'Favicons',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}favicons/`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'Favicons',
      message : message.exported,
      sound   : 'beep'
    }))
})

// Images

gulp.task('images', () => {
  return gulp.src(`${config.src}img/*.+(png|jpg|jpeg|gif|svg)`)
    .pipe($.plumber())
    .on('error', $.notify.onError({
      title   : 'Move images',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}images/`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'Move images',
      message : message.exported,
      sound   : 'beep'
    }))
})

// Styles

gulp.task('styles', () => {
  return gulp.src(`${config.src}scss/app.scss`)
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sass())
    .on('error', $.notify.onError({
      title   : 'SASS',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${config.dist}styles/`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'SASS',
      message : message.compiled,
      sound   : 'beep'
    }))
})

// Scripts

let bundler = null

const bundle = () => {
  bundler.bundle()
    .pipe($.plumber())
    .on('error', $.notify.onError({
      title   : 'JS',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${config.dist}scripts/`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'JS',
      message : message.transpiled,
      sound   : 'beep'
    }))
}

gulp.task('scripts', () => {
  bundler = browserify({
    entries : `${config.src}js/app.js`,
    debug   : true,
    paths   : ['./node_modules', `${config.src}js/`]
  }).transform(babelify)
  bundler.plugin(watchify)
  bundler.on('update', bundle)
  bundle()
})

// Views

gulp.task('views', () => {
  return gulp.src(`${config.src}*.pug`)
    .pipe($.plumber())
    .pipe($.pug())
    .on('error', $.notify.onError({
      title   : 'PUG',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}`))
    .pipe(browserSync.stream())
    .pipe($.notify({
      title   : 'PUG',
      message : message.exported,
      sound   : 'beep'
    }))
})

/**
 * 
 * Production
 * 
 */

// CSS

gulp.task('minCss', () => {
  return gulp.src(`${config.dist}styles/app.css`)
    .pipe($.cssnano())
    .on('error', $.notify.onError({
      title   : 'Minify CSS',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}styles/`))
    .pipe($.notify({
      title   : 'Minify CSS',
      message : message.minified,
      sound   : 'beep'
    }))
})

// JS

gulp.task('minJs', () => {
  return gulp.src(`${config.dist}scripts/app.js`)
    .pipe($.uglify())
    .on('error', $.notify.onError({
      title   : 'Minify JS',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}scripts/`))
    .pipe($.notify({
      title   : 'Minify JS',
      message : message.minified,
      sound   : 'beep'
    }))
})

// Images

gulp.task('minImages', () => {
  return gulp.src(`${config.dist}images/*.+(png|jpg|jpeg|gif|svg)`)
    .pipe($.imagemin())
    .on('error', $.notify.onError({
      title   : 'Minfiy images',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe(gulp.dest(`${config.dist}images/`))
    .pipe($.notify({
      title   : 'Minify images',
      message : message.minified,
      sound   : 'beep'
    }))
})

// Maps

gulp.task('cleanMaps', () => {
  return gulp.src([
    `${config.dist}scripts/app.js.map`,
    `${config.dist}styles/app.css.map`
  ])
    .pipe($.clean({
      force: true,
      read: false
    }))
    .on('error', $.notify.onError({
      title   : 'Clean maps',
      message : message.error,
      sound   : 'beep'
    }))
    .pipe($.notify({
      title   : 'Clean maps',
      message : message.cleaned,
      sound   : 'beep'
    }))
})

/**
 * 
 * Run
 * 
 */

gulp.task('default', ['server'])
gulp.task('prod', ['minCss', 'minJs', 'minImages', 'cleanMaps'])