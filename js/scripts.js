
var current_page = 1;
document.addEventListener('DOMContentLoaded', function () {

    obterToken()
    .then(atualizarCardsComToken)
    .catch(error => {
        // Lidar com erros na obtenção do token ou na atualização dos cards
        console.error('Erro ao obter o token ou atualizar os cards:', error);
    });

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
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
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


    function atualizarCardsComToken(token) {
        var clone_card_cao = $(".card-cao").clone(); //clonar o card
        $(".lista-caes").html(""); //limpar o clone com info default
        
    
        // Fazendo uma solicitação AJAX para obter informações sobre animais (cães)
        $.ajax({
        
            method: 'GET',
            url: 'https://api.petfinder.com/v2/animals?type=dog&page=' + current_page,
            headers: {"Authorization": "Bearer " + token}
        
        }).done(function (dados_recebidos) {
            $.each(dados_recebidos.animals, function (indice, result) {
            
                //console.log(result); verificar dados recebidos
    
                var card = clone_card_cao.clone(); // replicamos um card novo para nao sobrepor informaçoes e perder o original
    
                $(".cao-nome", card).text(result.name); //adicionamos a informaçao que obtivemos e substituimos no card novo
    
                $(".cao-descricao", card).text(result.description);
    
                $(".cao-race", card).text(result.breeds.primary);
    
                $(".cao-genero", card).text(result.gender);
    
                if (result.photos.large != null) {
                    $(".cao-imagem", card).attr("src", result.photos.large); //Caso a tenho imagem expomos a imagem recebida 
                }                                                                     //Se nao expomos uma imagem default
                else if(result.primary_photo_cropped != null) {
                    $(".cao-imagem", card).attr("src", result.primary_photo_cropped.large);
                }
                else{
                    $(".cao-imagem", card).attr("src", "images/dog_1.jpg");
                }
    
    
                $(".lista-caes").append(card); //adicionamos o card novo para o fim da row
    
                //mudança de pagina
                $("#proxima_pagina").on("click", function() {
                    current_page++;
                    $("#pagina_atual").text(current_page);
                    loadData(current_page);
                });
            
                // Evento para página anterior
                $("#pagina_anterior").on("click", function() {
                    if (current_page > 1) {
                        current_page--;
                        $("#pagina_atual").text(current_page);
                        loadData(current_page);
                    }
                });
    
    
                // A PARTIR DAQUI E PARA GUARDAR OS DADOS NO LOCAL STORAGE PARA DEPOIS QUANDO CLICAR NO DETALHES DO CAO
                // SO APARECER UM CARD ONDE REPOMOS A INFORMACAO COM A QUE O USER CLICOU
                //aka QUAND CLICA SALVA OS DADOS NUM OBJETO E DEPOIS LEVAMOS ESSE DADOS PARA O CARD ISOLADO NA PAG DOS DETALHES
    
    
                var objFav = {
                    "Nome": result.name,
                    "Raca": result.primary,
                    "Descricao": result.description,
                    "Genero": result.gender,
                    "Imagem":result.photos.large
                };
    
                var favoritos = JSON.stringify(objFav);
                $(".btn-favoritos", card).attr("onclick", "addFavorito(" + favoritos + ")");
    
    
            });
        });
    }

});








