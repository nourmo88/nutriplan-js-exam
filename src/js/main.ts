import * as components from "./ui/components.js";
import * as MealsTS from "./api/meals.js";
declare const Swal: any;

(async function () {

  let homebtn = document.getElementById("tohome");
  let productbtn = document.getElementById("toproduct");
  let logbtn = document.getElementById("tolog");
  let container = document.getElementById("main-content");
  let Ass = document.querySelectorAll("nav a");
  let inputsearchinhome = document.getElementById("search-input") as HTMLInputElement;
  let mess = document.getElementById("recipes-count");
  let disdiv = document.getElementById("recipes-grid");
  let theGroup: string = "all";
  let theCat: string = 'all';
  let MealsTSApi = await MealsTS.displayMeals();
  let Areas = await MealsTS.getArea();
  let cats = await MealsTS.getCategory();
  let recCard: NodeListOf<HTMLDivElement>;
  Displayinhome(MealsTSApi);
  DisplayArea();
  DisplayCategory();


  type FoodLogEntry = {
    name: string;
    date: string;
    time: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    type: "recipe" | "product";
    quantity?: number;
  };

  type product = {
    barcode: "",
    brand: "",
    image: "",
    name: "",
    novaGroup: 0,
    nutrients: {
      calories: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
      sodium: 0,
      sugar: 0
    },
    nutritionGrade: ""
  };
  type MealsTS = {
    id: string;
    name: string;
    thumbnail: string;
    category: string;
    area: string;
    instructions: string[];
  };
  type Ingredient = {
    ingredient: string;
    measure: string;
  };

  type Meal = {
    name: string;
    ingredients: Ingredient[];
  };

  type NutritionData = {
    recipeName: string;
    ingredients: string[];
  };


  homebtn?.addEventListener("click", () => {
    if (container) {
      container.innerHTML = components.getHome();
    }
    for (let i = 0; i < Ass.length; i++) {
      Ass[i].classList.remove("bg-emerald-50", "text-emerald-700");
    }
    Ass[0].classList.add("bg-emerald-50", "text-emerald-700");
    Displayinhome(MealsTSApi);
    DisplayArea();
    DisplayCategory();
  })

  productbtn?.addEventListener("click", () => {
    DispalyproductCategory();
    let proResult: product[];
    if (container) {
      container.innerHTML = components.getProduct();
    }
    for (let i = 0; i < Ass.length; i++) {
      Ass[i].classList.remove("bg-emerald-50", "text-emerald-700");
    }
    Ass[1].classList.add("bg-emerald-50", "text-emerald-700");
    let searchInput = document.getElementById("product-search-input") as HTMLInputElement;
    let searchBtn = document.getElementById("search-product-btn");

    searchBtn?.addEventListener("click", async () => {
      let value = searchInput?.value.trim();

      if (value) {
        proResult = await MealsTS.FilterProduct(value);
        //console.log(proResult);

        DisplayProduct(proResult);
      }
    });

    function FilterbyGroub(letter: string) {
      //console.log("group");
      theGroup = letter;
      DisplayProduct(proResult);
    }
    (window as any).FilterbyGroub = FilterbyGroub;

    let searchbarInput = document.getElementById("barcode-input") as HTMLInputElement;
    let searchbarBtn = document.getElementById("lookup-barcode-btn");
    //console.log(searchbarInput);
    async function filterCategory(category: string) {
      theCat = category;
      proResult = await DisplayfoCategory();
      DisplayProduct(proResult);
    }
    (window as any).filterCategory = filterCategory;

    searchbarBtn?.addEventListener("click", async () => {
      let valuebar = searchbarInput?.value.trim();

      if (valuebar) {
        proResult = await MealsTS.FilterbarProduct(valuebar);
        //console.log(proResult);

        DisplayProduct(proResult);
      }
    })


  })

  logbtn?.addEventListener("click", () => {
    if (container) {
      container.innerHTML = components.getLog();
    }
    for (let i = 0; i < Ass.length; i++) {
      Ass[i].classList.remove("bg-emerald-50", "text-emerald-700");
    }
    Ass[2].classList.add("bg-emerald-50", "text-emerald-700");

    displayTodayNutrition();
    displayWeeklyOverview();

    let toRecipe = document.getElementById("toRecipe");
    toRecipe?.addEventListener("click", () => {
      if (container) {
        container.innerHTML = components.getHome();
      }
      for (let i = 0; i < Ass.length; i++) {
        Ass[i].classList.remove("bg-emerald-50", "text-emerald-700");
      }
      Ass[0].classList.add("bg-emerald-50", "text-emerald-700");
      Displayinhome(MealsTSApi);
      DisplayArea();
      DisplayCategory();
    })
    let toScan = document.getElementById("toScan");
    toScan?.addEventListener("click", () => {
      DispalyproductCategory();
      let proResult: product[];
      if (container) {
        container.innerHTML = components.getProduct();
      }
      for (let i = 0; i < Ass.length; i++) {
        Ass[i].classList.remove("bg-emerald-50", "text-emerald-700");
      }
      Ass[1].classList.add("bg-emerald-50", "text-emerald-700");
      let searchInput = document.getElementById("product-search-input") as HTMLInputElement;
      let searchBtn = document.getElementById("search-product-btn");

      searchBtn?.addEventListener("click", async () => {
        let value = searchInput?.value.trim();

        if (value) {
          proResult = await MealsTS.FilterProduct(value);

          DisplayProduct(proResult);
        }
      });

      function FilterbyGroub(letter: string) {
        theGroup = letter;
        DisplayProduct(proResult);
      }
      (window as any).FilterbyGroub = FilterbyGroub;

      let searchbarInput = document.getElementById("barcode-input") as HTMLInputElement;
      let searchbarBtn = document.getElementById("lookup-barcode-btn");
      //console.log(searchbarInput);
      async function filterCategory(category: string) {
        theCat = category;
        proResult = await DisplayfoCategory();
        DisplayProduct(proResult);
      }
      (window as any).filterCategory = filterCategory;

      searchbarBtn?.addEventListener("click", async () => {
        let valuebar = searchbarInput?.value.trim();

        if (valuebar) {
          proResult = await MealsTS.FilterbarProduct(valuebar);
          DisplayProduct(proResult);
        }
      })
    })
  })

  async function Displayinhome(MealsTSs: MealsTS[]) {
    let MealsTS = MealsTSs;
    let divs = ``;
    for (let i = 0; i < MealsTS.length; i++) {
      divs += `
            <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="${MealsTS[i].id}">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${MealsTS[i].thumbnail}" alt="Teriyaki Chicken Casserole"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${MealsTS[i].category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${MealsTS[i].area}
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                ${MealsTS[i].name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${MealsTS[i].instructions[0].split(" ").slice(0, 20).join(` `) + `...`}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                  ${MealsTS[i].category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  ${MealsTS[i].area}
                </span>
              </div>
            </div>
          </div>
            `
    }
    let disdiv = document.getElementById("recipes-grid");
    if (disdiv) {
      disdiv.innerHTML = divs;
    }
    recCard = document.querySelectorAll(".recipe-card");
    recCard.forEach((card) => {
      card.addEventListener("click", () => {
        let mealId = card.getAttribute("data-meal-id");
        console.log(mealId);

        if (mealId) {
          Displaydetails(mealId);
        }

      });
    });
  }

  async function DisplayArea() {
    // console.log(Areas);
    let arrArea = Areas;
    let cA = `<button onclick="FilterMealsTSbyArea('all')"
            class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
            All Recipes
          </button>`;
    for (let i = 0; i < 10; i++) {
      cA += `
            <button onclick="FilterMealsTSbyArea('${arrArea[i].name}')"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
            ${arrArea[i].name}
          </button>
            `
    }
    let areadiv = document.getElementById("Area");
    if (areadiv) {
      areadiv.innerHTML = cA;
    }
  }

  async function DisplayCategory() {
    let x = 0;
    let ct = ``;
    for (let i = 0; i < cats.length; i++) {
      if (x == 0) {
        ct += `
            <div onclick="FilterMealsTSbyCategory('${cats[i].name}')"
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${cats[i].name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <i class="fa-solid fa-drumstick-bite"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${cats[i].name}</h3>
              </div>
            </div>
          </div>
            `
        x = 1;
      }
      else if (x == 1) {
        ct += `
            <div onclick="FilterMealsTSbyCategory('${cats[i].name}')"
            class="category-card rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${cats[i].name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <i class="fa-solid fa-drumstick-bite"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${cats[i].name}</h3>
              </div>
            </div>
          </div>
            `
        x = 2;
      }
      else if (x == 2) {
        ct += `
            <div onclick="FilterMealsTSbyCategory('${cats[i].name}')"
            class="category-card bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${cats[i].name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <i class="fa-solid fa-drumstick-bite"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${cats[i].name}</h3>
              </div>
            </div>
          </div>
            `
        x = 0;
      }
      if (i == 5 || i == 10) {
        x = 1;
      }
    }
    let areadiv = document.getElementById("categories-grid");
    if (areadiv) {
      areadiv.innerHTML = ct;
    }
  }

  async function Displaydetails(id: string) {

    let themeanMeal = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`);
    let response = await themeanMeal.json();
    let meal = response.result;
    //console.log(meal);
    let facts = await getMealNutrition(meal);
    let proteinWidth = Math.min((facts.perServing.protein / 50) * 100, 100);
    let carbsWidth = Math.min((facts.perServing.carbs / 250) * 100, 100);
    let fatWidth = Math.min((facts.perServing.fat / 65) * 100, 100);
    let fiberWidth = Math.min((facts.perServing.fiber / 30) * 100, 100);
    let sugarWidth = Math.min((facts.perServing.sugar / 50) * 100, 100);
    let saturatedFatWidth = Math.min((facts.perServing.saturatedFat / 20) * 100, 100);
    let detail = `
    <section id="meal-details" class="px-8 py-8 bg-gray-50">

      <div class="max-w-7xl mx-auto">

        <button id="back-to-MealsTS-btn"
          class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Recipes</span>
        </button>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">

          <div class="relative h-80 md:h-96">

            <img src="${meal.thumbnail}"
              alt="Teriyaki Chicken Casserole" class="w-full h-full object-cover" />

            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div class="absolute bottom-0 left-0 right-0 p-8">

              <div class="flex items-center gap-3 mb-3">

                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>

                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area}</span>

              </div>

              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${meal.name}
              </h1>

              <div class="flex items-center gap-6 text-white/90">

                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>

                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">4 servings</span>
                </span>

                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">${facts.perServing.calories} cal/serving</span>
                </span>

              </div>

            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">

          <button id="log-meal-btn"
            class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            data-meal-id="${id}">

            <i class="fa-solid fa-clipboard-list"></i>
            <span>Log This Meal</span>

          </button>

        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div class="lg:col-span-2 space-y-8">

            <div class="bg-white rounded-2xl shadow-lg p-6">

              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients

                <span class="text-sm font-normal text-gray-500 ml-auto">${meal.ingredients?.length} items</span>

              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    `;

    for (let i = 0; i < meal.ingredients?.length; i++) {
      detail += `
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">

                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />

                  <span class="text-gray-700">

                    <span class="font-medium text-gray-900">${meal.ingredients[i].measure}</span>

                    ${meal.ingredients[i].ingredient}

                  </span>

                </div>
        `;
    }

    detail += `
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6">

              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

                <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                Instructions

              </h2>

              <div class="space-y-4">`;
    for (let i = 0; i < meal.instructions?.length; i++) {
      detail += `
                <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">

                  <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${i + 1}
                  </div>

                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${meal.instructions[i]}
                  </p>

                </div>`}
    detail += `
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-6">

              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
              </h2>

              <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">

                <iframe src="https://www.youtube.com/embed/${meal.youtube.split("v=")[1]}" class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>

              </div>
            </div>

          </div>

          <div class="space-y-6">

            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>

              <div id="nutrition-facts-container">

                <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">

                  <p class="text-sm text-gray-600">Calories per serving</p>
                  <p class="text-4xl font-bold text-emerald-600">${facts.perServing.calories}</p>
                  <p class="text-xs text-gray-500 mt-1">Total: ${facts.totals.calories} cal</p>

                </div>

                <div class="space-y-4">

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.protein}</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${proteinWidth}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.carbs}g</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${carbsWidth}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.fat}g</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${fatWidth}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.fiber}g</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${fiberWidth}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.sugar}g</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${sugarWidth}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${facts.perServing.saturatedFat}g</span>
                  </div>

                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${saturatedFatWidth}%"></div>
                  </div>

                </div>

                <div class="mt-6 pt-6 border-t border-gray-100">

                  <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Other
                  </h3>

                  <div class="grid grid-cols-2 gap-3 text-sm"
                  <p>Cholesterol  ${facts.perServing.cholesterol}</p>
                  <p>Sodium  ${facts.perServing.sodium}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    `;

    if (container) {
      container.innerHTML = detail;
    }
    let dettohome = document.querySelector("#meal-details #back-to-MealsTS-btn");
    dettohome?.addEventListener("click", () => {
      console.log("dettohome");

      if (container) {
        container.innerHTML = components.getHome();
        Displayinhome(MealsTSApi);
        DisplayArea();
        DisplayCategory();

      }
    })
    //console.log(dettohome);

    let logBTN = document.getElementById("log-meal-btn");
    logBTN?.addEventListener("click", () => {
      showLogMealModal(meal, facts);
    })

  }

  async function getMealNutrition(meal: Meal) {

    let nutritionBody: NutritionData = {
      recipeName: meal.name,

      ingredients: meal.ingredients.map((item: Ingredient) =>
        `${item.measure} ${item.ingredient}`
      )
    };

    const response = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": "FNQ78FJP6bmTcGwnjrhHFttMmrkNTtmR66HHR8QD"
      },

      body: JSON.stringify(nutritionBody)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    // console.log("Calories:", data.data.perServing.calories);
    // console.log("Protein:", data.data.perServing.protein);
    // console.log("Carbs:", data.data.perServing.carbs);
    // console.log("Fat:", data.data.perServing.fat);
    // console.log("Fiber:", data.data.perServing.fiber);
    return data.data;

  }

  inputsearchinhome.addEventListener("input", async () => {
    let searchResult = await MealsTS.forSearch(inputsearchinhome.value);
    if (searchResult) {
      // console.log(inputsearchinhome.value);
      // console.log(searchResult);
      if (mess) {
        mess.innerHTML = `Showing ${searchResult.length} recipes`;
      }
      Displayinhome(searchResult);
    }
    else {
      if (disdiv) {
        disdiv.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500 text-lg">No recipes found</p>
          <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `;
        if (mess) {
          mess.innerHTML = `Showing 0 recipes`;
        }
      }
    }
  })

  async function FilterMealsTSbyArea(value: string) {
    console.log("area");
    let response;
    if (value === "all") {
      response = await fetch(`https://nutriplan-api.vercel.app/api/meals/random?count=25`)
    }
    else {
      response = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${value}d&page=1&limit=25`);
    }
    if (response) {
      let data = await response.json();
      //console.log(data.results);
      if (data.results && data.results.length > 0) {
        if (mess) {
          mess.innerHTML = `Showing ${data.results.length} recipes`;
        }
        Displayinhome(data.results);

      }
      else {
        console.log(disdiv);

        if (disdiv) {
          disdiv.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500 text-lg">No recipes found</p>
          <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `;
          if (mess) {
            mess.innerHTML = `Showing 0 recipes`;
          }
        }
      }
    }
  }

  async function FilterMealsTSbyCategory(value: string) {
    console.log("category");
    let response = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${value}&page=1&limit=25`);

    let data = await response.json();
    //console.log(data.results);

    if (data.results && [data.results].length > 0) {
      if (mess) {
        mess.innerHTML = `Showing ${data.results.length} recipes`;
      }
      Displayinhome(data.results);

    }
    else {
      console.log(disdiv);

      if (disdiv) {
        disdiv.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500 text-lg">No recipes found</p>
          <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
        `;
        if (mess) {
          mess.innerHTML = `Showing 0 recipes`;
        }
      }
    }
  }

  (window as any).FilterMealsTSbyArea = FilterMealsTSbyArea;
  (window as any).FilterMealsTSbyCategory = FilterMealsTSbyCategory;

  async function DisplayProduct(product: product | product[]) {
    //console.log("2group");

    let t = 0;
    let x = "";
    let products = Array.isArray(product) ? product : [product];

    if (theGroup === "all") {
      for (let i = 0; i < products.length; i++) {
        if (!products[i]) continue;
        t = +1;
        x += `
            <div data-product-index="${i}"
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${products[i].barcode || ""}">

                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">

                    <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        src="${products[i].image}"
                        alt="${products[i].name}" loading="lazy" />

                    <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Nutri-Score ${products[i].nutritionGrade || "N/A"}
                    </div>

                    <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        title="NOVA 2">
                        ${products[i].novaGroup ? products[i].novaGroup : 0}
                    </div>

                </div>

                <div class="p-4">

                    <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                        ${products[i].brand}
                    </p>

                    <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        ${products[i].name}
                    </h3>

                    <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span><i class="fa-solid fa-fire mr-1"></i>${Math.round(products[i].nutrients?.calories) ?? 0} kcal/100g</span>
                    </div>

                    <div class="grid grid-cols-4 gap-1 text-center">

                        <div class="bg-emerald-50 rounded p-1.5">
                            <p class="text-xs font-bold text-emerald-700">${Math.round(products[i].nutrients?.protein) ?? 0}g</p>
                            <p class="text-[10px] text-gray-500">Protein</p>
                        </div>

                        <div class="bg-blue-50 rounded p-1.5">
                            <p class="text-xs font-bold text-blue-700">${Math.round(products[i].nutrients?.carbs) ?? 0}g</p>
                            <p class="text-[10px] text-gray-500">Carbs</p>
                        </div>

                        <div class="bg-purple-50 rounded p-1.5">
                            <p class="text-xs font-bold text-purple-700">${Math.round(products[i].nutrients?.fat) ?? 0}g</p>
                            <p class="text-[10px] text-gray-500">Fat</p>
                        </div>

                        <div class="bg-orange-50 rounded p-1.5">
                            <p class="text-xs font-bold text-orange-700">${Math.round(products[i].nutrients?.sugar) ?? 0}g</p>
                            <p class="text-[10px] text-gray-500">Sugar</p>
                        </div>

                    </div>
                </div>
            </div>
            `;
      }

    }
    else {
      for (let i = 0; i < products.length; i++) {
        if (!products[i]) continue;
        if (products[i].nutritionGrade == theGroup) {
          t = +1;
          x += `
                <div
                    class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    data-barcode="${products[i].barcode}">

                    <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">

                        <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            src="${products[i].image}"
                            alt="${products[i].name}" loading="lazy" />

                        <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                            Nutri-Score ${products[i].nutritionGrade || "N/A"}
                        </div>

                        <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                            title="NOVA 2">
                            ${products[i].novaGroup ? products[i].novaGroup : 0}
                        </div>

                    </div>

                    <div class="p-4">

                        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                            ${products[i].brand}
                        </p>

                        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            ${products[i].name}
                        </h3>

                        <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <span><i class="fa-solid fa-fire mr-1"></i>${Math.round(products[i].nutrients?.calories) ?? 0} kcal/100g</span>
                        </div>

                        <div class="grid grid-cols-4 gap-1 text-center">

                            <div class="bg-emerald-50 rounded p-1.5">
                                <p class="text-xs font-bold text-emerald-700">${Math.round(products[i].nutrients?.protein) ?? 0}g</p>
                                <p class="text-[10px] text-gray-500">Protein</p>
                            </div>

                            <div class="bg-blue-50 rounded p-1.5">
                                <p class="text-xs font-bold text-blue-700">${Math.round(products[i].nutrients?.carbs) ?? 0}g</p>
                                <p class="text-[10px] text-gray-500">Carbs</p>
                            </div>

                            <div class="bg-purple-50 rounded p-1.5">
                                <p class="text-xs font-bold text-purple-700">${Math.round(products[i].nutrients?.fat) ?? 0}g</p>
                                <p class="text-[10px] text-gray-500">Fat</p>
                            </div>

                            <div class="bg-orange-50 rounded p-1.5">
                                <p class="text-xs font-bold text-orange-700">${Math.round(products[i].nutrients?.sugar) ?? 0}g</p>
                                <p class="text-[10px] text-gray-500">Sugar</p>
                            </div>

                        </div>
                    </div>
                </div>
                `;
        }
      }
    }

    let div = document.getElementById("products-grid");

    if (div) {
      if (t === 0) {
        div.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                    </div>
                    <p class="text-gray-500 text-lg">
                        No products to display. Search for a product or browse by category.
                    </p>
                </div>
            `;
      }
      else {
        div.innerHTML = x;

        const cards = div.querySelectorAll(".product-card");

        cards.forEach((card) => {
          card.addEventListener("click", () => {
            const index = Number((card as HTMLElement).dataset.productIndex);
            //console.log(index);
            const selectedProduct = products[index];

            if (selectedProduct) {
              showProductDetails(selectedProduct);
            }

          });
        })
      }
    }


  };

  async function DisplayfoCategory() {
    ``
    let APi = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${theCat}`);
    let response = await APi.json();
    let results = response.results;
    console.log(results);
    //DisplayProduct(results);
    return results;
  }

  async function DispalyproductCategory() {
    let APi = await fetch(`https://nutriplan-api.vercel.app/api/products/categories`);
    let response = await APi.json();
    let result = response.results;
    //console.log(result);
    let y = ``;
    for (let i = 0; i < result.length; i++) {
      if (i % 2 == 0) {
        y += `
      <button onclick="filterCategory('${result[i].id}')"
              class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
              <i class="fa-solid fa-cookie mr-1.5"></i>${result[i].name}
            </button>
      `;
      }
      else if (i % 3 == 0) {
        y += `
        <button onclick="filterCategory('${result[i].id}')"
              class="product-category-btn px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
              <i class="fa-solid fa-cookie mr-1.5"></i>${result[i].name}
            </button>
        `;
      }
      else {
        y += `
        <button onclick="filterCategory('${result[i].id}')"
              class="product-category-btn px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
              <i class="fa-solid fa-cookie mr-1.5"></i>${result[i].name}
            </button>
        `;
      }
    }
    let cdiv = document.getElementById("product-categories");
    if (cdiv) {
      cdiv.innerHTML = y;
    }

  }

  function showProductDetails(product: product) {
    //console.log("showProductDetails");

    const nutrients = product.nutrients;
    const dailyNeeds = {
      calories: 2000,
      protein: 50,
      carbs: 250,
      fat: 65,
      sugar: 50
    };

    const caloriesPercent = Math.min((nutrients.calories / dailyNeeds.calories) * 100, 100);
    const proteinPercent = Math.min((nutrients.protein / dailyNeeds.protein) * 100, 100);
    const carbsPercent = Math.min((nutrients.carbs / dailyNeeds.carbs) * 100, 100);
    const fatPercent = Math.min((nutrients.fat / dailyNeeds.fat) * 100, 100);
    const sugarPercent = Math.min((nutrients.sugar / dailyNeeds.sugar) * 100, 100);

    const detCard = `
        <div id="product-modal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-5">

            <div class="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-5 md:p-7 relative">

                <button id="close-product-modal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <img src="${product.image}"
                            alt="${product.name}"
                            class="w-full h-40 object-contain rounded-xl bg-gray-50">

                        <p class="text-sm text-gray-500 mt-3">${product.brand}</p>

                        <h2 class="text-2xl font-bold mt-1">${product.name}</h2>

                        
                    </div>

                    <div>
                        <h3 class="text-xl font-bold mb-5">Nutrition Facts</h3>

                        <p class="text-sm text-gray-500 mb-4">Per 100g</p>

                        <!-- Calories -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1">
                                <span>Calories</span>
                                <span>${Math.round(nutrients.calories)} kcal</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-2">
                                <div class="bg-orange-500 h-2 rounded-full"
                                    style="width: ${caloriesPercent}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                ${Math.round(caloriesPercent)}% of daily needs
                            </p>
                        </div>

                        <!-- Protein -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1">
                                <span>Protein</span>
                                <span>${Math.round(nutrients.protein)} g</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full"
                                    style="width: ${proteinPercent}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                ${Math.round(proteinPercent)}% of daily needs
                            </p>
                        </div>

                        <!-- Carbs -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1">
                                <span>Carbs</span>
                                <span>${Math.round(nutrients.carbs)} g</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-2">
                                <div class="bg-yellow-500 h-2 rounded-full"
                                    style="width: ${carbsPercent}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                ${Math.round(carbsPercent)}% of daily needs
                            </p>
                        </div>

                        <!-- Fat -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1">
                                <span>Fat</span>
                                <span>${Math.round(nutrients.fat)} g</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-2">
                                <div class="bg-red-500 h-2 rounded-full"
                                    style="width: ${fatPercent}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                ${Math.round(fatPercent)}% of daily needs
                            </p>
                        </div>

                        <!-- Sugar -->
                        <div class="mb-5">
                            <div class="flex justify-between mb-1">
                                <span>Sugar</span>
                                <span>${Math.round(nutrients.sugar)} g</span>
                            </div>
                            <div class="bg-gray-200 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full"
                                    style="width: ${sugarPercent}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                ${Math.round(sugarPercent)}% of daily needs
                            </p>
                        </div>

                        

                    </div>
                </div>

                <div class="flex gap-3 mt-7">
                    <button id="close-product-modal-bottom"
                        class="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                        Close
                    </button>

                    <button id="log-product-btn"
                        class="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700">
                        Log This Food
                    </button>
                </div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", detCard);
    const modal = document.getElementById("product-modal");
    document.getElementById("close-product-modal")?.addEventListener("click", () => {
      modal?.remove();
    });

    document.getElementById("close-product-modal-bottom")?.addEventListener("click", () => {
      modal?.remove();
    });

    document.getElementById("log-product-btn")?.addEventListener("click", () => {

      const productData: FoodLogEntry = {
        name: product.name,
        date: "",
        time: "",
        calories: Math.round(product.nutrients.calories),
        protein: Math.round(product.nutrients.protein),
        fat: Math.round(product.nutrients.fat),
        carbs: Math.round(product.nutrients.carbs),
        type: "product"
      };

      saveFoodLog(productData);
      document.getElementById("product-modal")?.remove();

    });
  }

  function showLogMealModal(meal: any, facts: any) {

    document.getElementById("log-meal-modal")?.remove();
    let servings = 1;
    const perServing = facts.perServing;

    const modalHTML = `
        <div id="log-meal-modal" class="fixed inset-0 z-[100] bg-black/50 overflow-y-auto p-4">

              <div class="bg-white rounded-2xl w-full max-w-2xl p-6 md:p-9 mx-auto my-4 max-h-[calc(100vh-2rem)] overflow-y-auto">

                <!-- Header -->
                <div class="flex items-center gap-6 mb-10">

                    <img src="${meal.thumbnail}"
                        alt="${meal.name}"
                        class="w-20 h-20 rounded-2xl object-cover">

                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">
                            Log This Meal
                        </h2>

                        <p class="text-xl text-gray-500 mt-1">
                            ${meal.name}
                        </p>
                    </div>

                </div>

                <!-- Servings -->
                <div class="mb-10">

                    <h3 class="text-xl font-semibold text-gray-700 mb-4">
                        Number of Servings
                    </h3>

                    <div class="flex items-center gap-4">

                        <button id="decrease-servings"
                            class="w-16 h-16 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-3xl">
                            <i class="fa-solid fa-minus"></i>
                        </button>

                        <div id="servings-count"
                            class="w-32 h-16 border-2 border-gray-200 rounded-xl flex items-center justify-center text-3xl font-bold">
                            1
                        </div>

                        <button id="increase-servings"
                            class="w-16 h-16 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-3xl">
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>

                </div>

                <!-- Nutrition -->
                <div class="bg-emerald-50 rounded-2xl p-6 mb-10">

                    <h3 class="text-lg text-gray-600 mb-5">
                        Estimated nutrition per serving:
                    </h3>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                        <div>
                            <p id="log-calories"
                                class="text-3xl font-bold text-emerald-600">
                                ${Math.round(perServing.calories)}
                            </p>
                            <p class="text-gray-500 mt-1">Calories</p>
                        </div>

                        <div>
                            <p id="log-protein"
                                class="text-3xl font-bold text-blue-600">
                                ${Math.round(perServing.protein)}g
                            </p>
                            <p class="text-gray-500 mt-1">Protein</p>
                        </div>

                        <div>
                            <p id="log-carbs"
                                class="text-3xl font-bold text-orange-600">
                                ${Math.round(perServing.carbs)}g
                            </p>
                            <p class="text-gray-500 mt-1">Carbs</p>
                        </div>

                        <div>
                            <p id="log-fat"
                                class="text-3xl font-bold text-purple-600">
                                ${Math.round(perServing.fat)}g
                            </p>
                            <p class="text-gray-500 mt-1">Fat</p>
                        </div>

                    </div>

                </div>

                <!-- Buttons -->
                <div class="flex flex-row gap-4 mt-8">

                  <button id="cancel-log-meal"
                    class="flex-1 py-6 rounded-2xl bg-gray-100 text-gray-700 text-xl font-semibold hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>

                  <button id="confirm-log-meal"
                    class="flex-1 py-6 rounded-2xl bg-blue-600 text-white text-xl font-semibold hover:bg-blue-700 transition-colors">
                    <i class="fa-solid fa-clipboard-list mr-3"></i>
                    Log Meal
                  </button>

                </div>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    const modal = document.getElementById("log-meal-modal");
    const servingsCount = document.getElementById("servings-count");
    function updateNutrition() {

      if (servingsCount) {
        servingsCount.textContent = String(servings);
      }

      const calories = document.getElementById("log-calories");
      const protein = document.getElementById("log-protein");
      const carbs = document.getElementById("log-carbs");
      const fat = document.getElementById("log-fat");

      if (calories) {
        calories.textContent = String(Math.round(perServing.calories * servings));
      }

      if (protein) {
        protein.textContent = Math.round(perServing.protein * servings) + "g";
      }

      if (carbs) {
        carbs.textContent = Math.round(perServing.carbs * servings) + "g";
      }

      if (fat) {
        fat.textContent = Math.round(perServing.fat * servings) + "g";
      }
    }

    document.getElementById("increase-servings")?.addEventListener("click", () => {
      servings++;
      updateNutrition();

    });

    document.getElementById("decrease-servings")?.addEventListener("click", () => {
      if (servings > 1) {
        servings--;
        updateNutrition();
      }

    });

    document.getElementById("cancel-log-meal")?.addEventListener("click", () => {
      modal?.remove();
    });

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }

    });

    document.getElementById("confirm-log-meal")?.addEventListener("click", () => {
      const mealData: FoodLogEntry = {
        name: meal.name,
        date: "",
        time: "",
        calories: Math.round(perServing.calories * servings),
        protein: Math.round(perServing.protein * servings),
        fat: Math.round(perServing.fat * servings),
        carbs: Math.round(perServing.carbs * servings),
        type: "recipe",
        quantity: servings
      };

      saveFoodLog(mealData);
      modal?.remove();

    });

  }

  function saveFoodLog(entry: FoodLogEntry) {

    let foodLogs: FoodLogEntry[] = JSON.parse(localStorage.getItem("foodLog") || "[]");

    const now = new Date();
    entry.date = now.toLocaleDateString("en-CA");
    entry.time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });

    foodLogs.push(entry);
    localStorage.setItem("foodLog", JSON.stringify(foodLogs));
    // console.log("Food saved");
    // let logs = JSON.parse(localStorage.getItem("foodLog") || "[]");
    // console.log(logs);

    Swal.fire({
      icon: "success",
      title: "Saved Successfully!",
      text: "Your food has been added to your Food Log."
    });
  }

  function displayWeeklyOverview() {

    const container = document.getElementById("weekly-chart");

    if (!container) return;
    const foodLog = JSON.parse(localStorage.getItem("foodLog") || "[]");

    const today = new Date();
    let daysHTML = "";

    for (let i = 6; i >= 0; i--) {

      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short"
      });

      const dayNumber = date.getDate();
      const dailyFoods = foodLog.filter((food: any) => food.date === dateString);

      const totalCalories = dailyFoods.reduce(
        (total: number, food: any) => {
          return total + Number(food.calories || 0);
        },
        0
      );

      const isToday = i === 0;
      daysHTML += `
            <div class="weekly-day ${isToday ? "active" : ""}">

                <div class="day-name">
                    ${dayName}
                </div>

                <div class="day-number">
                    ${dayNumber}
                </div>

                <div class="day-calories ${totalCalories === 0 ? "zero" : ""}">
                    ${Math.round(totalCalories)}
                </div>

                <div class="day-kcal">
                    kcal
                </div>

                ${dailyFoods.length > 0
          ? `<div class="day-items">
                        ${dailyFoods.length} items
                       </div>`
          : ""
        }

            </div>
        `;
    }

    container.innerHTML = `
        <div class="weekly-overview w-full">

            <div class="weekly-days">
                ${daysHTML}
            </div>

        </div>
    `;
  }

  function displayTodayNutrition() {

    const container = document.getElementById("today-nutrition");
    if (!container) return;
    const foodLog = JSON.parse(localStorage.getItem("foodLog") || "[]");

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;

    const todayItems = foodLog.map((item: any, index: number) => ({
      ...item,
      originalIndex: index
    })).filter((item: any) => item.date === todayDate);

    const hasItems = todayItems.length > 0;
    const totals = todayItems.reduce(
      (total: any, item: any) => {

        total.calories += Number(item.calories) || 0;
        total.protein += Number(item.protein) || 0;
        total.carbs += Number(item.carbs) || 0;
        total.fat += Number(item.fat) || 0;

        return total;

      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    );

    const nutritionData = [
      {
        name: "Calories",
        value: Math.round(totals.calories),
        target: 2000,
        unit: "kcal",
        bg: "bg-emerald-50",
        bar: "bg-emerald-500"
      },
      {
        name: "Protein",
        value: Math.round(totals.protein),
        target: 50,
        unit: "g",
        bg: "bg-blue-50",
        bar: "bg-blue-500"
      },
      {
        name: "Carbs",
        value: Math.round(totals.carbs),
        target: 250,
        unit: "g",
        bg: "bg-amber-50",
        bar: "bg-amber-500"
      },
      {
        name: "Fat",
        value: Math.round(totals.fat),
        target: 65,
        unit: "g",
        bg: "bg-purple-50",
        bar: "bg-purple-500"
      }
    ];

    const nutritionHTML = nutritionData.map(item => {

      const percentage = Math.round((item.value / item.target) * 100);
      const progress = Math.min(percentage, 100);

      return `
            <div class="${item.bg} rounded-xl p-4">

                <div class="flex items-center justify-between mb-2">

                    <span class="text-sm font-semibold text-gray-700">
                        ${item.name}
                    </span>

                    <span class="text-sm text-gray-500">
                        ${item.value} / ${item.target} ${item.unit}
                    </span>

                </div>

                <div class="w-full bg-gray-200 rounded-full h-2.5">

                    <div
                        class="${item.bar} h-2.5 rounded-full transition-all duration-300"
                        style="width: ${progress}%">
                    </div>

                </div>

            </div>
        `;

    }).join("");

    const loggedItemsHTML = todayItems.map((item: any) => {

      const isRecipe = item.type === "recipe";
      return `

            <div class="bg-gray-50 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div class="flex items-center gap-4 min-w-0">

                    <div class="w-20 h-20 rounded-xl overflow-hidden bg-blue-100 flex items-center justify-center shrink-0">

                        ${item.image
          ? `
                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                    class="w-full h-full object-cover"
                                >
                            `
          : `
                                <i class="fa-solid fa-box text-blue-600 text-2xl"></i>
                            `
        }

                    </div>

                    <div class="min-w-0">

                        <h3 class="text-xl font-semibold text-gray-900">
                            ${item.name}
                        </h3>

                        <div class="flex flex-wrap items-center gap-3 text-gray-500 mt-1">

                            <span>
                                ${isRecipe
          ? `${item.quantity || 1} serving${Number(item.quantity || 1) > 1 ? "s" : ""}`
          : item.brand || ""
        }
                            </span>

                            <span>•</span>

                            <span class="${isRecipe ? "text-emerald-600" : "text-blue-600"}">
                                ${item.type}
                            </span>

                        </div>

                        <p class="text-gray-400 mt-1">
                            ${item.time || ""}
                        </p>

                    </div>

                </div>

                <!-- Nutrition + Delete -->
                <div class="flex flex-wrap items-center gap-3 md:gap-4">

                    <div class="flex flex-col items-center mr-2">

                        <strong class="text-2xl font-bold text-emerald-600">
                            ${Math.round(Number(item.calories) || 0)}
                        </strong>

                        <span class="text-gray-500">
                            kcal
                        </span>

                    </div>

                    <span class="bg-blue-50 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        ${Math.round(Number(item.protein) || 0)}g P
                    </span>

                    <span class="bg-amber-50 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        ${Math.round(Number(item.carbs) || 0)}g C
                    </span>

                    <span class="bg-purple-50 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        ${Math.round(Number(item.fat) || 0)}g F
                    </span>

                    <button
                        class="delete-log-btn text-gray-400 hover:text-red-500 text-xl transition"
                        data-delete-index="${item.originalIndex}"
                        title="Delete item">

                        <i class="fa-solid fa-trash-can"></i>

                    </button>

                </div>

            </div>

        `;

    }).join("");

    container.innerHTML = `

        <div class="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10">

            <!-- Nutrition Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                ${nutritionHTML}

            </div>

            <!-- Logged Items -->
            <div class="border-t border-gray-200 pt-4">

                <div class="flex items-center justify-between mb-3">

                    <h4 class="text-sm font-semibold text-gray-700">
                        Logged Items (${todayItems.length})
                    </h4>

                    <button
                        id="clear-foodlog"
                        class="text-red-500 hover:text-red-600 text-sm font-medium"
                        style="display: ${hasItems ? "block" : "none"}">

                        <i class="fa-solid fa-trash mr-1"></i>
                        Clear All

                    </button>

                </div>

                <div id="logged-items-list" class="space-y-2">

                    ${hasItems ? loggedItemsHTML : `

                        <div class="text-center py-8 text-gray-500">

                            <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>

                            <p class="font-medium">
                                No meals logged today
                            </p>

                            <p class="text-sm">
                                Add meals from the Meals page or scan products
                            </p>

                        </div>

                    `}

                </div>

            </div>

        </div>

    `;

    container.onclick = (event: MouseEvent) => {

      const target = event.target as HTMLElement;
      const deleteBtn = target.closest(".delete-log-btn") as HTMLElement | null;
      if (deleteBtn) {

        const index = Number(deleteBtn.dataset.deleteIndex);
        deleteLoggedItem(index);
        return;
      }

      if (target.closest("#clear-foodlog")) {
        Swal.fire({

          title: "Clear All?",
          text: "All today's logged items will be deleted.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete all",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#ef4444"

        }).then((result: any) => {

          if (result.isConfirmed) {

            const currentLog = JSON.parse(localStorage.getItem("foodLog") || "[]");
            const remainingLog = currentLog.filter((item: any) => item.date !== todayDate);
            localStorage.setItem("foodLog", JSON.stringify(remainingLog));

            displayTodayNutrition();
            displayWeeklyOverview();

            Swal.fire({
              title: "Cleared!",
              text: "Today's food log has been cleared.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });

          }

        });

      }

    };

  }

  function deleteLoggedItem(index: number) {

    const foodLog = JSON.parse(localStorage.getItem("foodLog") || "[]");

    Swal.fire({
      title: "Delete Item?",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444"
    }).then((result: any) => {

      if (result.isConfirmed) {

        if (index < 0 || index >= foodLog.length) return;

        foodLog.splice(index, 1);
        localStorage.setItem("foodLog", JSON.stringify(foodLog));
        displayTodayNutrition();
        displayWeeklyOverview();

        Swal.fire({
          title: "Deleted!",
          text: "Item deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });

      }

    });

  }




})()