
export function getHome(): string {
  return `
    <header id="header" class="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 flex-1">
            <button id="header-menu-btn" aria-label="Toggle menu">
              <i class="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Meals & Recipes
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                Discover delicious and nutritious recipes tailored for you
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="search-filters-section" class="px-8 py-6 bg-white border-b border-gray-200">
      <div class="mx-auto">
        <div class="mb-6">
          <div class="relative w-full">
            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input id="search-input" type="text" placeholder="Search recipes by name, ingredient, or cuisine..."
              class="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm" />
          </div>
        </div>

        <div class="flex items-center gap-3 overflow-x-auto pb-2" id="Area">
          <button
            class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
            Loading...
        </div>
      </div>
    </section>

    <section id="meal-categories-section" class="px-8 py-6 bg-white">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-900">
              Browse by Meal Type
            </h2>
            <p class="text-xs text-gray-500 mt-0.5">
              Find the perfect recipe for any time of day
            </p>
          </div>
          <button class="text-emerald-600 font-medium text-sm hover:text-emerald-700 flex items-center gap-1">
            View All <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

        <div id="categories-grid" class="grid grid-cols-6 gap-3">
          <!-- Categories will be loaded here by JavaScript -->
          
        </div>
      </div>
    </section>
     <section id="all-recipes-section" class="px-8 py-8 bg-gray-50">
      <div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">All Recipes</h2>
            <p id="recipes-count" class="text-sm text-gray-600 mt-1">
              Showing 25 recipes
            </p>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex bg-gray-200 rounded-lg p-1" id="view-toggle">
              <button id="grid-view-btn" class="px-3 py-1.5 bg-white rounded-md shadow-sm" title="Grid View">
                <i class="fa-solid fa-table-cells text-gray-700"></i>
              </button>
              <button id="list-view-btn" class="px-3 py-1.5" title="List View">
                <i class="fa-solid fa-list text-gray-500"></i>
              </button>
            </div>
          </div>
        </div>

        <div id="recipes-grid" class="grid grid-cols-4 gap-5">
          <!-- Recipes will be loaded here by JavaScript -->
          <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-meal-id="52772">
            <div class="relative h-48 overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="Teriyaki Chicken Casserole"
                loading="lazy" />
              <div class="absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  Chicken
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  Japanese
                </span>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                Teriyaki Chicken Casserole
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                Delicious recipe to try!
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                  Chicken
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  Japanese
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

export function getProduct(): string {
  return `
    <header id="header" class="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 flex-1">
            <button id="header-menu-btn" aria-label="Toggle menu">
              <i class="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Product Scanner
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                Search packaged foods by name or barcode
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section id="products-section" class="px-8 py-8 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-6 text-white">
          <h2 class="text-2xl font-bold mb-2">
            <i class="fa-solid fa-barcode mr-2"></i>
            Product Search & Barcode Scanner
          </h2>
          <p class="opacity-90 mb-4">
            Search for packaged food products to view nutrition information
          </p>

          <div class="flex gap-3">
            <div class="flex-1 relative">
              <input type="text" id="product-search-input" 
                placeholder="Search by product name (e.g., Cheerios, Nutella, Coca-Cola...)"
                class="w-full px-5 py-3.5 pr-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <i class="fa-solid fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <button id="search-product-btn" 
              class="px-6 py-3.5 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Search
            </button>
          </div>

          <div class="flex items-center gap-4 mt-4">
            <div class="flex-1 h-px bg-white/30"></div>
            <span class="text-sm opacity-80">or</span>
            <div class="flex-1 h-px bg-white/30"></div>
          </div>

          <div class="mt-4 flex gap-3">
            <div class="flex-1 relative">
              <input type="text" id="barcode-input" placeholder="Enter barcode number (e.g., 7613034626844)"
                class="w-full px-5 py-3.5 pr-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <i class="fa-solid fa-barcode absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <button id="lookup-barcode-btn"
              class="px-6 py-3.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all">
              <i class="fa-solid fa-search mr-2"></i>Lookup
            </button>
          </div>
        </div>

        <div class="flex items-center gap-4 mb-6">
          <span class="text-sm font-medium text-gray-700">Filter by Nutri-Score:</span>
          <div class="flex gap-2">
            <button onclick="FilterbyGroub('all')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-emerald-600 text-white"
              data-grade="">
              All
            </button>
            <button onclick="FilterbyGroub('a')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-green-100 text-green-700 hover:bg-green-200"
              data-grade="a">
              A
            </button>
            <button onclick="FilterbyGroub('b')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-lime-100 text-lime-700 hover:bg-lime-200"
              data-grade="b">
              B
            </button>
            <button onclick="FilterbyGroub('c')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              data-grade="c">
              C
            </button>
            <button onclick="FilterbyGroub('d')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-orange-100 text-orange-700 hover:bg-orange-200"
              data-grade="d">
              D
            </button>
            <button onclick="FilterbyGroub('e')"
              class="nutri-score-filter px-4 py-2 rounded-lg text-sm font-bold transition-all bg-red-100 text-red-700 hover:bg-red-200"
              data-grade="e">
              E
            </button>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            Browse by Category
          </h3>
          <div class="flex gap-3 overflow-x-auto pb-2" id="product-categories">
            <button 
              class="product-category-btn px-4 py-2 bg-red-500 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
              <i class="fa-solid fa-cookie mr-1.5"></i>Loading...
            </button>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Search Results</h3>
            <p id="products-count" class="text-sm text-gray-600">
              Search for products to see results
            </p>
          </div>

          <div id="products-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            
           <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500 text-lg">No products to display Search for a product or browse by category</p>
        </div>
          </div>
        </div>
      </div>
    </section>`;

}

export function getLog(): string {
  return `
    <header id="header" class="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div class="px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4 flex-1">
            <button id="header-menu-btn" aria-label="Toggle menu">
              <i class="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Food Log
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                Track your daily nutrition and food intake
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section id="foodlog-section" class="px-8 py-8 bg-gray-50 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">
                <i class="fa-solid fa-clipboard-list mr-2"></i>
                Daily Food Log
              </h2>
              <p class="opacity-90">
                Track and monitor your daily nutrition intake
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm opacity-80">Today</p>
              <p class="text-xl font-bold" id="foodlog-date">
                Tuesday, Jan 14
              </p>
            </div>
          </div>
        </div>

        <div id="foodlog-today-section" class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
            Today's Nutrition
          </h3>
          <div id="today-nutrition">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-emerald-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Calories</span>
                <span class="text-sm text-gray-500">0 / 2000 kcal</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="bg-blue-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Protein</span>
                <span class="text-sm text-gray-500">0 / 50 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="bg-amber-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Carbs</span>
                <span class="text-sm text-gray-500">0 / 250 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-amber-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="bg-purple-50 rounded-xl p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-700">Fat</span>
                <span class="text-sm text-gray-500">0 / 65 g</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-purple-500 h-2.5 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-700">
                Logged Items (0)
              </h4>
              <button id="clear-foodlog" class="text-red-500 hover:text-red-600 text-sm font-medium"
                style="display: none">
                <i class="fa-solid fa-trash mr-1"></i>Clear All
              </button>
            </div>

            <div id="logged-items-list" class="space-y-2">
              <div class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">
                  Add meals from the Meals page or scan products
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            <i class="fa-solid fa-calendar-week text-indigo-500 mr-2"></i>
            Weekly Overview
          </h3>

          <div id="weekly-chart" class="h-64 rounded-xl flex items-center justify-center">
            <div class="text-center text-gray-400">
              <i class="fa-solid fa-chart-line text-4xl mb-2"></i>
              <p>Weekly nutrition chart will appear here</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button id="toRecipe"
            class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-emerald-500 transition-all text-left flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <i class="fa-solid fa-plus text-emerald-600 text-xl"></i>
            </div>
            <div>
              <p class="font-semibold text-gray-900">Log a Meal</p>
              <p class="text-sm text-gray-500">Add from recipes</p>
            </div>
          </button>

          <button id="toScan"
            class="quick-log-btn bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-teal-500 transition-all text-left flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <i class="fa-solid fa-barcode text-teal-600 text-xl"></i>
            </div>
            <div>
              <p class="font-semibold text-gray-900">Scan Product</p>
              <p class="text-sm text-gray-500">Use barcode scanner</p>
            </div>
          </button>

        </div>
      </div>
    </section>`;
}
