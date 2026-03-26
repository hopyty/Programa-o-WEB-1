const http = require('http');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Hotypy20135@db.aysjzjaqzwhwcwiiodae.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

client.connect();

const server = http.createServer(async (req, res) => {

  if (req.url.startsWith('/usuario/')) {
    try {

      const partes = req.url.split('/');
      const id = partes[2];


      if (!id || isNaN(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ erro: 'ID inválido' }));
      }

      const result = await client.query(
        'SELECT * FROM usuarios WHERE id = $1',
        [id]
      );

      if (result.rows.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows[0]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensagem: 'Usuário não encontrado' }));
      }

    } catch (erro) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Erro no servidor' }));
      console.error(erro);
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
  }

});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});