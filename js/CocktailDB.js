class CocktailDB { 

  //savethe drinks to localStorage
  saveToDrinks(drink) {

    let drinks = this.getFromDb();

    //push the drinks
    drinks.push(drink);

    //senf there to the localStorage
    localStorage.setItem('drinks', JSON.stringify(drinks)); 
  }

  //get the cards from the localStorage
  getFromDb() {

    let drinks;
    //collectin the files if they are there
    if (localStorage.getItem('drinks') === null ) {
      drinks = [];
    } else {

      //converting the string to object
      drinks = JSON.parse( localStorage.getItem('drinks'))
    }

    return drinks;
  }

  removeFavoritesDB(id) {

    //fetch for localstorage
    let drinks = this.getFromDb();

    drinks.forEach((drink, index) => {
      // return console.log(drink)
      if (id === drink.id) {
        drinks.splice(index, 1)
      }
    });

    //set the remaining values to lS
    localStorage.setItem('drinks', JSON.stringify(drinks))
  }
};