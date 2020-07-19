$(document).ready(function () {
    let APIKey = "a8873d0d448c9dc93f60cba6ef75cb3e"

    let userCity;
    let cityName;
    let date;
    let weather;
    let weatherIcon;
    let imgURL;
    let allCities;
    let cityBtn;

    if ($(window).width() < 600) {
        $("aside").removeClass("col-3 d-block sidebar sidebar-sticky");
        $("aside").addClass("row full-width");
        $("#search-text").addClass("mobile-text");
        $("#clear-button").addClass("d-none");
        $(".cities").addClass("d-none");
    }

    $("#search-button").click(function (event) {
        event.preventDefault();

        // get the user input
        userCity = $("#search").val();

        if (userCity !== "") {
            init();

            getCurrentWeather();

            getForecast();
        }
    });

    function init() {
        // clears input text
        $("#search").val("");

        // display current date next to city
        let currentDate = moment().format("LL");
        let currentDateEl = $('.date[data-day="0"]');
        currentDateEl.text(currentDate);

        // show the weather info container
        $("#weather-info").removeClass("d-none");

        // remove welcome container
        $("#welcome").addClass("d-none");
    }

    function getCurrentWeather() {
        let queryURL =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            userCity +
            "&appid=" +
            APIKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // display city name
            cityName = response.name;
            cityNameEl = $("#city-name").text(cityName);
            $(".heading").prepend(cityNameEl);

            storeCity();

            // determine icon to display
            weather = response.weather[0].main;
            $("#weather-icon").html("");
            renderIcons();
            weatherIcon = $("<img>").attr("src", imgURL);
            weatherIcon.attr("alt", "weather icon");
            $("#weather-icon").append(weatherIcon);

            // display temperature
            var tempK = response.main.temp;
            var tempF = (tempK - 273.15) * 1.8 + 32;
            $("#current-temp").html(
                "Temperature: " + tempF.toFixed(1) + " &deg;" + "F"
            );

            // display humidity
            var humidity = response.main.humidity;
            $("#current-humidity").html("Humidity: " + humidity + "%");

            // display wind speed
            var wind = response.wind.speed;
            $("#current-wind").html("Wind Speed: " + wind + " MPH");

            // display UV index
            displayUVI(response.coord.lat, response.coord.lon);
        });
    }

    function getForecast() {
        var queryURL =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            userCity +
            "&appid=" +
            APIKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var results = response.list;

            // display 5 day forecast
            var forecastCards = $(".forecast-card");
            var j = 0;

            // display date for the next 5 days
            for (i = 0; i < forecastCards.length; i++) {
                date = results[j].dt_txt.slice(0, 10);
                formatDate();
                forecastCards[i].querySelector(".date").textContent = date;

                // each date is 8 indicies in results arr
                j += 8;
            }

            j = 0;
            // display temp for 5 days
            for (i = 0; i < forecastCards.length; i++) {
                var tempK = results[j].main.temp;
                var tempF = (tempK - 273.15) * 1.8 + 32;
                forecastCards[i].querySelector(".temp").innerHTML =
                    "Temp: " + tempF.toFixed(1) + " &deg;" + "F";

                j += 8;
            }

            j = 0;

            // display humidity for 5 days
            for (i = 0; i < forecastCards.length; i++) {
                var humidity = results[j].main.humidity;

                forecastCards[i].querySelector(".humidity").textContent =
                    "Humidity: " + humidity + "%";

                j += 8;
            }

            j = 0;

            // display weather icon for 5 days
            for (i = 0; i < forecastCards.length; i++) {
                weather = results[j].weather[0].main;
                renderIcons();
                var iconEl = forecastCards[i].querySelector(".weather-icon");
                iconEl.innerHTML = "";
                weatherIcon = $("<img>").attr("src", imgURL);
                weatherIcon.attr("alt", "weather icon");
                weatherIcon.attr("style", "height: 50%; width: 50%");
                weatherIcon.appendTo(iconEl);

                j += 8;
            }
        });
    }

    function formatDate() {
        var year = date.slice(0, 4);
        var month = date.slice(5, 7);
        var day = date.slice(8, 10);
        date = month + "/" + day + "/" + year;
    }

    function displayUVI(lat, lon) {
        var queryURL =
            "https://api.openweathermap.org/data/2.5/uvi?appid=" +
            APIKey +
            "&lat=" +
            lat +
            "&lon=" +
            lon;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var uvEl = $("<button>");
            renderUVColor(response.value, uvEl);
            uvEl.text(response.value);
            uvEl.attr("disabled", "disabled");

            $("#current-uv").text("UV Index :");
            $("#current-uv").append(uvEl);

            uvEl.addClass(".btn-primary");
        });
    }

    function renderUVColor(uv, uvEl) {
        if (uv >= 0 && uv <= 2) {
            uvEl.addClass("btn btn-sm ml-2 low");
        } else if (uv > 2 && uv <= 5) {
            uvEl.addClass("btn btn-sm ml-2 moderate");
        } else if (uv > 5 && uv <= 7) {
            uvEl.addClass("btn btn-sm ml-2 high");
        } else {
            uvEl.addClass("btn btn-sm ml-2 extreme");
        }
    }

    function renderIcons() {
        var stormIcon = "11d";
        var drizzleIcon = "09d";
        var rainIcon = "10d";
        var snowIcon = "13d";
        var atmosphereIcon = "50d";
        var clearIcon = "01d";
        var cloudIcon = "02d";

        if (weather === "Thunderstorm") {
            icon = stormIcon;
        } else if (weather === "Drizzle") {
            icon = drizzleIcon;
        } else if (weather === "Rain") {
            icon = rainIcon;
        } else if (weather === "Snow") {
            icon = snowIcon;
        } else if (weather === "Clear") {
            icon = clearIcon;
        } else if (weather === "Clouds") {
            icon = cloudIcon;
        } else {
            icon = atmosphereIcon;
        }

        imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    }

    function storeCity() {
        allCities = JSON.parse(localStorage.getItem("cities"));
        if (allCities === null) {
            allCities = [];
        } else {
            for (i = 0; i < allCities.length; i++) {
                if (userCity === allCities[i]) {
                    return false;
                }
            }
        }

        allCities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(allCities));

        cityBtn = $("<button>").addClass(
            "list-group-item list-group-item-action city-select"
        );
        cityBtn.text(cityName);
        $(".cities").append(cityBtn);

        cityBtns = $(".city-select");
    }

    function loadCities() {
        allCities = JSON.parse(localStorage.getItem("cities"));
        cityBtns = $(".city-select");

        if (allCities !== null) {
            for (i = 0; i < allCities.length; i++) {
                cityBtn = $("<button>").addClass(
                    "list-group-item list-group-item-action city-select"
                );
                cityBtn.text(allCities[i]);
                $(".cities").append(cityBtn);
            }
        } else {
            $(".cities").html("");
        }
    }

    loadCities();

    $(document).on("click", ".city-select", function () {
        userCity = $(this).text();
        init();
        getCurrentWeather();
        getForecast();
    });

    $("#clear-button").click(function (event) {
        localStorage.removeItem("cities");
        $("#weather-info").addClass("d-none");
        $("#welcome").removeClass("d-none");
        loadCities();
    });
});