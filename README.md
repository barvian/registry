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

All available configuration options are:

```javascript
{
  sync: {
    user: 'USERNAME',
    host: 'DOMAIN.TLD',
    dest: '/path/to/destination/folder/',
    exclude_list: 'rsync-exclude.txt'
  },

  styles: {
    src: `${src}/styles/main.scss`,
    all: `${src}/styles/**/*.scss`,
    includePaths: [bower.config.directory],
    dest:`${dist}/styles`,
    autoprefixer: {
      browsers: ['> 5%', 'last 2 versions'],
      cascade: false
    }
  },

  scripts: {
    src: `${src}/scripts/main.js`,
    babelIgnore: new RegExp(`(${bower.config.directory})|(${vendor})`),
    dest: `${dist}/scripts`,
    bundle: 'main',
  },

  copy: {
    base: src,
    src: [
      `${vendor}/modernizr*.js`
    ],
    dest: dist,
    watchable: true
  },

  fonts: {
    src: `${src}/fonts/**/*`,
    dest: `${dist}/fonts`
  },

  images: {
    src: `${src}/images/**/*`,
    dest: `${dist}/images`,
    watchable: true
  },

  clean: {
    target: [
      '.sass-cache/',
      dist,
    ]
  },

  watch: {
    needsReload: `{content,site}/**/*`,
    browserSync: {
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
