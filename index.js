const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hallo from CI/CD pipeline! This build from Jenkins -> GHCR -> DOCKER CONTAINER.\n');
});

server.listen(3000, () => {
  console.log('Server run on port 3000');
});