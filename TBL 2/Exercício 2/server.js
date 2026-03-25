const http = require('http');

const server = http.createServer((req, res) => {

  if (req.url === '/teste') {
    
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Requisicao GET recebida com sucesso!');
    } else {

      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end(`Metodo ${req.method} não permitido.`);
    }

  } else {

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Rota não encontrada.');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});