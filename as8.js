const fs = require('fs');
const url = require('url');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('fileOperation', (status, message) => {
console.log(`[EVENT TRIGGERED] Status: ${status.toUpperCase()} | Message:
${message}`);
});
const sampleUrl = 'https://example.com';
const parsedUrl = url.parse(sampleUrl, true);
console.log('--- URL Module Demo ---');
console.log(`Host: ${parsedUrl.host}`);
console.log(`Pathname: ${parsedUrl.pathname}`);
console.log(`Query Month: ${parsedUrl.query.month}\n`);
console.log('--- File System Module Demo ---');
const fileName = 'demo.txt';
const fileContent = `This file was generated based on data from: ${parsedUrl.host}\n`;
fs.writeFile(fileName, fileContent, (err) => {
if (err) {
myEmitter.emit('fileOperation', 'error', 'Failed to write file.');
return;
}
myEmitter.emit('fileOperation', 'success', `Successfully wrote to ${fileName}`);
fs.appendFile(fileName, 'Adding a new line of text!\n', (err) => {
if (err) {
myEmitter.emit('fileOperation', 'error', 'Failed to append data.');
return;
}
myEmitter.emit('fileOperation', 'success', `Successfully appended data to ${fileName}`);
fs.readFile(fileName, 'utf8', (err, data) => {
if (err) {
myEmitter.emit('fileOperation', 'error', 'Failed to read file.');
return;
}
myEmitter.emit('fileOperation', 'success', 'Successfully read file content.');
console.log('\n--- Final File Content ---');
console.log(data);
});
});
});