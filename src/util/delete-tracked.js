import flatten from 'array-flatten';
import del from 'del';
import fs from 'fs';

export default function(cb, dests, logFile, extra = []) {
  flatten([dests]).forEach(dest => {
    fs.readFile(`${dest}/${logFile}`, 'utf8', (err, data) => {
      const files = (err ? [] : JSON.parse(data)).concat([logFile]);
      del(
        files.map(file => `${dest}/${file}`).concat(extra)
      , cb)
    });
  });
}
