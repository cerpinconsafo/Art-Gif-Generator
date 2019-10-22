//make a web page that displays GIFs
//create a click function for a button
//button will fire a search for GIFs using giphy api key
//display GIFs with ratings on the page
//make GIFs have a play and pause function by click event
//append a new button if a new item is searched



//make an array to store items to populate button containter
//make a click event to fire off search in the input form and append the new search in a button to the button container
//make a click event to display GIFs with the buttons in the button container


//initial values and api key
var buttons = ["Welcome to Chili's", "This is fine", "Socially Awkward Penguin", "Be like"];
var key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=" + key + "&limit=10";


//generating buttons
function renderButtons() {

    $(".gif-buttons").empty();

    for (var i = 0; i < buttons.length; i++) {
        var buttonName = buttons[i];

        var button = $("<button>");
        button.addClass("btn btn-light button-search m-2");
        button.attr("data-name", buttonName);
        button.text(buttonName);

        $(".gif-buttons").append(button);

    }
    console.log("The renderButton function is working")
};

renderButtons();

//button click function
$(document).on("click", ".button-search", function() {
    var value = $(this).attr("data-name");

    console.log(value);
    console.log("clicked");
    console.log(this);

    $(".gif-container").empty();
    ajaxCall(value);
});

//submit click function
$("#submit").on("click", function() {
    event.preventDefault();

    var value = $("#search").val();

    if (buttons.includes(value)) {
        alert("You have already searched this");

        ajaxCall(value);

    } else {
        buttons.push(value);

        renderButtons();

        $(".gif-container").empty();

        ajaxCall(value);

        console.log(value);
    };
})

//ajax call function and display GIFs

function ajaxCall(value) {

    var search = queryURL + "&q=" + value;

    $.ajax({
        url: search,
        method: "GET"
    }).then(function(response) {

        console.log("clicked");
        console.log(queryURL);
        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");

            var p = $("<p>");

            p.text("Rating: " + results[i].rating);

            var gifImg = $("<img>");

            gifImg.attr("src", results[i].images.fixed_height_still.url);
            gifImg.attr("data-still", results[i].images.original_still.url);
            gifImg.attr("data-animate", results[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");

            gifDiv.addClass("m-3 gif-click");
            gifDiv.append(p);
            gifDiv.append(gifImg);

            $(".gif-container").prepend(gifDiv);
        }
    });
};

$(document).on("click", ".gif-click", function() {
    console.log("clicked");

    var gif = $(this);

    var img = gif.find("img");

    var still = img.attr("data-still");
    var animate = img.attr("data-animate");
    var state = img.attr("data-state");

    if (state === "still") {
        img.attr({
            src: animate,
            "data-state": "animate"
        });
    } else {
        img.attr({
            src: still,
            "data-state": "still"
        });
    }
});