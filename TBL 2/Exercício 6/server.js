const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/usuarios' && req.method === 'GET') {
      
      const resultado = await pool.query('SELECT * FROM usuarios'); // 3. Aguardar o resultado com await

      const usuarios = resultado.rows;

      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify(usuarios));

    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
    }

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ erro: 'Erro ao buscar usuários' }));
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
