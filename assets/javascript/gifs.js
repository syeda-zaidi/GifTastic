$(document).ready(function () {

    var superheroes = ["Batman", "spiderman", "Ironman", "WonderWoman", "Captain Marvel", "Black Panther", "Thor","Aquaman", "Doctor Strange"];
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
        var key = "pLOyNzu4brVNGfC6NtuWfBvRqvXZAV69";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + hero + "&limit=10&offset=0";

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

    $("#submit-btn").on("click", function (event) {

        event.preventDefault();
        var newbtn = $("#input-box").val().trim();

        var isempty = $("#input-box").val() === "";
        if (!isempty) {
            superheroes.push(newbtn);

            createButtons();
        }

    });

    $(document).on("mouseenter", ".gifs", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", ($(this).attr("data-animate")));
            $(this).attr("data-state", "animate");

        }
    });

    $(document).on("mouseleave", ".gifs", function () {

        var state = $(this).attr("data-state");

        if (state === "animate") {

            $(this).attr("src", ($(this).attr("data-still")));
            $(this).attr("data-state", "still");
        }
    });


});

