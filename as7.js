const http = require('http');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
if (req.method === 'GET' && req.url === '/') {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(`
<h1>User Information Form</h1>
<form method="POST" action="/submit">
Name: <input type="text" name="name"><br><br>
Email: <input type="text" name="email"><br><br>
<input type="submit" value="Submit">
</form>
`);
}
else if (req.method === 'POST' && req.url === '/submit') {
let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
const data = querystring.parse(body);
const name = data.name;
const email = data.email;
res.writeHead(200, { 'Content-Type': 'text/html' });
if (!name || !email || !email.includes('@')) {
res.end('<h1>Validation Failed</h1><p>Valid name and email are required.</p>');
} else {
res.end(`
<h1>Registration Successful</h1>
<p>Name: ${name}</p>
<p>Email: ${email}</p>
`);
}
});
}
});
server.listen(3000, () => console.log('Server running on port 3000'));