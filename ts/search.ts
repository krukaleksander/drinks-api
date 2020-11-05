document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.search__button').addEventListener('click', () => {
        const searchText: HTMLInputElement = document.querySelector('.search__input');
        const resultContainer: HTMLElement = document.querySelector('.search-result');
        let arrayOfDrinks: any[] = [];
        let arrayOfDrinksHTML: string[] = [];

        const { value: searchValue } = searchText;

        if (searchValue) {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
                .then(response => response.json())
                .then(drinks => arrayOfDrinks = drinks.drinks)
                .then(() => {
                    if (arrayOfDrinks) {
                        arrayOfDrinks.forEach(drink => {
                            arrayOfDrinksHTML.push(`
                            <div class="drink">
                                    <h4 class="drink__name">${drink.strDrink}</h4>
                                    <div class="drink__image-container">
                                    <div class="spinner spinner--search"></div>
                            
                                    <img src="${drink.strDrinkThumb}" alt=""
                                        class="drink__image"></div>
                                    <p class="drink__par">What you need:</p>
                                    <ul class="drink__ingredients">${getIngredients(drink, false)}</ul>
                                    <p class="drink__par">Description: ${drink.strInstructions}</p>
                                    <p class="drink__description"></p>
                                </div>            
                            `)
                        });
                    } else {
                        arrayOfDrinksHTML.push(`<p class="search-result__nothing">Found nothing.</p>`)
                    }


                    resultContainer.innerHTML = arrayOfDrinksHTML.join(" ")
                })
                .catch(err => console.log('There is an error' + err));
            searchText.setAttribute('placeholder', '');
            searchText.value = '';
        } else {
            searchText.setAttribute('placeholder', 'Write some name!');
        }




    })
})