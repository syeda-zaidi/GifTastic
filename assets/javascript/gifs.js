$(document).ready(function () {

    var superheroes = ["Batman", "Ironman", "WonderWoman", "Captain Marvel", "Black Panther", "Thor", "Magneto", "Flash", "Doctor Strange"];
    console.log(superheroes);

    function createButtons() {

        $("#buttons").empty();

        for (var i = 0; i < superheroes.length; i++) {
            var btns = $("<button>");
            btns.addClass("heroBtns btn btn-info");
            btns.attr("data-name", superheroes[i]);
            btns.text(superheroes[i]);

            $("#buttons").append(btns);
        }
    };

    createButtons();

    function getGifs() {

        var hero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphykey + "&q=" + hero + "&limit=10&offset=0&rating=G";

        console.log(hero);
        
        $.ajax({

            url: queryURL,
            method: "GET",

        }).then(function(response) {

            console.log(response.data);
        })
    }

    $(document).on("click", ".heroBtns", getGifs);
});

