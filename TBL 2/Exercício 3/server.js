const http = require('http');

const produtos = [
  { id: 1, nome: 'Notebook', preco: 3500 },
  { id: 2, nome: 'Mouse', preco: 80 },
  { id: 3, nome: 'Teclado', preco: 150 },
  { id: 4, nome: 'SSD', preco: 550 },
  { id: 5, nome: 'WebCam', preco: 530 }
];

const server = http.createServer((req, res) => {

  if (req.url === '/api/produtos' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(produtos));
  }

  else if (req.url.startsWith('/api/produtos/') && req.method === 'GET') {
    
    const id = parseInt(req.url.split('/')[3]);

    const produto = produtos.find(p => p.id === id);

    if (produto) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(produto));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Produto não encontrado' }));
    }
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});