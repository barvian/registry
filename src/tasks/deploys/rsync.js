import {log} from 'gulp-util';
import {rsync} from 'rsyncwrapper';

export const defaultConfig = {
  ssh: true,
  args: ['-azih']
}

export function deploy(cb, config, reverse) {
  const dest = `${config.username}@${config.host}:${config.dest}`;
  rsync(Object.assign(defaultConfig, config, {
    src: reverse ? dest : config.src,
    dest: reverse ? config.src : dest,
  }), function(error, stdout, stderr, cmd) {
    if (error) return cb(error);
    log(stdout);
    cb();
  });
};

export default deploy;