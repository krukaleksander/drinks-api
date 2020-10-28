var drinkName, drinkIngredients, drinkImage, drinkDescription;
document.addEventListener('DOMContentLoaded', function () {
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
    })["catch"](function (err) {
        if (err) {
            console.log(err);
        }
    });
});
//# sourceMappingURL=index.js.map