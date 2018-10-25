var navButton = document.querySelector(".main-navigation__toggle");
var navBox = document.querySelector(".main-navigation__box");
var navList = document.querySelector(".main-navigation__list");

document.querySelector("html").classList.remove("nojs");
navBox.classList.remove("main-navigation__box--active");
navList.classList.remove("main-navigation__list--show");

navButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  navButton.classList.toggle("main-navigation__toggle--active");
  navBox.classList.toggle("main-navigation__box--active");
  navList.classList.toggle("main-navigation__list--show");
});
