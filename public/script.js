
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
const submit =document.querySelector('#submit');

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

submit.addEventListener('click',(e)=>{
  e.preventDefault();
 const data={
   name:document.querySelector('#data-name').value,
   rangeFrom:document.querySelector('#data-range-from').value,
   rangeTo:document.querySelector('#data-range-to').value,
   cuisine:document.querySelector('#data-cuisine').value,
   meal:document.querySelector('#data-meal').value,
   dish:document.querySelector('#data-dish').value,
   calFrom:document.querySelector('#data-calories-from').value,
   calTo:document.querySelector('#data-calories-to').value,
   prepFrom:document.querySelector('#data-prep-from').value,
   prepTo:document.querySelector('#data-prep-to').value,
 }
 url='/submit';
 postData(url,data);
})


function postData(url,data ) {
  fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data:data})
  }).then(res=>res.json())
    .then(res => console.log(res));
}

