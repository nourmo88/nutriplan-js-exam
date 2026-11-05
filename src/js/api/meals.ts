
export async function displayMeals() {
    let meals = await fetch("https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25");
    let response = await meals.json();
    let results = response.results;

    return results;
}

export async function getArea() {
    let meals = await fetch("https://nutriplan-api.vercel.app/api/meals/areas");
    let response = await meals.json();
    let results = response.results;

    return results;
}

export async function getCategory() {
    let cat = await fetch("https://nutriplan-api.vercel.app/api/meals/categories");
    let response = await cat.json();
    let results = response.results;

    return results;
}

export async function forSearch(input: string) {
    let oneApi = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${input}&page=1&limit=25`);
    let jsonOne = await oneApi.json();
    let one = jsonOne.results;

    let secApi = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${input}&page=1&limit=25`);
    let jsonTwo = await secApi.json();
    let two = jsonTwo.results;


    if (one.length !== 0) {
        return one;
    }
    else if (two.length !== 0) {
        return two;
    }

}

export async function FilterProduct(input: string) {
    let APi = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${input}&page=1&limit=24`);
    let response = await APi.json();
    let result = response.results;
    return result;
}

export async function FilterbarProduct(input: string) {
    let APi = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${input}`);
    let response = await APi.json();
    let result = response.results;
    //console.log(response);
    return [response.result];
}