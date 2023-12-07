var clone_card = $(".card-cao").clone(); //clonar o card


$.each(dados_recebidos.Search, function(indice , result){
    console.log(result);

    console.log(dados_recebidos);

    var card = clone_card_filme.clone(); // replicamos um card novo para nao sobrepor informaçoes e perder o original

    $(".filme-titulo", card).text(result.Title); //adicionamos a informaçao que obtivemos e substituimos no card novo
                    
    $(".filme-ano", card).text(result.Year);

    $(".filme-tipo", card).text("[" + result.Type + "]"); //adicionar os [] ao texto a expor

    $("#link-imagem", card).attr("href", "http://www.imdb.com/title/"+result.imdbID);

    if(result.Poster != 'N/A'){
        $(".filme-imagem", card).attr("src", result.Poster); //attribute source    
    }
    else{
        $(".filme-imagem", card).attr("src", "img/cartazmovie.jpg");
    }    
    
    $(".lista-caes").append(card); //adicionamos o card novo para o fim da row(tem a classe lista filmes)
});

document.addEventListener('DOMContentLoaded', function(){
  
    $(".lista-caes").html("");



  });