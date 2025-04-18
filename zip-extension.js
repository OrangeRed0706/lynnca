import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import archiver from 'archiver';

// Get the directory name equivalent to __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a file to stream archive data to
const output = createWriteStream(path.join(__dirname, 'extension.zip'));
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function () {
    console.log('Extension has been zipped successfully!');
    console.log('Total bytes: ' + archive.pointer());
});

// Good practice to catch warnings
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

// Good practice to catch errors
archive.on('error', function (err) {
    throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from the dist directory
archive.directory(path.join(__dirname, 'dist/'), false);

// Finalize the archive
archive.finalize();
