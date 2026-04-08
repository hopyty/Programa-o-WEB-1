const express = require('express');
const app = express();
const port = 3000;

// Exercício 1 – Rotas básicas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao nosso sistema!');
});

app.get('/sobre', (req, res) => {
  res.send('Este sistema foi criado para fins de estudo de Express.js.');
});

app.get('/contato', (req, res) => {
  res.send('Entre em contato pelo email: contato@exemplo.com');
});

// Exercício 2 – API simples
app.get('/api/produto', (req, res) => {
  const produto = {
    nome: 'Camiseta',
    preco: 49.90
  };
  res.json(produto);
});

// Exercício 3 – Parâmetro de rota
app.get('/produto/:id', (req, res) => {
  const id = req.params.id;
  res.json({
    id: id,
    mensagem: `Você requisitou o produto de ID ${id}`
  });
});

// Exercício 4 – Query string
app.get('/busca', (req, res) => {
  const nome = req.query.nome;
  res.json({
    nomeRecebido: nome
  });
});

// Exercício 5 – Lista de dados
app.get('/api/alunos', (req, res) => {
  const alunos = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Bruno' },
    { id: 3, nome: 'Carlos' }
  ];
  res.json(alunos);
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});