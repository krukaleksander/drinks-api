let drinkName: HTMLBodyElement, drinkIngredients: HTMLBodyElement, drinkImage: HTMLBodyElement, drinkDescription: HTMLBodyElement;




document.addEventListener('DOMContentLoaded', () => {
    drinkName = document.querySelector('.drink__name');
    drinkImage = document.querySelector('.drink__image');
    drinkIngredients = document.querySelector('.drink__ingredients');
    drinkDescription = document.querySelector('.drink__description');

    let drinkResponse: {
        strDrink: string,
        strDrinkThumb: string,
        strInstructions: string,
    };

    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => drinkResponse = data.drinks[0])
        .then(() => {
            drinkName.innerHTML = drinkResponse.strDrink;
            drinkImage.setAttribute('src', drinkResponse.strDrinkThumb);
            drinkDescription.innerHTML = drinkResponse.strInstructions;

        })
        .then(() => {
            let arrayOfIngredients = [];
            let ingredientsAndMeasures = [];
            const regexIngredients = /strIngredient/;
            for (const property in drinkResponse) {
                if (property.match(regexIngredients) && drinkResponse[property] !== null) {
                    arrayOfIngredients.push(`<span>${drinkResponse[property]}</span>`);
                }
            };

            arrayOfIngredients.forEach((ingredient, i) => {
                if (drinkResponse[`strMeasure${i + 1}`] !== null) {
                    ingredientsAndMeasures.push(`<div><span>${drinkResponse[`strMeasure${i + 1}`]}</span> ${ingredient}</div>`);
                }
            })
            drinkIngredients.innerHTML = ingredientsAndMeasures.join("");
            console.log(arrayOfIngredients);
            console.log(drinkResponse);
            console.log(readyArray);
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })



})