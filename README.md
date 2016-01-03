# Registry

My jumping-off point for all new Gulp projects.

## Installation

```javascript
npm install barvian/registry --save-dev
```

## Usage

Add the registry to an existing Gulp instance, passing in task configurations. To disable certain tasks, simply omit them from configuration.

```javascript
import gulp from'gulp';
import tasks from 'barvian-registry';

gulp.registry(new BarvianRegistry({
  // config
}));
```

All available configuration options are:

```javascript
{
  browserSync: {
    files: `{content,site}/**/*`,
    notify: true,
    scrollElementMapping: ['[role="main"]'],
    proxy: 'test.dev',
    snippetOptions: {
      rule: {
        match: /<\/html>/i,
        fn: (snippet, match) => snippet + match
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

  elements: {
    base: `${src}/elements`,
    entry: 'elements.html',
    dest: `${dest}/elements`
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
    all: [
      `${src}/scripts/**/*.js`,
      `!${src}/${vendor}/**/*`,
      path.basename(__filename)
    ],
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
