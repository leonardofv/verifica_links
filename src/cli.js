import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;

function imprime(result) {
    console.log(chalk.yellow('Lista de Links'), result);
};

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    //verificando se é arquivo ou diretório com fs
    if (fs.lstatSync(caminho).isFile()) {
        const result = await pegaArquivo(argumentos[2]);
        imprime(result);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho); //ler diretório
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprime(lista);
        });
    };
};

processaTexto(caminho);