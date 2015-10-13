# Gulpfile.js

My jumping-off point for all new Gulp projects.

## Usage

Set up a basic `gulpfile.js` and import all the tasks into it:

```javascript
import gulp from'gulp';
import tasks from 'gulpfile';

gulp.tasks = tasks({
  // config
});
```

A fully-formed configuration object looks like:

```javascript
{
  sync: {
    user: 'USERNAME',
    host: 'DOMAIN.TLD',
    dest: '/path/to/destination/folder/',
    exclude_list: 'rsync-exclude.txt'
  },

  styles: {
    source: `${src}/styles/main.scss`,
    includePaths: [bower.config.directory],
    dest:`${dist}/styles`,
    autoprefixer: {
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false
    },
    watchable: `${src}/styles/**/*.scss`
  },

  scripts: {
    source: `${src}/scripts/main.js`,
    babelIgnore: new RegExp(`(${bower.config.directory})|(${vendor})`),
    dest: `${dist}/scripts`,
    bundle: 'main',
  },

  copy: {
    base: src,
    source: [
      `${vendor}/modernizr*.js`
    ],
    dest: dist,
    watchable: true
  },

  fonts: {
    source: `${src}/fonts/**/*`,
    dest: `${dist}/fonts`
  },

  images: {
    source: `${src}/images/**/*`,
    dest: `${dist}/images`,
    watchable: true
  },

  clean: {
    all: [
      '.sass-cache/',
      dist,
    ]
  },

  browserSync: {
    needsReload: `{content,site}/**/*`,
    config: {
      notify: true,
      logPrefix: 'Test',
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
    }
  }
}
```
