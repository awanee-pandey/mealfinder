const searchInput = document.getElementById('search'),
 searchbtn = document.getElementById('searchbtn'),
 randombtn = document.getElementById('random'),
 result = document.getElementById('result-heading'),
 meals = document.getElementById('meals'),
 singleMeal = document.getElementById('single-meal');
 console.log(searchbtn);

 /* Function for searching meal and fetch from API */
 function searchMeal(e){
    e.preventDefault();
    /* Clear single meal */
    singleMeal.innerHTML = '';

    /* Get Search term */
    const term = searchInput.value;
    
    /* Check for empty */
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            result.innerHTML =`<h2>Search results for '${term}':</h2>`
            if(data.meals === null){
                result.innerHTML=`There are no such meal.Please Try something else`;
                meals.innerHTML = '';
            } else{
                meals.innerHTML = data.meals.map(meal =>
                    `<div class ="meal">
                        <img src='${meal.strMealThumb}' href='${meal.strMeal}'>
                        <div class = "meal-info" data-mealID= "${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                     </div>
                    `).join('');
                }
        });
        //clear search text
        searchInput.value = '';
    }else{
        alert('Please enter a search term');
    }
 }

 /* Event Listener */
 searchbtn.addEventListener('click',searchMeal);


 /* Individual data showing part  */
 meals.addEventListener('click',e=>{
     const mealInfo = e.path.find(item=>{
         if(item.classList){
            return item.classList.contains('meal-info');
         } else{
             return false;
         }
     });
     if(mealInfo){
         const mealID = mealInfo.getAttribute('data-mealid');
         getMealById(mealID);
     }
 })


