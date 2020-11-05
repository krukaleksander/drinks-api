let drinkName: HTMLBodyElement, drinkIngredients: HTMLBodyElement, drinkImage: HTMLBodyElement, drinkDescription: HTMLBodyElement;

const spinner: HTMLElement = document.getElementById("spinner");

const getIngredients = (drinkResponse: any, drinkIngredients: any) => {
    let arrayOfIngredients = [];
    let ingredientsAndMeasures: string[] = [];
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
    if (drinkIngredients) {
        drinkIngredients.innerHTML = ingredientsAndMeasures.join("");
    } else {
        return ingredientsAndMeasures.join("");
    }

}

const getRandomDrink = () => {
    drinkName = document.querySelector('.random-drink .drink__name');
    drinkImage = document.querySelector('.random-drink .drink__image');
    drinkIngredients = document.querySelector('.random-drink .drink__ingredients');
    drinkDescription = document.querySelector('.random-drink .drink__description');

    let drinkResponse: {
        strDrink: string,
        strDrinkThumb: string,
        strInstructions: string,
        [key: string]: string;
    };
    drinkImage.style.display = 'none';
    spinner.removeAttribute('hidden');
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => drinkResponse = data.drinks[0])
        .then(() => {
            drinkName.innerHTML = drinkResponse.strDrink;
            spinner.setAttribute('hidden', '');
            drinkImage.style.display = 'block';
            drinkImage.setAttribute('src', drinkResponse.strDrinkThumb);
            drinkDescription.innerHTML = drinkResponse.strInstructions;

            getIngredients(drinkResponse, drinkIngredients);

        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })

};


document.addEventListener('DOMContentLoaded', () => {
    getRandomDrink();
});

document.getElementById('get-random-drink').addEventListener('click', () => {
    getRandomDrink();
})