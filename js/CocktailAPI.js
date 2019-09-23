class CocktailAPI {

  //function used to display Cocktail by Name
  async getCocktailBYName(name) {

    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

      const queryCock = await fetch(url);
      const drinks = await queryCock.json();

      return {
        drinks
      }
    } catch (error) {
      ui.printMessage(error.message, 'alert-danger')
    }
  }

  //function used to display Cocktail by Ingredient
  async getCocktailByIngredient(ingredient) {

    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

      const queryIngredient = await fetch(url);
      const drinks = await queryIngredient.json();
      // return console.log(drinks)  
      return {
        drinks
      }
    } catch (error) {
      ui.printMessage(error.message, 'alert-danger')
    }
  }

  //function used to display Cocktail by Ingredient through the id
  async getRecipeById(id) {

    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const queryIngredient = await fetch(url);
      const recipeInfo = await queryIngredient.json();
      // return console.log(recipeInfo)  
      return {
        recipeInfo
      }
    } catch (error) {
      ui.printMessage(error.message, 'alert-danger')
    }
  }


  //function used to display categories in the select page
  async getCategories() {

    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

      const apiResponse = await fetch(url);
      const categories = await apiResponse.json();
      // return console.log(recipeInfo)  
      return {
        categories
      }
    } catch (error) {
      ui.printMessage(error.message, 'alert-danger')
    }
  }

  async getCocktailByCategory(cat) {

    try {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`;

      const apiResponse = await fetch(url);
      const drinks = await apiResponse.json();
      // return console.log(recipeInfo)  
      return {
        drinks
      }
    } catch (error) {
      ui.printMessage(error.message, 'alert-danger')
    }
  }

};