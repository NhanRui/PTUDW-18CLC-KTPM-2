const categories = document.querySelector(".direction");
var sec = document.querySelectorAll('section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      let intro_Image = document.querySelector(".intro-img");
      let right_Container = document.querySelector(".right-container");
      if (entry.isIntersecting === false) {
        $('.categories').addClass('stick');
        intro_Image.classList.add("m-fadeOut");
        intro_Image.classList.remove("m-fadeIn");
        right_Container.classList.remove("appear");
        right_Container.classList.add("disappear");
      } else {
        $('.categories').removeClass('stick');
        intro_Image.classList.add("m-fadeIn");
        intro_Image.classList.remove("m-fadeOut");
        right_Container.classList.remove("disappear");
        right_Container.classList.add("appear");
      }
    });
  },
  { threshold: [1] }
);

observer.observe(categories);

const course_Intro_Container = document.querySelector('.course-intro-container');

const observer_next = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting === false) {
        $(".right-container").fadeOut();
      }
      else {
        $(".right-container").fadeIn();
      }
    });
  },
  { threshold: [0] }
);

observer_next.observe(course_Intro_Container);


$(".lessons").slideUp();

$(".chapter").on("click", function () {
  if ($(this).find("i").hasClass("fa-angle-down")) {
    $(this).css('border-bottom', 'none');
    $(this).siblings(".lessons").slideDown();
    $(this).find("i").removeClass("fa-angle-down");
    $(this).find("i").addClass("fa-angle-up");
  } else {
    $(this).css('border-bottom', '1px solid #dedfe0');
    $(this).siblings(".lessons").slideUp();
    $(this).find("i").addClass("fa-angle-down");
    $(this).find("i").removeClass("fa-angle-up");
  }
});
