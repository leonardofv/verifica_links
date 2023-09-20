import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;

function imprime(result, identificador = ' ') { //Depois adicionei o identificador para mostrar o nome do arquivo dos links.
//Inicializei o idenficador com uma str vazia para caso chamar a função e o segundo parâ não ser passado, não printe undefined
    console.log(chalk.yellow('Lista de Links'),
     chalk.black.bgGreen(identificador),
      result);
};

async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    try {
        fs.lstatSync(caminho);
    }catch(erro) {
        if(erro.code === 'ENOENT') {
            console.log(chalk.green('Arquivo ou diretório não existente'));
            return; //não retornará a stack de erro, somente o console.log()
        }
    }
    //verificando se é arquivo ou diretório com fs
    if (fs.lstatSync(caminho).isFile()) {
        const result = await pegaArquivo(argumentos[2]);
        imprime(result);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho); //ler diretório
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprime(lista, nomeDoArquivo); //segundo parâmetro para mostrar o nome do arquivo dos links
        });
    };
};

processaTexto(caminho);