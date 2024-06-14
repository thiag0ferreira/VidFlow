const containerVideos = document.querySelector('.videos__container');


async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

        videos.forEach((video) => {
            if(video.categoria==""){
                throw new Error("Categoria não informada");
            }
            containerVideos.innerHTML += `
    <li class="videos__item">
        <iframe src="${video.url}" title="${video.titulo}" frameborder="0"></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="Imagem do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
            </div>
    </li>
    `;
        })
    } catch (error) {
     containerVideos.innerHTML = `<h2>Erro ao buscar os vídeos: ${error}</h2>`;
    }
}

buscarEMostrarVideos();


const barraDeBusca = document.querySelector(".pesquisar__input");

barraDeBusca.addEventListener("input", filtrarVideos);

function filtrarVideos(){
    const videos = document.querySelectorAll(".videos__item");
    const valorFiltro = barraDeBusca.value.toLowerCase();

    videos.forEach(video =>{
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
        video.style.display = titulo.includes(valorFiltro) ? "block" : "none";

    })

}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach(botao =>{
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro !== "tudo") {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}

