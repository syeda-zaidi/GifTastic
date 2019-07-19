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

            // if (btns.text("")) {
            //     $("$buttons").append("");
            // } else {

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

            var results = response.data;
            console.log(results);

            for (var i=0 ; i < results.length; i++) {
                var gifDiv = $("<div class=gifbox>");
                
                
                var rating = $("<p>");
                rating.text("Rating : " + results[i].rating);
                gifDiv.prepend(rating);

                var images = $("<img>");
                images.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(images);

                $("#gif-images").prepend(gifDiv);
            }
        })
    };

    $(document).on("click", ".heroBtns", getGifs);

    $("#submit-btn").on("click", function(event) {

        event.preventDefault();
        var newbtn = $("#input-box").val().trim();

        superheroes.push(newbtn);

        createButtons();
    });

});

