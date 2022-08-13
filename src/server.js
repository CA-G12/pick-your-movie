const http = require('http');
const console = require('console');

const router = require('./router');

const port = process.env.PORT || 3000;

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`The server is listening on port: ${port}, and ready to accept requests.`);
});
