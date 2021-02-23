var num_pagina = window.location.search;
var pagina;

let params = new URLSearchParams(num_pagina);
let page = parseInt(params.get("page"));

if (page){
    pagina = page;
} else {
    pagina = 1;
}

async function News (page) {

    const link = "http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&page=";
    
    url = link + page;

    const noticias = await fetch(url);

    return noticias.json();
}

News(pagina)
.then(data => {

var texto = "";

for(let i = 0; i < 10; i++){

    texto = texto + `
    
    <div class="row">
        <div class="content">
            <h3><a href="${data.items[i].link}" target="__blank">${data.items[i].titulo}</a></h3>
            <p>${data.items[i].introducao}</p>
            <strong> Publicado em: ${data.items[i].data_publicacao} </strong>
        </div>
        <hr>
    </div>
    `;

    document.getElementById("main").innerHTML = texto;
    
}
    var navegar = ` 
        <a href="?page=${data.previousPage}"> anterior </a>
        <a href="?page=${data.nextPage}"> proximo </a> 
    `;

    document.getElementById("pulador").innerHTML = navegar;

});

