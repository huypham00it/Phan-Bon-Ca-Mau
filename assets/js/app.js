const menuToggle = $(".menu__toggle");
const menu = $(".menu");
var statusJoin = false;

//giffs
const gifts = [
  {
    name: "Samsung Galaxy A015F",
    image: "/assets/images/Galaxy-A03.png",
    min: 0,
    max: 60,
  },
  {
    name: "Pin dự phòng",
    image: "/assets/images/vqmm-prize-battery.png",
    min: 61,
    max: 120,
  },
  {
    name: "Mũ tai bèo",
    image: "/assets/images/hat.png",
    min: 121,
    max: 180,
  },
  {
    name: "Áo thun",
    image: "/assets/images/PoloTShirt.png",
    min: 301,
    max: 360,
  },
  {
    name: "Mũ bảo hiểm",
    image: "/assets/images/Helmet.png",
    min: 241,
    max: 300,
  },
  {
    name: "CHÚC BẠN MAY MẮN LẦN SAU",
    image: false,
    min: 181,
    max: 240,
  },
];

//active menu item
$(".menu-item").on("click", function () {
  $(".menu-item").each(function (item) {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
  menu.removeClass("menu--active");
});

var isScrolling;

//active menu item on scroll
const sections = document.querySelectorAll("section");
const menuItem = document.querySelectorAll(".menu-item");
window.addEventListener(
  "scroll",
  () => {
    let current = "";

    //Fixed navigation
    var sticky = $(".sticky"),
      scroll = $(window).scrollTop();

    if (scroll >= 80) sticky.addClass("fixed");
    else sticky.removeClass("fixed");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(function () {
      menuItem.forEach((item) => {
        item.classList.remove("active");
        if (item.classList.contains(current)) {
          item.classList.add("active");
        }
      });
    }, 0);
  },
  false
);

//Toggle menu
menuToggle.on("click", function () {
  menu.toggleClass("menu--active");
});

//carousel
$(document).ready(function () {
  $(".exp-list").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  $(".live-image__list ").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});

//captcha
const caps = document.querySelectorAll(".cap");
const cap2s = document.querySelectorAll(".caps");
let allCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function getCaptcha() {
  for (let i = 0; i < 3; i++) {
    let randomCharacter =
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
    caps[i].innerText = `${randomCharacter}`;
  }
}
function getCaptcha2() {
  for (let i = 0; i < 3; i++) {
    let randomCharacter =
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
    cap2s[i].innerText = `${randomCharacter}`;
  }
}
getCaptcha();
getCaptcha2();

//modal close
$(".post-close").on("click", modalClose);
$(".success-close").on("click", modalClose);
$(".failed-close").on("click", modalClose);
$(".modal-container").on("click", modalClose);
$(".guide-close").on("click", modalClose);
$(".modal-inner").on("click", function (e) {
  e.stopPropagation();
});

function modalClose() {
  const modalInner = $(".modal-inner");
  $(".modal-container").removeClass("active");
  $(".modal-inner").removeClass(modalInner.attr("class").split(" ")[1]);
}

//open modal
$(document).ready(function () {
  $(".blog-more .icon").each(function (item) {
    $(this).on("click", function (e) {
      e.preventDefault();
      modalOpen();
      $(".modal-inner").addClass("post");
    });
  });

  $(".guide-modal").on("click", function (e) {
    e.preventDefault();
    modalOpen();
    $(".modal-inner").addClass("guide");
  });
});

function modalOpen() {
  $(".modal-container").addClass("active");
}

//spinner wheel e
let wheel = document.querySelector(".wheel-auto");
let btn = document.querySelector(".arrow");
let number = Math.ceil(Math.random() * 1000) + 1000;
var giftIndex = 0;
btn.onclick = function () {
  if (statusJoin) {
    wheel.style.transform = "rotate(" + number + "deg)";
    let period = number % 360;
    gifts.forEach(function (gift, index) {
      if (period < gift.max && period > gift.min) {
        giftIndex = index;
      }
    });
    setTimeout(function () {
      modalOpen();
      if (gifts[giftIndex].image) {
        $(".modal-inner").addClass("success");
        $(".giftName").text(gifts[giftIndex].name);
        $(".giftImage").attr("src", gifts[giftIndex].image);
      } else {
        $(".modal-inner").addClass("failed");
      }
    }, 5200);
    number += Math.ceil(Math.random() * 1000) + 1000;
  } else {
    alert("Vui lòng điền thông tin tham gia");
    $("#name").focus();
  }
};

//check captcha
$(".join-btn").on("click", function (e) {
  if (checkInputValue()) {
    let rs =
      parseInt($(".cap1").text()) +
      parseInt($(".cap2").text() + $(".cap3").text());
    let inputVal = $("#captcha").val();
    if (inputVal == "") {
      $(".status-captcha").addClass("show");
      $(".status-captcha").text("Vui lòng nhập captcha");
      $("#captcha").focus();
    } else {
      $(".status-captcha").removeClass("show");

      if (inputVal == rs) {
        $(".status-captcha").removeClass("show");
        alert("Đã tham gia");
        statusJoin = true;
      } else {
        $(".status-captcha").addClass("show");
        $(".status-captcha").text("Captcha không đúng");
        $("#captcha").focus();
        $("#captcha").val("");
        getCaptcha();
      }
    }
  } else {
    alert("Vui lòng điền đầy đủ thông tin");
    $("#name").focus();
  }

  e.preventDefault();
});

$(".contact-btn").on("click", function (e) {
  let rs =
    parseInt($(".capa").text()) +
    parseInt($(".capb").text() + $(".capc").text());
  let inputVal = $("#captcha2").val();
  if (inputVal == "") {
    $(".status-captcha2").addClass("show");
    $(".status-captcha2").text("Vui lòng nhập captcha");
    $("#captcha2").focus();
  } else {
    $(".status-captcha2").removeClass("show");

    if (inputVal == rs) {
      $(".status-captcha2").removeClass("show");
      alert("Thành công!");
    } else {
      $(".status-captcha2").addClass("show");
      $(".status-captcha2").text("Captcha không đúng");
      $("#captcha2").focus();
      $("#captcha2").val("");
      getCaptcha2();
    }
  }

  e.preventDefault();
});

//check inputValue
function checkInputValue() {
  let name = $("#name").val();
  let phone = $("#phone").val();
  if (name == "" || phone == "") {
    return false;
  }
  return true;
}
