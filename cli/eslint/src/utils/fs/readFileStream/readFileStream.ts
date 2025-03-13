import fs from 'node:fs';

/**
 * Reads a file using a readable stream and returns its contents via callback
 * @param {string} filePath - Path to the file to read
 * @param {function(Error | null, string | null): void} callback - Callback function that receives error and file data
 * @returns {void}
 */
export const readFileStream = (
  filePath: string,
  callback: (err: Error | null, data: string | null) => void
) => {
  const chunks: string[] = [];
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  readStream.on('data', (chunk: string) => {
    chunks.push(chunk);
  });

  readStream.on('end', () => {
    callback(null, chunks.join(''));
  });

  readStream.on('error', (error) => {
    callback(error, null);
  });
};
