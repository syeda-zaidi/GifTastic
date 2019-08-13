$(document).ready(function () {

    var superheroes = ["WonderWoman", "Captain Marvel", "Catwoman", "Gamora", "Mystique", "Harley Quinn", "Valkyrie"];
    console.log(superheroes);

    //creates buttons for each item in superheroes array 
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

    //sends ajax query, dynamically creates divs to hold the gif images and rating 
    function getGifs() {

        var hero = $(this).attr("data-name");
        var key = "pLOyNzu4brVNGfC6NtuWfBvRqvXZAV69";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphykey + "&q=" + hero + "&limit=10&offset=0";

        console.log(hero);

        $.ajax({

            url: queryURL,
            method: "GET",

        }).then(function (response) {

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=gifbox>");


                var rating = $("<p>");
                rating.text("Rating : " + results[i].rating);
                gifDiv.prepend(rating);

                var fav = $("<button>");
                fav.text("Favourite");
                fav.addClass("btn btn-secondary");
                fav.attr("data-color", "secondary")
                fav.attr("id", "fav-btn");
                rating.append(fav);


                var images = $("<img>");
                images.attr("src", results[i].images.fixed_height_still.url);
                images.attr("data-still", results[i].images.fixed_height_still.url);
                images.attr("data-animate", results[i].images.fixed_height.url);
                images.attr("data-state", "still");
                images.addClass("gifs");

                gifDiv.append(images);

                $("#gif-images").prepend(gifDiv);
            }
        })
    };

    $(document).on("click", ".heroBtns", getGifs);

    //creates btn with user input 
    $("#submit-btn").on("click", function (event) {

        event.preventDefault();
        var newbtn = $("#input-box").val().trim();

        var isempty = $("#input-box").val() === ""; //prevents creating a button without input 
        if (!isempty) {
            superheroes.push(newbtn);

            createButtons();
        }

    });

    //animates the gif when mouse hovers on it 
    $(document).on("mouseenter", ".gifs", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", ($(this).attr("data-animate")));
            $(this).attr("data-state", "animate");

        }
    });

    //stills the gif when mouse moves out 
    $(document).on("mouseleave", ".gifs", function () {

        var state = $(this).attr("data-state");

        if (state === "animate") {

            $(this).attr("src", ($(this).attr("data-still")));
            $(this).attr("data-state", "still");
        }
    });

    //click event to change fav btns when clicked 
    $(document).on("click", "#fav-btn", function () {

        var favcolor = $(this).attr("data-color");
        if (favcolor === "secondary") {
            $(this).attr("class", "btn btn-success");
            $(this).attr("data-color", "green");
        } else if (favcolor === "green") {
            $(this).attr("class", "btn btn-secondary");
            $(this).attr("data-color", "secondary");
        }
    })


});

