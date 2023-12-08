

document.addEventListener('DOMContentLoaded', function () {

    var clone_card_cao = $(".card-cao").clone(); //clonar o card
    $(".lista-caes").html(""); //limpar o clone com info default

        

    $.ajax({

        method: 'GET',
        url: "https://api.petfinder.com/v2/animals?type=dog&page1",
        headers:{"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJJV2JmYUVyQzFodTFqVUJyaVdLazJOeUhPTDBCbHBPU0FvWGprZW9TUGRveFQzOWJkdCIsImp0aSI6ImI4OGFkNDhlY2E4OTYxYzBhODFhNjEzNjQ5ZTFmZWMxNzFhNDM0ZGRmNTFhZTQ3NDcyYTRkMzZkNDI4YTRhMWI3ZGQxNGYzOTkzY2I3MGZiIiwiaWF0IjoxNzAyMDYzODY1LCJuYmYiOjE3MDIwNjM4NjUsImV4cCI6MTcwMjA2NzQ2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.s3A2iGfI00LSn_dRSwqw35pwioHMCVxNikr5Mvs7TFUyGIgK_vDvMSHYtXobfzLITEaP779eLSVSKUjCd66w_o6ttjGOtGmEXx4GkQEeGcIvx4IgnqB2NDAxgfNp2PVw5bMHA4nh-6-hkEUbAfiiy-AqtCrY0MrVgKf6IK-zKl9KiNNGJ-lbrPP4C29n7ALDW2Nz4zdtI7OXaUUdpicisd6gpWNiF1EIDx-Amw6gqv2yrD_2N9roerlZzVgA8EheFetEyUKqOfMFSRQ-QAd6-XUkGiCYoKG4Sxm68pT6NCbq8NWGMe8Dro_IRpowKQXU6ZuW1kAv5S-7_HdsAf7-gQ"},


    }).done(function (dados_recebidos) {

        console.log(dados_recebidos); //Identifcar os parametros, valores que o objeto "dados recebidos" tem
        // Neste caso o parametro "animals" tem o que nos queremos nome, raça, porte, imagem etc...

        $.each(dados_recebidos.animals, function (indice, result) {
            console.log(result);

            console.log(result.name);
            console.log(result.photos.medium);

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

            // A PARTIR DAQUI E PARA GUARDAR OS DADOS NO LOCAL STORAGE PARA DEPOIS QUANDO CLICAR NO DETALHES DO CAO
            // SO APARECER UM CARD ONDE REPOMOS A INFORMACAO COM A QUE O USER CLICOU
            //aka QUAND CLICA SALVA OS DADOS NUM OBJETO E DEPOIS LEVAMOS ESSE DADOS PARA O CARD ISOLADO NA PAG DOS DETALHES



            var objFav = {
                "Title": result.Title,
                "Poster": result.Poster,
                "Type": result.Type,
                "Year": result.Year
            };

            var favoritos = JSON.stringify(objFav);
            $(".btn-favoritos", card).attr("onclick", "addFavorito(" + favoritos + ")");


        });

    });



});








