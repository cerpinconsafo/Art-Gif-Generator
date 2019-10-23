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
var buttons = ["Aesthetic", "Color Abstraction", "Constructivist", "Carl Burton", "Glitch", "Acid Art", "Pixel Sorted", "Minimal"];
var key = "KTMIjgy5hDhnLeBJkjhiTFLRBcNzo99s";
var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=" + key + "&limit=15&offset=1";


//generating buttons
function renderButtons() {

    $(".gif-buttons").empty();

    for (var i = 0; i < buttons.length; i++) {
        var buttonName = buttons[i];

        var button = $("<button>");
        button.addClass("btn cust-button button-search m-1");
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

    //console.log(value);
    //console.log("clicked");
    //console.log(this);

    $(".gif-container").empty();
    ajaxCall(value);

});

//submit click function
$("#search-button").on("click", function() {
    event.preventDefault();
    var value = $("#search-input").val();
    //prevent duplicate buttons
    if (buttons.includes(value)) {
        alert("This button already Exists, Search Again");

        ajaxCall(value);
        //create the button
    } else {

        buttons.push(value);
        renderButtons();
        //clears current gif display
        $(".gif-container").empty();
        ajaxCall(value);
        console.log(value);

        $("#search-input").val(" ");
        $("#search-input").attr("placeholder", "S E A R C H  A G A I N ");

    };
})

//ajax call function and display GIFs
function ajaxCall(value) {
    var search = queryURL + "&q=" + value;
    $.ajax({
        url: search,
        method: "GET"
    }).then(function(response) {
        //console.log("clicked");
        //console.log(queryURL);
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var p = $("<p>");
            var ratingUpper = results[i].rating;
            p.addClass("text-center");
            p.text("Rated: " + ratingUpper.toUpperCase());
            var gifImg = $("<img>");


            //gif image attributes
            gifImg.attr("src", results[i].images.original_still.url);
            gifImg.attr("data-still", results[i].images.original_still.url);
            gifImg.attr("data-animate", results[i].images.original.url);
            gifImg.attr("data-state", "still");
            gifImg.addClass("newGif p-1 mx-auto d-block")

            gifDiv.addClass("m-4 gif-click");
            gifDiv.append(p);
            gifDiv.append(gifImg);

            $(".gif-container").prepend(gifDiv);
        }
    });
};

$(document).on("click", ".gif-click", function() {
    var gif = $(this);
    var img = gif.find("img");
    var still = img.attr("data-still");
    var animate = img.attr("data-animate");
    var state = img.attr("data-state");
    //start and stop gif animation on click
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