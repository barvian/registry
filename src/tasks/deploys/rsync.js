import {log} from 'gulp-util';
import {rsync} from 'rsyncwrapper';

export function deploy(done, config, reverse) {
  const dest = `${config.username}@${config.host}:${config.dest}`;
  rsync({
    src: reverse ? dest : config.src,
    dest: reverse ? config.src : dest,
    ssh: true,
    args: ['-azih'],
    dryRun: config.dryRun,
    excludeFirst: config.excludeFirst,
    include: config.include,
    exclude: config.exclude
  }, function(error, stdout, stderr, cmd) {
    if (error) return done(error);
    log(stdout);
    done();
  });
};

export default deploy;