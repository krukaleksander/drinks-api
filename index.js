var drinkName, drinkIngredients, drinkImage, drinkDescription;
var getIngredients = function (drinkResponse, drinkIngredients) {
    var arrayOfIngredients = [];
    var ingredientsAndMeasures = [];
    var regexIngredients = /strIngredient/;
    for (var property in drinkResponse) {
        if (property.match(regexIngredients) && drinkResponse[property] !== null) {
            arrayOfIngredients.push("<span>" + drinkResponse[property] + "</span>");
        }
    }
    ;
    arrayOfIngredients.forEach(function (ingredient, i) {
        if (drinkResponse["strMeasure" + (i + 1)] !== null) {
            ingredientsAndMeasures.push("<div><span>" + drinkResponse["strMeasure" + (i + 1)] + "</span> " + ingredient + "</div>");
        }
    });
    if (drinkIngredients) {
        drinkIngredients.innerHTML = ingredientsAndMeasures.join("");
    }
    else {
        return ingredientsAndMeasures.join("");
    }
};
var getRandomDrink = function () {
    drinkName = document.querySelector('.drink__name');
    drinkImage = document.querySelector('.drink__image');
    drinkIngredients = document.querySelector('.drink__ingredients');
    drinkDescription = document.querySelector('.drink__description');
    var drinkResponse;
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(function (response) { return response.json(); })
        .then(function (data) { return drinkResponse = data.drinks[0]; })
        .then(function () {
        drinkName.innerHTML = drinkResponse.strDrink;
        drinkImage.setAttribute('src', drinkResponse.strDrinkThumb);
        drinkDescription.innerHTML = drinkResponse.strInstructions;
        getIngredients(drinkResponse, drinkIngredients);
    })["catch"](function (err) {
        if (err) {
            console.log(err);
        }
    });
};
document.addEventListener('DOMContentLoaded', function () {
    getRandomDrink();
});
document.getElementById('get-random-drink').addEventListener('click', function () {
    getRandomDrink();
});
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.search__button').addEventListener('click', function () {
        var searchText = document.querySelector('.search__input');
        var arrayOfDrinks = [];
        var arrayOfDrinksHTML = [];
        var searchValue = searchText.value;
        if (searchValue) {
            fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchValue)
                .then(function (response) { return response.json(); })
                .then(function (drinks) { return arrayOfDrinks = drinks.drinks; })
                .then(function () {
                if (arrayOfDrinks) {
                    arrayOfDrinks.forEach(function (drink) {
                        arrayOfDrinksHTML.push("\n                            <div class=\"drink\">\n                                    <h4 class=\"drink__name\">" + drink.strDrink + "</h4>\n                                    <img src=\"" + drink.strDrinkThumb + "\" alt=\"\"\n                                        class=\"drink__image\">\n                                    <p class=\"drink__par\">What you need:</p>\n                                    <ul class=\"drink__ingredients\">" + getIngredients(drink, false) + "</ul>\n                                    <p class=\"drink__par\">Description: " + drink.strInstructions + "</p>\n                                    <p class=\"drink__description\"></p>\n                                </div>            \n                            ");
                    });
                }
                else {
                    arrayOfDrinksHTML.push("<p class=\"search-result__nothing\">Found nothing.</p>");
                }
                document.querySelector('.search-result').innerHTML = arrayOfDrinksHTML.join(" ");
            })["catch"](function (err) { return console.log('There is an error' + err); });
            searchText.setAttribute('placeholder', '');
            searchText.value = '';
        }
        else {
            searchText.setAttribute('placeholder', 'Write some name!');
        }
    });
});
//# sourceMappingURL=index.js.map