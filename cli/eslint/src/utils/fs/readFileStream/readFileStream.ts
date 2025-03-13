import fs from 'node:fs';

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
