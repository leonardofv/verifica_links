//para usar o import adicionei o "type": "module" no packjson.json após o main
import chalk from 'chalk';
import fs from 'fs';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];  //espalhando todo o tento em um array
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length != 0 ? resultados  : 'Não há links no arquivo';
};
//envolver a palavra da chave do objeto entre colchetes para o JS reconhecer como chave
// como {} é a forma que o JS reconhece uma inicialização de função, temos que englobar todo o objeto que está sendo criado por parenteses.

function trataErro(erro) {
    throw new Error(chalk.red(erro.code));
};

// async/await
//async => avisando que é uma função assíncrona
//await => pega o retorno(resolve, pega os dados) da promessa e joga na variável 
async function pegaArquivo(caminho_arquivo) {
    try {
        const encoding = 'UTF-8';
        const texto = await fs.promises.readFile(caminho_arquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
};

export default pegaArquivo;


//Promises com then 
// function pegaArquivo(caminho_arquivo) {
//     const encoding = 'UTF-8';
//     fs.promises.readFile(caminho_arquivo, encoding)
//       .then((text) => console.log(chalk.green(text)))
//       .catch((erro) => trataErro(erro))
//       //.cath(trataErro)
// };
