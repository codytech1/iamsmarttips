/* =========================
   SMOOTH SCROLL LINKS
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e){

    const target =
    document.querySelector(this.getAttribute("href"));

    if(target){

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar =
document.querySelector(".navbar");

if(navbar){

  window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

      navbar.classList.add("scrolled");

    }else{

      navbar.classList.remove("scrolled");

    }

  });

}

/* =========================
   ACTIVE NAV LINKS
========================= */

const links =
document.querySelectorAll(".nav-links a, .mobile-links a");

const currentPage =
window.location.pathname.split("/").pop();

links.forEach(link => {

  const linkPage =
  link.getAttribute("href");

  if(
    linkPage === currentPage ||
    (currentPage === "" &&
     linkPage === "index.html")
  ){

    link.classList.add("active");

  }

});

/* =========================
   FEATURED VIDEO SCROLLER
========================= */

const scrollContainer =
document.querySelector(".video-scroll");

if(scrollContainer){

  const rightArrow =
  document.querySelector(".arrow.right");

  const leftArrow =
  document.querySelector(".arrow.left");

  if(rightArrow){

    rightArrow.addEventListener("click", () => {

      scrollContainer.scrollBy({
        left: 400,
        behavior: "smooth"
      });

    });

  }

  if(leftArrow){

    leftArrow.addEventListener("click", () => {

      scrollContainer.scrollBy({
        left: -400,
        behavior: "smooth"
      });

    });

  }

  scrollContainer.innerHTML +=
  scrollContainer.innerHTML;

  let speed = 0.4;
  let isHovering = false;

  scrollContainer.addEventListener(
    "mouseenter",
    () => isHovering = true
  );

  scrollContainer.addEventListener(
    "mouseleave",
    () => isHovering = false
  );

  function infiniteScroll(){

    if(!isHovering){

      scrollContainer.scrollLeft += speed;

    }

    if(
      scrollContainer.scrollLeft >=
      scrollContainer.scrollWidth / 2
    ){

      scrollContainer.scrollLeft = 0;

    }

    requestAnimationFrame(
      infiniteScroll
    );

  }

  infiniteScroll();

}

/* =========================
   TYPEWRITER HEADLINE
========================= */

const headline =
document.getElementById(
  "rotating-headline"
);

if(headline){

const phrases = [

  "I help brands turn attention into influence.",

  "I create content that drives trust and action.",

  "I connect tech brands with engaged audiences."

];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeWriter(){

    const currentPhrase =
    phrases[phraseIndex];

    if(!deleting){

      headline.textContent =
      currentPhrase.substring(
        0,
        charIndex + 1
      );

      charIndex++;

      if(
        charIndex ===
        currentPhrase.length
      ){

        deleting = true;

        setTimeout(
          typeWriter,
          1500
        );

        return;

      }

    }else{

      headline.textContent =
      currentPhrase.substring(
        0,
        charIndex - 1
      );

      charIndex--;

      if(charIndex === 0){

        deleting = false;

        phraseIndex =
        (phraseIndex + 1) %
        phrases.length;

      }

    }

    setTimeout(
      typeWriter,
      deleting ? 40 : 70
    );

  }

  typeWriter();

}

const menuToggle =
document.querySelector(".menu-toggle");

const mobileMenu =
document.querySelector(".mobile-menu");

const mobileOverlay =
document.querySelector(".mobile-overlay");

const closeMenu =
document.querySelector(".close-menu");

if(menuToggle){

  menuToggle.addEventListener("click", () => {

    mobileMenu.classList.add("active");

    mobileOverlay.classList.add("active");

  });

}

if(closeMenu){

  closeMenu.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    mobileOverlay.classList.remove("active");

  });

}

if(mobileOverlay){

  mobileOverlay.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    mobileOverlay.classList.remove("active");

  });

}

menuToggle.addEventListener("click", () => {

  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");

  document.body.style.overflow = "hidden";

});

closeMenu.addEventListener("click", () => {

  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");

  document.body.style.overflow = "";

});

mobileOverlay.addEventListener("click", () => {

  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");

  document.body.style.overflow = "";

});