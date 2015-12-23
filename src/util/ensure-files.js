import fs from 'fs';

/**
 * @param {Array<string>} files
 * @param {Function} cb
 */

export function ensureFiles(files) {
  const missingFiles = files.reduce((prev, filePath) => {
    let fileFound = false;

    try {
      fileFound = fs.statSync(filePath).isFile();
    } catch (e) { }

    if (!fileFound) {
      prev.push(filePath + ' Not Found');
    }

    return prev;
  }, []);

  if (missingFiles.length) {
    throw new Error('Missing Required Files\n' + missingFiles.join('\n'));
  }
}

export default ensureFiles;