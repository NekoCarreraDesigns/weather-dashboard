var APIKey = "a8873d0d448c9dc93f60cba6ef75cb3e";
var queryURL = "api.openweathermap.org/" + APIKey;

var resultsDiv = $("<div>");
var fiveDayDiv = $("<div>");
var cityh1El = $("<h1>");
var prevEntryDiv = $("<aside>")
$("#search").on("click", function (event) {
    if (response === previous) {
        prevEntryDiv.append.text(response.name)
    }
})

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    // ("cityh1El").text(response.name);
    // ("resultsDiv").text("current temp" + response.temp + "current humidity" + response.main.humidity + "current wind speed" + response.main.windspeed + "U.V. index" + response.main.uv);
    // ("fiveDayDiv").text("Five day forecast" + response.temp + response.main.humidity)






})