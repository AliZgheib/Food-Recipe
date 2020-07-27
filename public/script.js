const learn = document.querySelector("#learn");
//divs
const carousel = document.querySelector("#about");
const searchdiv = document.querySelector("#search");

//btns
const searchbtn1 = document.querySelector("#search1");

learn.addEventListener("click", (e) => {
  e.preventDefault();
  carousel.scrollIntoView({ behavior: "smooth" });
});
//form
const submit = document.querySelector("#submit");

//results

const resultsdiv = document.querySelector(".results");

searchbtn1.addEventListener("click", (e) => {
  e.preventDefault();
  searchdiv.scrollIntoView({ behavior: "smooth" });
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    name: document.querySelector("#data-name").value,
    rangeFrom: document.querySelector("#data-range-from").value,
    rangeTo: document.querySelector("#data-range-to").value,
    cuisine: document.querySelector("#data-cuisine").value,
    meal: document.querySelector("#data-meal").value,
    dish: document.querySelector("#data-dish").value,
    calFrom: document.querySelector("#data-calories-from").value,
    calTo: document.querySelector("#data-calories-to").value,
    prepFrom: document.querySelector("#data-prep-from").value,
    prepTo: document.querySelector("#data-prep-to").value,
  };
  url = "/submit";
  postData(url, data);
});

function postData(url, data) {
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      renderData(res);
    });
}
function renderData(data) {
  const results = data.data.hits;
  let meals = [];

  results.forEach((result) => meals.push(result.recipe));
  console.log(meals);

  resultsdiv.innerHTML += "<h1>List of available recipes: </h1>";

  const mealsdiv = document.createElement("div");
  mealsdiv.classList.add("meals");

  meals.forEach((meal) => {
    const mealdiv = document.createElement("div");
    mealdiv.classList.add("meal");

    mealdiv.innerHTML = `
    <h3>${meal.label}</h3>
    <img src="${meal.image}">
    <button class="btn btn-primary">Read More</button>
    `;
    console.log(mealdiv);
    mealsdiv.appendChild(mealdiv);
  });

  resultsdiv.appendChild(mealsdiv);
}
