
var cityName
var resultsDiv = $("<div>");
var humidityDiv = $("<div>");
var windDiv = $("<div>");
var fiveDayDiv = $("<div>");
var cityh1El = $("<h1>");
var prevEntryDiv = $("<aside>");


function search(cityName) {
    var APIKey = "&units=imperial&appid=a8873d0d448c9dc93f60cba6ef75cb3e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q";


    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIKey,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);
        $(".cityh1El").html(response.name);
        $(".resultsDiv").html("Temp:" + response.main.temp + "F");
        $(".humidityDiv").html("Humidity:" + response.main.humidity);
        $(".windDiv").html("Wind:" + response.wind.speed + "mph");
        $("<h1>").append(cityh1El);
        $("<div>").append(resultsDiv);
        $("<div>").append(fiveDayDiv);
        $("<div>").append(windDiv);
        $("<div>").append(humidityDiv)


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + APIKey,
            method: "GET",

        }).then(function (response) {
            console.log(queryURL)
            console.log(response)

            $(".fiveDayDiv").html(response.main.empty())
            console.log(fiveDayDiv)
            $("<div>").append(fiveDayDiv)


        })



    });

}

$("#search").on("click", function (event) {
    console.log($(".search-bar").val())
    var searchBar = $(".search-bar").val()
    search(searchBar)
})
var previousInput = [""];
for (var i = 0; i < previousInput.length; i++) {
    var oldInput = cityName + previousInput[i]
    if (previousInput.length === oldInput) {
        (".prevEntryDiv").html(previousInput[i])
        $("<aside>").append(prevEntryDiv)
        prevEntryDiv.localStorage.setItem(cityName, previousInput)
    }

}
