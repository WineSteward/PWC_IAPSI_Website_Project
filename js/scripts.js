var current_page = 1;
var token;
var clone_card_cao;
const element_spinner_wrapper = document.querySelector(".spinner-wrapper");


document.addEventListener('DOMContentLoaded', function () {
    clone_card_cao = $(".card-cao").clone(); //clonar o card
    $(".lista-caes").html(""); //limpar o clone com info default

    obterToken()
        .then(function (receivedToken) {
            token = receivedToken; // Atribui o token à variável global
            
            if (location.pathname.split("/").pop() == "dogs_to_adoption.html") {
                localStorage.removeItem("key_id");
                atualizarCardsComToken(current_page);
            }
            
            if (location.pathname.split("/").pop() == "about_dog.html" && localStorage.getItem("key_id") !== null) {
                ver_detalhes_cao();
            }
        })
        .catch(error => {
            // Lidar com erros na obtenção do token ou na atualização dos cards
            console.error('Erro ao obter o token ou atualizar os cards:', error);
        });

});



function ir_detalhes_cao(id_cao) {
    localStorage.setItem("key_id", id_cao);
    location.href = "about_dog.html";
}


function ver_detalhes_cao() {

    var id_cao = localStorage.getItem("key_id");

    console.log(id_cao);
    
    $.ajax({

        method: 'GET',
        url: `https://api.petfinder.com/v2/animals/${id_cao}`,
        headers: { "Authorization": "Bearer " + token }

    }).done(function (dados_recebidos) {

        element_spinner_wrapper.style.display = "none"; 
        //console.log(dados_recebidos);

        $("#nome_cao_detalhes").text(dados_recebidos.animal.name);

        $("#descricao_cao_detalhes").text(dados_recebidos.animal.description);

        $("#idade_cao_detalhes").text(dados_recebidos.animal.age);

        $("#genero_cao_detalhes").text(dados_recebidos.animal.gender);

        $("#tamanho_cao_detalhes").text(dados_recebidos.animal.size);

        $("#raca_cao_detalhes").text(dados_recebidos.animal.breeds.primary);

        if (dados_recebidos.animal.primary_photo_cropped.large != null) {
            $("#imagem_cao_detalhes").attr("src", dados_recebidos.animal.primary_photo_cropped.full); //Caso tenha imagem fica com a imagem que tem se nao usamos uma stock
        }
        else {
            $("#imagem_cao_detalhes").attr("src", "images/dog_2.jpg");
        }
    });
}

function obterToken() {

    // Configurando os dados para a solicitação
    const requestData = {
        grant_type: 'client_credentials',
        client_id: "IWbfaErC1hu1jUBriWKk2NyHOL0BlpOSAoXjkeoSPdoxT39bdt",
        client_secret: "qKjK2DtpDnjey7lAhQJ2iLEaMHaVQcHIPSTwBOzz"
    };

    // Configurando as opções da solicitação Fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(requestData)
    };

    // Fazendo a solicitação para obter o token
    return fetch("https://api.petfinder.com/v2/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(data => data.access_token)
        .catch(error => {
            console.error('Erro ao obter o token:', error);
            throw error; // Rejeitar a Promise para sinalizar falha na obtenção do token
        });
}


function atualizarCardsComToken(current_page) {

    // Fazendo uma solicitação AJAX para obter informações sobre animais (cães)
    $.ajax({

        method: 'GET',
        url: `https://api.petfinder.com/v2/animals?type=dog&page=${current_page}`,
        headers: { "Authorization": "Bearer " + token }

    }).done(function (dados_recebidos) {
        
        $(".lista-caes").html(""); //limpar o clone com info default

        element_spinner_wrapper.style.display = "none";
        
        $.each(dados_recebidos.animals, function (indice, result) {

            console.log(result);

            var card = clone_card_cao.clone(); // replicamos um card novo para nao sobrepor informaçoes e perder o original

            $(".cao-nome", card).text(result.name); //adicionamos a informaçao que obtivemos e substituimos no card novo

            $(".cao-descricao", card).text(result.description);

            $(".cao-race", card).text(result.breeds.primary);

            $(".cao-genero", card).text(result.gender);

            $(".adicionar_cao_id", card).attr("onclick", `ir_detalhes_cao(${result.id})`);

            if (result.photos.large != null) {
                $(".cao-imagem", card).attr("src", result.photos.large); //Caso a tenho imagem expomos a imagem recebida 
            }
            else if (result.primary_photo_cropped != null) {//Se nao expomos uma imagem default
                $(".cao-imagem", card).attr("src", result.primary_photo_cropped.large);
            }
            else {
                $(".cao-imagem", card).attr("src", "images/dog_1.jpg");
            }


            $(".lista-caes").append(card); //adicionamos o card novo para o fim da row


            // A PARTIR DAQUI E PARA GUARDAR OS DADOS NO LOCAL STORAGE PARA DEPOIS QUANDO CLICAR NO DETALHES DO CAO
            // SO APARECER UM CARD ONDE REPOMOS A INFORMACAO COM A QUE O USER CLICOU
            //aka QUAND CLICA SALVA OS DADOS NUM OBJETO E DEPOIS LEVAMOS ESSE DADOS PARA O CARD ISOLADO NA PAG DOS DETALHES


            var objFav = {
                "Nome": result.name,
                "Raca": result.primary,
                "Descricao": result.description,
                "Genero": result.gender,
                "Imagem": result.photos.large
            };

            var favoritos = JSON.stringify(objFav);
            $(".btn-favoritos", card).attr("onclick", "addFavorito(" + favoritos + ")");


        });
    });
}

function anteriorPagina() {
    current_page--;
    atualizarCardsComToken(current_page);
}

function proximaPagina() {
    current_page++;
    atualizarCardsComToken(current_page);
}








