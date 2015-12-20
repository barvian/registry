# Gulpfile.js

My jumping-off point for all new Gulp projects.

## Usage

The library will set up its tasks on the Gulp instance you pass it:

```javascript
import gulp from'gulp';
import gulpfile from 'gulpfile';

gulpfile(gulp, {
  // config
});
```

All available configuration options are:

```javascript
{
  browserSync: {
    watch: `{content,site}/**/*`,
    notify: true,
    scrollElementMapping: ['[role="main"]'],
    proxy: 'test.dev',
    snippetOptions: {
      rule: {
        match: /<\/html>/i,
        fn: function (snippet, match) {
          return snippet + match;
        }
      }
    }
  },

  deploy: {
    type: 'rsync',
    src: '.',
    username: prod.username,
    host: prod.host,
    dest: prod.root,
    excludeFirst: [

    ],
    include: [ // everything not already excluded

    ],
    exclude: [
      '*' // everything not included
    ],
    syncable: true
  },

  styles: {
    src: `${src}/styles/main.scss`,
    all: [`${src}/styles/**/*.scss`, `${src}/variables.json`],
    includePaths: [bower.config.directory],
    dest:`${dist}/styles`,
    autoprefixer: {
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false
    }
  },

  scripts: {
    src: `${src}/scripts/main.js`,
    dest: `${dist}/scripts`,
    bundle: 'main.js',
  },

  copy: {
    base: src,
    src: [
      `${vendor}/modernizr*.js`
    ],
    dest: dist,
  },

  fonts: {
    src: `${src}/fonts/**/*`,
    dest: `${dist}/fonts`
  },

  images: {
    src: `${src}/images/**/*`,
    dest: `${dist}/images`,
  },

  sprites: {
    src: `${src}/sprites/**/*`,
    dest: dist
  },

  clean: [
  ]
}
```

## Developing

All work happens in `src/`.  Watch and build changes automatically with `npm run watch`.
