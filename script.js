var APIKey = "a8873d0d448c9dc93f60cba6ef75cb3e";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=" + APIKey;

var resultsDiv = $("<div>");
var fiveDayDiv = $("<div>");
var cityh1El = $("<h1>");
var previousresultsDiv = $("<aside>");






$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL)
    console.log(response)
    $("cityh1El").append(response.name)
    $("resultsDiv").text(response.temp + respnse.main.humidity + response.wind.speed);
    $("fiveDayDiv").text("Five day forecast" + response.temp + response.main.humidity)

    prevEntryDiv.append.text(response.name)

})
var prevEntryDiv =
    $("#search").on("click", function (event) {

        $("<h1>").html(cityh1El).text(response.name);
        $("<div>").appendchild(resultsDiv).text(response.temp + response.main.humidity + response.wind.speed);
        $("<div>").appendchild(fiveDayDiv).text(response.temp + response.humidity);



    })
