window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

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


/* ======================================
   RESOURCE PAGINATION
====================================== */

const resourcePages =
    document.querySelectorAll(".resource-page");

const pageButtons =
    document.querySelectorAll(".pagination .page-btn:not(.prev):not(.next)");

const prevButton =
    document.querySelector(".pagination .prev");

const nextButton =
    document.querySelector(".pagination .next");

if(resourcePages.length){

    let currentPage = 0;

    function updatePagination(index){

        resourcePages.forEach(page=>{

            page.classList.remove("active");

        });

        pageButtons.forEach(button=>{

            button.classList.remove("active");

        });

        resourcePages[index].classList.add("active");

        pageButtons[index].classList.add("active");

        prevButton.disabled = index===0;

        nextButton.disabled =
            index===resourcePages.length-1;

        currentPage=index;

    }

    pageButtons.forEach((button,index)=>{

        button.addEventListener("click",()=>{

            updatePagination(index);

        });

    });

    prevButton.addEventListener("click",()=>{

        if(currentPage>0){

            updatePagination(currentPage-1);

        }

    });

    nextButton.addEventListener("click",()=>{

        if(currentPage<resourcePages.length-1){

            updatePagination(currentPage+1);

        }

    });

    updatePagination(0);

}

const searchInput =
document.getElementById("resourceSearch");

const searchResults =
document.getElementById("searchResults");

const pages =
document.querySelectorAll(".resource-page");

const pagination =
document.querySelector(".pagination");

const resources =
document.querySelectorAll(".resource-item");

if(searchInput){

    searchInput.addEventListener("input",()=>{

        const keyword =
        searchInput.value
        .trim()
        .toLowerCase();

        searchResults.innerHTML="";

      if (keyword === "") {

          // Clear previous search results
          searchResults.innerHTML = "";

          // Hide the search results container
          searchResults.classList.remove("active");
          searchResults.style.display = "none";

          // Show the current pagination page again
          pages.forEach((page, index) => {

              page.style.display =
                  index === currentPage ? "block" : "none";

          });

          // Bring back pagination
          pagination.style.display = "flex";

          return;

      }

        let matches=[];

        resources.forEach((item,index)=>{

            const text=
            item.dataset.search.toLowerCase();

            if(text.includes(keyword)){

                matches.push(item);

            }

        });

        pages.forEach(page=>{

            page.style.display="none";

        });

        pagination.style.display="none";

        searchResults.style.display = "block";
        searchResults.classList.add("active");

        if(matches.length===0){

            searchResults.innerHTML=`

            <div class="no-results">

                <h3>No resources found</h3>

                <p>
                Try another keyword.
                </p>

            </div>

            `;

            return;

        }

        matches.forEach(item=>{

            const clone=
            item.cloneNode(true);

            searchResults.appendChild(clone);

        });

    });

}
