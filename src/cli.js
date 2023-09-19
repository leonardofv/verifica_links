import pegaArquivo from "./index.js";
import chalk from "chalk";

const caminho = process.argv;

async function processaTexto(caminho) {
    const result = await pegaArquivo(caminho[2]);
    console.log(chalk.yellow('Links'), result);
};

processaTexto(caminho);