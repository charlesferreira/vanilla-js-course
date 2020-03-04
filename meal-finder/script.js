const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsElement = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  singleMealElement = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealElement.innerHTML = '';

  // Get search term
  const term = search.value.trim();

  // Check for empty
  if (term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsElement.innerHTML = data.meals
            .map(
              meal => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealId="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            .join('');
        }
      });

    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Event listeners
submit.addEventListener('submit', searchMeal);
