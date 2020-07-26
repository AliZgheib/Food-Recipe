const ID = "aad58e5f";
//const Key = "66231ac7a7b0cabb5a9f0a06c8afc36d";
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

searchbtn1.addEventListener("click", (e) => {
  e.preventDefault();
  searchdiv.scrollIntoView({ behavior: "smooth" });
});
/*fetch(`https://api.edamam.com/search?q=chicken&app_id=${ID}&app_key=${Key}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => console.log(data));
*/
