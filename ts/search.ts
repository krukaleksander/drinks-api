document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.search__button').addEventListener('click', () => {
        const searchText: HTMLInputElement = document.querySelector('.search__input');

        let arrayOfDrinks: any[];
        let arrayOfDrinksHTML = [];

        const { value: searchValue } = searchText;

        if (searchValue) {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
                .then(response => response.json())
                .then(drinks => arrayOfDrinks = drinks.drinks)
                .then(() => {
                    arrayOfDrinks.forEach(drink => {
                        arrayOfDrinksHTML.push(`
                        <div class="drink">
                                <h4 class="drink__name">${drink.strDrink}</h4>
                                <img src="${drink.strDrinkThumb}" alt=""
                                    class="drink__image">
                                <p class="drink__par">What you need:</p>
                                <ul class="drink__ingredients"></ul>
                                <p class="drink__par">Description: ${drink.strInstructions}</p>
                                <p class="drink__description"></p>
                            </div>            
                        `)
                    });

                    document.querySelector('.search-result').innerHTML = arrayOfDrinksHTML.join(" ")
                })
                .catch(err => console.log('There is an error' + err));
            searchText.setAttribute('placeholder', '');
            searchText.value = '';
        } else {
            searchText.setAttribute('placeholder', 'Write some name!');
        }




    })
})