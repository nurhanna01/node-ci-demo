const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hallo from CI/CD pipeline! This build from Jenkins -> ECR -> ECS.\n');
});

server.listen(3000, () => {
  console.log('Server jalan di port 3000');
});