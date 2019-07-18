$(document).ready(function () {

    var heroes = ["Batman", "Ironman", "WonderWoman", "Captain Marvel", "Black Panther", "Thor", "Magneto", "Flash", "Doctor Strange"];
    console.log(heroes);

    function createButtons() {

        $("#buttons").empty();

        for (var i = 0; i < heroes.length; i++) {
            var btns = $("<button>");
            btns.addClass("heroBtns btn btn-info");
            btns.attr("data-name", heroes[i]);
            btns.text(heroes[i]);

            $("#buttons").append(btns);
        }
    };

    createButtons();

    $(document).on("click", function (){

        
    })
});

