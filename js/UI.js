//inint app
class UI {

  printMessage(mesasage, className) {

    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div class="alert alert-dismissible text-center my-2 ${className}">
        <button type="button" class="close" data-dismiss="alert"></button>
        ${mesasage}
      </div>
    `;

    //print on the page
    const reference = document.querySelector('#search-form');
    const parentNode = reference.parentElement;
    parentNode.insertBefore(errorDiv, reference);

    //make sure to remive it
    setTimeout(() => {
      document.querySelector('.alert').remove()
    }, 3000)
  }

  //displaying the various ingredints based on thier names
  displayIngredientsHTML(drinks) {

    //display the result div
    const resultDIv = document.querySelector('.results-wrapper');
    resultDIv.style.display = 'block';

    //inserting the results in the div
    const drinResults = document.querySelector('#results');

    drinks.forEach(drink => {
      drinResults.innerHTML += `
        <div class="col-md-6">
          <div class="card my-3">
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        
            <div class="card-body">
              <h2 class="text-center card-title">${drink.strDrink}</h2>
              <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">
                Get Recipe
              </a>
            </div>
          </div>
        </div >
      `;
    })
  }

  //displaying cocktails based on ingredients on the ingredients page
  displayDrinksHTML(drinks) {

    //display the result div
    const resultDIv = document.querySelector('.results-wrapper');
    resultDIv.style.display = 'block';

    //inserting the results in the div
    const drinkResults = document.querySelector('#results');

    drinks.forEach(drink => {
      drinkResults.innerHTML += `
      
        <div class="col-md-6">
          <div class="card my-3">
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        
            <div class="card-body">
                <h2 class="text-center card-title">${drink.strDrink}</h2>
                <p class="card-text font-weight-bold">Instructions:</p>
                
                <p class="card-text">
                  ${drink.strInstructions}
                </p>

                <p class="card-text">
                  <ul class="list-group text-center ">
                    <li class="list-group-item alert alert-success">Ingredients</li>
                    ${this.displayINgredients(drink)}
                  </ul>
                </p>
                
                <p class="card-text font-weight-bold">Extra Information:</p>
                
                <p class="card-text">
                 <span class="badge badge-danger badge-pill">
                  ${drink.strAlcoholic}
                 </span>

                 <span class="badge badge-warning badge-pill">
                  ${drink.strCategory}
                 </span>

                </p>

            </div>
          </div>
        </div>

      `;
    })
  }

  //a function declared to display the numbers of ingredients in each of the cocktail on the screen
  displayINgredients(drink) {

    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      const el = {};
      if (drink[`strIngredient${i}`] !== '') {
        el.ingredient = drink[`strIngredient${i}`];
        el.measure = drink[`strMeasure${i}`];
        ingredients.push(el);
      }
    };
    // return console.log(ingredients)

    let ingredientTemplate = '';

    ingredients.forEach(ingredient => {
      ingredientTemplate += `
        <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
      `;
    });

    return ingredientTemplate;

  }

  //this clears the initial display on the result div for incoming messages/cocktail display
  clearHTML() {
    const result = document.querySelector('#results');
    result.innerHTML();
  }

  //Displaying single recipe based on the various ingredients displayed in the page
  displaySingleRecipe(recipe) {

    //get the variables
    const modalTitle = document.querySelector('.modal-title'),
      modalDescription = document.querySelector('.modal-body .description-text'),
      modalIngredient = document.querySelector('.modal-body .ingredient-list .list-group');

    //set the values
    modalTitle.innerHTML = recipe.strDrink;
    modalDescription.innerHTML = recipe.strInstructions;

    //display the imgredients
    let IngredientList = this.displayINgredients(recipe);
    modalIngredient.innerHTML = IngredientList;

  }

}