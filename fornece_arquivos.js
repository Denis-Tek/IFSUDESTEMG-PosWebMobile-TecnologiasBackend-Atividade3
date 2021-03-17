const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router  = express.Router();

const mimeTypes = {
  html: "text/html",
  css:  "text/css",
  js:   "application/javascript",
  png:  "image/png",
  jpeg: "image/jpeg",
  jpg:  "image/jpg",
  woff: "font/woof",
  ico:  "image/png"
}

router.get(/^\/.*\.(html|ico)$/, (req, res) => {  
    servirArquivoOuDiretorio(req, res);
});    

router.get(/^\/(js|css|img)\/.*$/, (req, res) => {  
    servirArquivoOuDiretorio(req, res);
});    

function servirArquivoOuDiretorio(req, res) {
  let caminho_completo_recurso = path.join(process.cwd(), decodeURI(req.url));
  console.log(caminho_completo_recurso);

  let recurso_carregado;
  try {
    recurso_carregado = fs.lstatSync(caminho_completo_recurso);
  } catch (error) {
    res.writeHead(404, {'Content-Type': 'text/plain; charset="utf-8"'});
    res.write('404: Arquivo não encontrado!');
    res.end();
    return;
  }

  if (recurso_carregado.isFile()) {
    let extensao = path.extname(caminho_completo_recurso).substring(1);
    let mimeType = mimeTypes[extensao] || 'text/plain; charset="utf-8"';
    res.writeHead(200, {'Content-Type': mimeType});

    let stream_arquivo = fs.createReadStream(caminho_completo_recurso);
    stream_arquivo.pipe(res); 
  } else if (recurso_carregado.isDirectory()) {
    res.writeHead(302, {'Location': 'index.html'});
    res.end();
  } else {
      res.writeHead(500, {'Content-Type': 'text/plain; charset="utf-8"'})
      res.write('500: Erro interno do servidor!');
      res.end();  
  }
}; 

module.exports = router;