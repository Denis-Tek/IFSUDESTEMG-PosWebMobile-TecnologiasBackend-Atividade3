const express = require('express');

const fornece_arquivos = require('./fornece_arquivos.js');
const parametros       = require('./params.js');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.writeHead(302, {'Location': 'index.html'});
  res.end();
});

app.get('/autor', (req, res) => {
    res.send("<h1>Denis Pereira Raymundo</h1>");
}); 

app.get('/json', (req, res) => {
  res.status(200).json({Autor: "Denis Pereira Raymundo", Nota: 10});
});

app.post('/post/:mensagem', (req, res) => {
    res.send('Acesso via método post.\nMensagem: ' + req.params.mensagem);
})

app.use(fornece_arquivos);
app.use(parametros);

app.get('*', (req, res) => {
    res.status(404).send("Não tente invadir o meu site. Esta rota não existe!");
    res.end();
    console.log(`Um mané com IP ${req.ip} tentou acessar a rota inexistente ${req.path}`);
});

app.listen(port, ()=> {
   console.log(`Servidor atendendo na porta ${port}`);
} );