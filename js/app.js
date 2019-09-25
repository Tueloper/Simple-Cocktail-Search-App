//instantiate classes
const ui = new UI();
const cockTailApi = new CocktailAPI();
const cockdb = new CocktailDB();


//eventlisteners
eventListeners();

function eventListeners() {
  
  //select form
  const form = document.querySelector('#search-form');
  //in pages where form doesn't exist
  if (form) {
    form.addEventListener('submit', getCocktail)
  };

  //reading the results div
  const resultDiv = document.querySelector('#results');
  if (resultDiv) {
    resultDiv.addEventListener('click', useDElegation)
  };

  document.addEventListener('DOMContentLoaded', loadCategories )
 
};

//functions
function getCocktail (e) {
  e.preventDefault();

  //read the values
  const cocktailName = document.querySelector('#search').value;

  //validate the input value
  if (cocktailName === '') {

    //print a message
    ui.printMessage('Please Input a value, and Search again', 'alert-danger')
  } else {

    //rearranginng the sent query search
    let serverRes;

    //get the type of search type
    const nameType = document.querySelector('#type').value;

    switch (nameType) {
      case 'name':
        serverRes = cockTailApi.getCocktailBYName(cocktailName)
        break;

      case 'ingredient':
        serverRes = cockTailApi.getCocktailByIngredient(cocktailName)
        break;
      
      case 'category':
        serverRes = cockTailApi.getCocktailByCategory(cocktailName)
        break;
      
      case 'alcohol':
        serverRes = cockTailApi.getCocktailByAlcohol(cocktailName)
        break;

      default:
        break;
    }

    serverRes.then(res => {

      const drinks = res.drinks.drinks;
      // console.log(drinks) 
      //display in html
      if (drinks === null) {
        return ui.printMessage('Results Not Found', 'alert-danger')
      } else {

        if (nameType === 'name') {
          ui.displayDrinksHTML(drinks);
        } else {
          ui.displayIngredientsHTML(drinks);
        }
      };
    });

  };
};

function useDElegation(e) {
  e.preventDefault();

  if (e.target.classList.contains('get-recipe')) {
    cockTailApi.getRecipeById(e.target.getAttribute('data-id'))
      .then(res => {
        let recipe = res.recipeInfo.drinks[0];
        ui.displaySingleRecipe(recipe);
      })
  };

  //when the favorite button is cicked
  if (e.target.classList.contains('favorite-btn')) {    
    //change the favorite to something else
    if (e.target.classList.contains('is-favorite')) {

      //remove the class
      e.target.classList.remove('is-favorite');
      e.target.textContent = '+'

      //remove from the LS
      // cockdb.removeFavoritesDB();
    } else {

      //add the class
      e.target.classList.add('is-favorite');
      e.target.textContent = '-';

      //select the card
      const drinkCard = e.target.parentElement;

      const drinkINfo = {
        id: e.target.dataset.id,
        name: drinkCard.querySelector('h2').textContent,
        img: drinkCard.querySelector('.card-img-top').src
      };
      // return console.log(drinkCard)
      //send then to localStorage
      cockdb.saveToDrinks(drinkINfo)
    }
    
  }
};

//loading the categories when the page loads
function loadCategories() {
  //display loaded favorites from the storage
  ui.isFavorite();

  //seleting the select tag to display categories
  const select = document.querySelector('.search-category');
  if (select) {
    ui.displayCategory();
  }


  //loading information from loacalStorage
  const favoriteTable = document.querySelector('#favorites');
  if (favoriteTable) {
    
    //load the files from localStorage
    const drinks = cockdb.getFromDb();

    //display on the favourite oage
    ui.loadFavorites(drinks)


    //setup the view and remove buttons of the favourite when page loads
    favoriteTable.addEventListener('click', (e) => {

      e.preventDefault();

      //delegation
      if (e.target.classList.contains('get-recipe')) {
        cockTailApi.getRecipeById(e.target.dataset.id)
          .then(recipe => {

            //display the single recipe in the modal
            ui.displaySingleRecipe(recipe.recipeInfo.drinks[0])
          })
      }

      if (e.target.classList.contains('remove-recipe')) {
        
        //create a function that will remove the cocktail from the DOM 
        ui.removeFavorites(e.target.parentElement.parentElement)
        
        //remove from the localStorage
        cockdb.removeFavoritesDB(e.target.dataset.id )
      }
    })
  }
  
}