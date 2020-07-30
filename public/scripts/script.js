document.addEventListener("DOMContentLoaded", () => {
  const learn = document.querySelector("#learn");
  //divs
  const carousel = document.querySelector("#about");

  //btns
  const searchbtn1 = document.querySelector("#search1");

  learn.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.scrollIntoView({ behavior: "smooth" });
  });

  searchbtn1.addEventListener("click", (e) => {
    window.location.href = "/app";
  });
});
