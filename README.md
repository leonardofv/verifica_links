# Biblioteca Para validação de links em arquivos markdown no Node.js
### utilizei a lib do node FILE SYSTEM [File System](https://nodejs.org/api/fs.html)
### utilizei também a lib Chalk para da cor em algumas funções [Chalk](https://www.npmjs.com/package/chalk)

Antes de tudo instalei os modulos do node para a raiz do projeto
```
npm install -g node-modules
```

importamos o file system do node com o import abaixo
```
import fs from 'fs';
```

intalamos o chalk através do terminal com o seguinte comando
```
npm install chalk
```
para usar o chalk precisamos fazer sua importação
```
import chalk from 'chalk';
```
Exemplo de como usar o chalk
```
console.log(chalk.blue('Hello world!'));
```
Utilizei expressões Regulares para identificar os links do arquivo.md
```
const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
```

No arquivo .Json adicionei dois scripts cli e cli:valida já com os caminhos para executar os arquivos
```
"cli": "node ./src/cli.js ./arquivos/texto.md",
"cli:valida": "node ./src/cli.js ./arquivos/texto.md --valida"
```
com os caminhos já adicionado nesses scripts rodei os arquivos com o comando abaixo
```
npm rum cli 
npm rum cli:valida
```
executando o comando ``` npm run cli ```
retorna a lista de links sem validação
```
Lista de Links   [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  },
  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input'
  },
  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer'
  },
  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement'
  },
  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes'
  },
  { sitePessoal: 'https://site-de-apresentacao.vercel.app' },
  { 'Teste de retorno 400': 'https://httpstat.us/404' },
  { 'gatinho salsicha': 'http://gatinhosalsicha.com.br/' }
]
```
executando o comadno ``` npm run cli:valida ``` 
retorna todos os links já validados e com seus status code
```
Lista validada   [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList',
    status: '200 - OK'
  },
  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input',
    status: '200 - OK'
  },
  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer',
    status: '200 - OK'
  },
  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement',
    status: '404 - Not Found'
  },
  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes',
    status: '200 - OK'
  },
  {
    sitePessoal: 'https://site-de-apresentacao.vercel.app',
    status: '200 - OK'
  },
  {
    'Teste de retorno 400': 'https://httpstat.us/404',
    status: '404 - Not Found'
  },
  {
    'gatinho salsicha': 'http://gatinhosalsicha.com.br/',
    status: 'Link não encontrado'
  }
]
```
###Também trabalhei com requisições HTTP com API do node FATCH retornando promessas [FATCH](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

