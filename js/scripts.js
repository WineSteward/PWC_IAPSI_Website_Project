var current_page = 1;
var token;
var clone_card_cao;
const element_spinner_wrapper = document.querySelector(".spinner-wrapper");
var objeto_cao;

document.addEventListener('DOMContentLoaded', function () {
    clone_card_cao = $(".card-cao").clone(); //clonar o card
    $(".lista-caes").html(""); //limpar o clone com info default

    clone_row_tabela_espacada = $(".row_tabela_favoritos").clone(); //clonar o card
    $(".row_tabela_favoritos").html(""); //limpar o clone com info default

    clone_tabela_compactada = $(".tabela_compactada").clone(); //clonar o card
    $(".tabela_compactada").html(""); //limpar o clone com info default

    if (location.pathname.split("/").pop() == "favorites.html") {
        localStorage.removeItem("key_id");
        ver_favoritos(clone_row_tabela_espacada, clone_tabela_compactada);
    }

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
            // Lidar com erros
            console.error('Erro a receber o token', error);
        });

});


function ver_favoritos(clone_row_tabela_espacada, clone_tabela_compactada) {

    for(var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i);

        var value = localStorage.getItem(key);

        var dados_cao_favorito = JSON.parse(value);

        //console.log(dados_cao_favorito);

        var tabela_espacada = clone_row_tabela_espacada.clone(); // replica nova para nao sobrepor informaçoes e perder o original

        var tabela_compactada = clone_tabela_compactada.clone();

        $(".cao_nome", tabela_espacada).text(dados_cao_favorito.Nome); //adicionamos a informaçao que obtivemos e substituimos no card novo
        $(".cao_nome", tabela_compactada).text(dados_cao_favorito.Nome);

        $(".cao_raca", tabela_espacada).text(dados_cao_favorito.Raca);
        $(".cao_raca", tabela_compactada).text(dados_cao_favorito.Raca);

        $(".cao_genero", tabela_espacada).text(dados_cao_favorito.Genero);
        $(".cao_genero", tabela_compactada).text(dados_cao_favorito.Genero);

        $(".cao_idade", tabela_espacada).text(dados_cao_favorito.Idade);
        $(".cao_idade", tabela_compactada).text(dados_cao_favorito.Idade);

        $(".cao_id", tabela_espacada).text(dados_cao_favorito.Identificador);
        $(".cao_id", tabela_compactada).text(dados_cao_favorito.Identificador);

        $(".remover_favorito", tabela_espacada).attr("onclick", `localStorage.removeItem(${dados_cao_favorito.Identificador}); reset_page_store()`);
        $(".remover_favorito", tabela_compactada).attr("onclick", `localStorage.removeItem(${dados_cao_favorito.Identificador}); reset_page_store()`);

        $(".detalhes_cao", tabela_espacada).attr("onclick", `ir_detalhes_cao(${dados_cao_favorito.Identificador})`);
        $(".detalhes_cao", tabela_compactada).attr("onclick", `ir_detalhes_cao(${dados_cao_favorito.Identificador})`);

        $(".tabela_espacada").append(tabela_espacada); //adicionamos os dados as duas tabelas
        $(".coisa_chata").append(tabela_compactada);
    }
}








function popup_info(nome, id_quantidade, preco) {

    var quantidade_produto = document.getElementById(id_quantidade).value;

    var preco_numero = parseFloat(preco);
    var quantidade_numero = parseFloat(quantidade_produto);
    var total = preco_numero * quantidade_numero;
    var total_string = String(total);

    if (quantidade_produto > "0" || quantidade_produto !== "") {
        $('#myModal').modal('show');
        $("#nome_produto_popup").text(nome);
        $("#quantidade_produto_popup").text(quantidade_produto);
        $("#preco_final").text(total_string);
    }
    else {
        alert("Não foi escolhida nenhuma quantidade");
        $('#myModal').modal('hide');
    }


}

function reset_page_store() {
    location.reload();
}


function ir_detalhes_cao(id_cao) {
    localStorage.setItem("key_id", id_cao);
    location.href = "about_dog.html";
}


