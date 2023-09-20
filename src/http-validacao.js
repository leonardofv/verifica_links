export default function listaValidada(listaDeLinks) {
    return extraiLinks(listaDeLinks);
};

function extraiLinks(links) {
    return links.map( (objetoLink) => Object.values(objetoLink).join()); //Join pega o conteudo do array, converte em Str e joga pra fora.
}

