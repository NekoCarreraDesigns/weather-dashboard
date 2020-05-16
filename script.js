var daily
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
        $("<div>").append(windDiv);
        $("<div>").append(humidityDiv)


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + APIKey,
            method: "GET",

        }).then(function (response) {
            console.log(queryURL)
            console.log(response)


        })

    });

}
$("#search").on("click", function (event) {
    console.log($(".search-bar").val())
    var searchBar = $(".search-bar").val()
    search(searchBar)
    $(".prevEntryDiv").html(cityName)
})

function fiveDay(cityName) {

    daily = response.daily;
    forecastH1.text("Here's the 5-day forecast for" + cityName + ":");
    fiveDaily = moment.clone()
    for (var i = 0; i < 5; i++) {
        fiveDaily = fiveDaily.add(1, "d");
        resultsDiv = daily[i].temp.day;
        humidityDiv = parseInt(daily[i].humidity);
        windDiv = parseInt(daily[i].wind.speed)
        contentDiv = $("<div>")
        $(".fiveDayDiv").html(response.list.temp[i])
        console.log(fiveDayDiv)
        $("<div>").append(fiveDayDiv)
        fiveDayDiv.addClass("card");
        contentDiv.addClass("card-body");
        contentDiv.append(resultsDiv, humidityDiv, windDiv)
    }

}



var oldInput = prevEntryDiv.searchBar;
var previousInput = [];
for (var i = 0; i < previousInput.length; i++) {
    var oldInput = cityName + previousInput[i]
    if (previousInput === oldInput) {
        (".prevEntryDiv").html(JSON.stringify(previousInput[i]))
        $("<aside>").append(prevEntryDiv)
        prevEntryDiv.localStorage.setItem(cityName, previousInput)
    }

}
