import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

//depois de criarmos checaStatus precisamos colocar imprime como async
async function imprime(valida, result, identificador = ' ') { //Depois adicionei o identificador para mostrar o nome do arquivo dos links.
//Inicializei o idenficador com uma str vazia para caso chamar a função e o segundo parâ não ser passado, não printe undefined
    if(valida) {
        console.log(chalk.yellow('Lista validada'),
        chalk.black.bgGreen(identificador),
        await listaValidada(result));
    }else {
        console.log(chalk.yellow('Lista de Links'),
         chalk.black.bgGreen(identificador),
          result);
    }
};

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

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
        imprime(valida, result);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho); //ler diretório
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprime(valida, lista, nomeDoArquivo); //segundo parâmetro para mostrar o nome do arquivo dos links
        });
    };
};

processaTexto(caminho);