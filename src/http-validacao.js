function extraiLinks(links) {
    return links.map( (objetoLink) => Object.values(objetoLink).join()); //Join pega o conteudo do array, converte em Str e joga pra fora.
}

//Função para trabalhar com o status code
async function checaStatus(ListaURLs) {
    //All recebe uma lista de promessas pendentes, resolver e retornar resolvida.
    const arrStaus = await Promise.all(
        ListaURLs.map(async (url) => {
           const res = await fetch(url)
           return res.status;
       })
    )
    return arrStaus;
}

//assim como checaStatus é async listaValidada também precisa ser
//lista validada precisa saber que precisa acontecer algo dentro de chegaStatus e retornar o result
export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return status;
};

// [Teste de retorno 400](https://httpstat.us/404).
// [gatinho salsicha](http://gatinhosalsicha.com.br/)
