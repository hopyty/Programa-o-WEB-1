const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url.startsWith('/usuario/')) {
    const partes = url.split('/');
    const idStr = partes[2];
    const id = Number(idStr);

    if (!idStr || isNaN(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'ID inválido' }));
      return;
    }

    const resposta = {
      id: id,
      nome: `Usuário ${id}`
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resposta));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});