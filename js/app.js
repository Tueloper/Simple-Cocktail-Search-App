//instantiate classes
const ui = new UI();
const cockTailApi = new CocktailAPI()


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
    resultDiv.addEventListener('click', getRecipeInfo)
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
      }


    })

  };
};

function getRecipeInfo(e) {
  e.preventDefault();

  if (e.target.classList.contains('get-recipe')) {
    cockTailApi.getRecipeById(e.target.getAttribute('data-id'))
      .then(res => {
        let recipe = res.recipeInfo.drinks[0];
        ui.displaySingleRecipe(recipe);
      })
  };
};

//loading the categories when the page loads
function loadCategories() {

  //seleting the select tag
  const select = document.querySelector('.search-category');
  if (select) {
    ui.displayCategory();
  }
  
}