function ver_detalhes_cao() {

    var id_cao_detalhes = localStorage.getItem("key_id");

    $.ajax({

        method: 'GET',
        url: `https://api.petfinder.com/v2/animals/${id_cao_detalhes}`,
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

        if (dados_recebidos.animal.primary_photo_cropped != null) {
            $("#imagem_cao_detalhes").attr("src", dados_recebidos.animal.primary_photo_cropped.full); //Caso tenha imagem fica com a imagem que tem se nao usamos uma stock
        }
        else {
            $("#imagem_cao_detalhes").attr("src", "images/dog_2.jpg");
        }

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (dados_recebidos.animal.id == key) {
                $("#imagem_badge_favorito").attr("src", "images/favorito_on.png");
                break;
            }
            else {
                $("#imagem_badge_favorito").attr("src", "images/favorito_off.png");
            }
        }

        $("#botao_favorito").click(function () {
            objeto_cao =
            {
                "Nome": dados_recebidos.animal.name,
                "Raca": dados_recebidos.animal.breeds.primary,
                "Idade": dados_recebidos.animal.age,
                "Genero": dados_recebidos.animal.gender,
                "Identificador": dados_recebidos.animal.id,
                "Estado": ""
            }

            var key = dados_recebidos.animal.id;
            var jafiz = false;

            for (var i = 0; i < localStorage.length; i++) {
                var stored_key = localStorage.key(i);

                if (key == stored_key) {
                    // Esta nos favoritos entao remover
                    $("#imagem_badge_favorito").attr("src", "images/favorito_off.png");
                    objeto_cao.Estado = "Nao Favorito";
                    localStorage.removeItem(key);
                    jafiz = true;
                    break;
                }
            }

            if (!jafiz) {
                // Nao esta nos favoritos entao adiciono
                $("#imagem_badge_favorito").attr("src", "images/favorito_on.png");
                objeto_cao.Estado = "Favorito";
                var cao_favorito_string = JSON.stringify(objeto_cao);
                localStorage.setItem(key, cao_favorito_string);
            }
        });

    });
}



function obterToken() {

    // Configurar os dados para o pedido
    const requestData = {
        grant_type: 'client_credentials',
        client_id: "IWbfaErC1hu1jUBriWKk2NyHOL0BlpOSAoXjkeoSPdoxT39bdt",
        client_secret: "qKjK2DtpDnjey7lAhQJ2iLEaMHaVQcHIPSTwBOzz"
    };

    // Configuraçoes Fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(requestData)
    };

    // Pedido do token
    return fetch("https://api.petfinder.com/v2/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(data => data.access_token)
        .catch(error => {
            console.error('Erro ao obter o token:', error);
            throw error; // Rejeitar a Promise para sinalizar falha na obtenção do token
        });
}


function atualizarCardsComToken(current_page) {

    // Pedido AJAX a API com token
    $.ajax({

        method: 'GET',
        url: `https://api.petfinder.com/v2/animals?type=dog&page=${current_page}`,
        headers: { "Authorization": "Bearer " + token }

    }).done(function (dados_recebidos) {

        $(".lista-caes").html(""); //Necessario para so por 20cards e nao ficam 20 + 20(novos da new page)

        element_spinner_wrapper.style.display = "none";

        $.each(dados_recebidos.animals, function (indice, result) {

            //console.log(result);

            var card = clone_card_cao.clone(); // replicamos um card novo para nao sobrepor informaçoes e perder o original

            $(".cao-nome", card).text(result.name); //adicionamos a informaçao que obtivemos e substituimos no card novo

            $(".cao-descricao", card).text(result.description);

            $(".cao-race", card).text(result.breeds.primary);

            $(".cao-genero", card).text(result.gender);

            $(".adicionar_cao_id", card).attr("onclick", `ir_detalhes_cao(${result.id})`);

            $(".image_cao_id", card).attr("onclick", `ir_detalhes_cao(${result.id})`);

            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);

                if (result.id == key) {
                    ;
                    $(".botao_cao_favorito", card).addClass("favorito");
                }
            }

            (function (objeto_cao) { //funcao anonima
                $(".botao_cao_favorito", card).click(function () {
                    var botaoFavorito = $(this).closest('.card-cao').find('.botao_cao_favorito');
                    manipular_cao_favorito(objeto_cao, botaoFavorito);//nao preciso converter para string
                });
            })({
                "Nome": result.name,
                "Raca": result.breeds.primary,
                "Idade": result.age,
                "Genero": result.gender,
                "Identificador": result.id,
                "Estado": ""
            });



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
        });
    });
}


function manipular_cao_favorito(cao_favorito, botaoFavorito) {
    var encontrado = false;

    // Verificar se a localStorage está vazia
    if (localStorage.length === 0) {
        cao_favorito.Estado = "Favorito";
        var cao_favorito_string = JSON.stringify(cao_favorito);
        localStorage.setItem(cao_favorito.Identificador, cao_favorito_string);
        botaoFavorito.addClass("favorito");
    } else {
        // Procurar na localStorage
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);

            if (cao_favorito.Identificador == key) {
                encontrado = true;
                cao_favorito.Estado = "Nao Favorito";
                botaoFavorito.removeClass("favorito");
                localStorage.removeItem(cao_favorito.Identificador);
                break; // Saia do loop assim que encontrar o cão
            }
        }

        // Se o cão não foi encontrado adicionar na localStorage
        if (!encontrado) {
            cao_favorito.Estado = "Favorito";
            var cao_favorito_string = JSON.stringify(cao_favorito);
            localStorage.setItem(cao_favorito.Identificador, cao_favorito_string);
            botaoFavorito.addClass("favorito");
        }
    }
}



function anteriorPagina() {
    current_page--;
    atualizarCardsComToken(current_page);
}

function proximaPagina() {
    current_page++;
    atualizarCardsComToken(current_page);
}








