const scrollTop = document.querySelector(".scroll-top a");

window.addEventListener("scroll", toggleScrollTop);

function toggleScrollTop() {
  if (window.pageYOffset >= 200) {
    scrollTop.style.opacity = 1;
  } else {
    scrollTop.style.opacity = 0;
  }
}
