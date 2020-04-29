//var APIKey = "2ca050defd3bdf6d2275987436e01257";
//var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=2ca050defd3bdf6d2275987436e01257";

var resultsDiv = $("<div>");
var fiveDayDiv = $("<div>");
var cityh1El = $("<h1>");

$("#search").on("click", function (event) {
    alert("clicked")
})

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    ("cityh1El").text(response.name);
    ("resultsDiv").text("current temp" + response.temp + "current humidity" + response.main.humidity + "current wind speed" + response.main.windspeed + "U.V. index" + response.main.uv);
    ("fiveDayDiv").text("Five day forecast" + response.temp + response.main.humidity)






})