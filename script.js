let result = document.getElementById("result");
const search = document.getElementById("search");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
search.addEventListener("click", () => {
  let userInput = document.getElementById("user-input").value;
  console.log(userInput);

  if (userInput.length === 0) {
    result.innerHTML = `<h3>the input field cannot be empty</h3>
`;
  } else {
    fetch(url + userInput)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        console.log(myMeal);

        let count = 1;
        let ingridients = [];
        for (let key in myMeal) {
          let ingridient = "";
          let measure = "";
          if (key.startsWith("strIngredient") && myMeal[key]) {
            ingridient = myMeal[key];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingridients.push(`${measure} ${ingridient}`);
          }
        }
        console.log(ingridients);
        result.innerHTML = `
          <img src=${myMeal.strMealThumb}>
          <div class="details">
          <h2>${myMeal.strMeal}</h2>
          <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredients"></div>
           <div id="recipe">
           <button id="hide">❌</button>
           <pre id="instructions">${myMeal.strInstructions}</pre>

           </div>
           <button id="show">view recipe</button>

        `;
        let ingridientsEl = document.getElementById("ingredients");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hide = document.getElementById("hide");
        let show = document.getElementById("show");
        ingridients.forEach((element) => {
          let listItem = document.createElement("li");
          listItem.innerText = element;
          parent.appendChild(listItem);
          ingridientsEl.appendChild(parent);
        });
        hide.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        show.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>please enter a valid input</h3>
        `;
      });
  }
});
