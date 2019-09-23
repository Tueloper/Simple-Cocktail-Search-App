class CocktailAPI {

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
}