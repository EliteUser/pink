var navButton = document.querySelector(".main-navigation__toggle");
var navBox = document.querySelector(".main-navigation__box");
var navList = document.querySelector(".main-navigation__list");

document.querySelector("html").classList.remove("nojs");
navBox.classList.remove("main-navigation__box--active");
navList.classList.remove("main-navigation__list--show");

var form = document.querySelector("#competitionForm");
if (form) {
  var formBtn = form.querySelector(".form__button");
  var requiredFields = [];
  for (var i = 0; i < form.elements.length; i++) {
    requiredFields[i] = form.elements[i];
  }

  requiredFields = requiredFields.filter(function (field) {
    return field.hasAttribute("required");
  });
}

var modalOk = document.querySelector(".modal--success");
var modalOkBtn = document.querySelector("#modal-ok-close");

var modalError = document.querySelector(".modal--error");
var modalErrorBtn = document.querySelector("#modal-error-close");

var ymaps;

var reviewsSlider = document.querySelector("#reviews-slider");
var subscribeSlider = document.querySelector("#subscribe-slider");

navButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  navButton.classList.toggle("main-navigation__toggle--active");
  navBox.classList.toggle("main-navigation__box--active");
  navList.classList.toggle("main-navigation__list--show");
});

if (ymaps) {
  ymaps.ready(init);

  function init() {
    var mapContainer = document.querySelector("#mapContainer");
    mapContainer.classList.add("contacts__wrapper--js");

    var myMap = new ymaps.Map("map", {
      center: [59.93680432, 30.32119082],
      zoom: 16
    });

    var myPlacemark = new ymaps.Placemark([59.93639525, 30.32117603], {
        hintContent: "Pink",
        balloonContent: "Pink - приложение, которое перевернет ваш мир!"
      }, {
        iconLayout: "default#image",
        iconImageHref: "img/map-marker-icon.svg",
        iconImageSize: [36, 36],
        iconImageOffset: [-18, -18]
      }
    );

    myMap.geoObjects.add(myPlacemark);
  }
}
if (form) {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    modalOk.classList.add("modal--show");
  });

  formBtn.addEventListener("click", function (evt) {
    var valid = true;
    for (var i = 0; i < requiredFields.length; i++) {
      requiredFields[i].classList.remove("textfield__input--invalid");

      if (!requiredFields[i].validity.valid) {
        requiredFields[i].classList.add("textfield__input--invalid");
        valid = false;
      }
    }

    if (!valid) {
      modalError.classList.add("modal--show");
    }
  });
}

if (modalOk || modalError) {
  modalOkBtn.addEventListener("click", function () {
    modalOk.classList.remove("modal--show");
  });

  modalErrorBtn.addEventListener("click", function () {
    modalError.classList.remove("modal--show");
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      modalOk.classList.remove("modal--show");
      modalError.classList.remove("modal--show");
    }
  });
}

function slider(slider) {
  if (slider) {
    var sliderSlides = slider.querySelectorAll(".slider__item");
    var sliderControls = slider.querySelectorAll(".slider__control");
    var sliderToggles = slider.querySelectorAll(".slider__toggle");
    var currentSlide = 0;

    for (var i = 0; i < sliderControls.length; i++) {
      clickControl(sliderControls[i], sliderSlides[i]);
      sliderControls[i].setAttribute("data-num", i);
    }

    function clickControl(control, slide) {
      control.addEventListener("click", function () {
        toggleSlide(control, slide);
      });
    }

    function toggleSlide(control, slide) {
      for (var i = 0; i < sliderControls.length; i++) {
        sliderControls[i].classList.remove("slider__control--active");
        sliderSlides[i].classList.remove("slider__item--active");
      }

      currentSlide = +control.dataset.num;
      control.classList.add("slider__control--active");
      slide.classList.add("slider__item--active");
    }

    for (var i = 0; i < sliderToggles.length; i++) {
      sliderToggles[i].addEventListener("click", function (evt) {
        swipeControl(evt.target);
      });
    }

    function swipeControl(control) {
      if (control.classList.contains("slider__toggle--prev")) {
        currentSlide--;

        if (currentSlide < 0) {
          currentSlide = sliderControls.length - 1;
        }

        toggleSlide(sliderControls[currentSlide], sliderSlides[currentSlide]);
      }

      if (control.classList.contains("slider__toggle--next")) {
        currentSlide++;

        if (currentSlide > sliderControls.length - 1) {
          currentSlide = 0;
        }

        toggleSlide(sliderControls[currentSlide], sliderSlides[currentSlide]);
      }
    }
  }
}

slider(reviewsSlider);
slider(subscribeSlider);

