import chalk from "chalk";

function extraiLinks(links) {
    return links.map( (objetoLink) => Object.values(objetoLink).join()); //Join pega o conteudo do array, converte em Str e joga pra fora.
}

//Função para trabalhar com o status code
async function checaStatus(ListaURLs) {
    //All recebe uma lista de promessas pendentes, resolver e retornar resolvida.
    const arrStaus = await Promise.all(
        ListaURLs.map(async (url) => {
            try {
                const res = await fetch(url)
                return `${res.status} - ${res.statusText}`;
            } catch(erro) {
                return manejaErros(erro);
            }
       })
    )
    return arrStaus;
}
//Tratar de links que não estão mais disponíveis
function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    }else {
        return 'Algo deu errado';
    }
}

//assim como checaStatus é async listaValidada também precisa ser
//lista validada precisa saber que precisa acontecer algo dentro de chegaStatus e retornar o result
export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links); //status code
    //envolver toda a arrow func entre () para retornar um objeto
    return listaDeLinks.map( (objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
};