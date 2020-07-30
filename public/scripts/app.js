document.addEventListener("DOMContentLoaded", () => {
  //form
  const submit = document.querySelector("#submit");

  //results

  const resultsdiv = document.querySelector(".results");

  //alert
  const alert = document.querySelector("#alert");
  const alertp = document.querySelector("#alertp");
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

    if (data.name == "") {
      alert.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Warning!</strong> Dish name field is required.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      return;
    }

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

        alert.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Recipes search is complete.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
          </div>`;
      });
  }
  function renderData(data) {
    const results = data.data.hits;
    let meals = [];

    results.forEach((result) => meals.push(result.recipe));
    console.log(meals);
    resultsdiv.innerHTML = "";
    resultsdiv.innerHTML += "<h1>List of available recipes: </h1>";

    const mealsdiv = document.createElement("div");
    mealsdiv.classList.add("meals");

    meals.forEach((meal) => {
      const mealdiv = document.createElement("div");
      mealdiv.classList.add("meal");
      let uri = meal.uri.split("#");
      let id = uri[1];
      mealdiv.innerHTML = `
          <h3>${meal.label}</h3>
          <img src="${meal.image}">
          <a class="btn btn-primary" target="_blank" href="/recipe/${id}">Read More</a>
          `;

      console.log(mealdiv);
      mealsdiv.appendChild(mealdiv);
    });

    resultsdiv.appendChild(mealsdiv);
  }
});
