/* ================================
   BRAND GALLERY SLIDER
================================ */

const galleryTrack = document.querySelector(".gallery-track");
const gallerySlides = document.querySelectorAll(".gallery-slide");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryDotsContainer = document.querySelector(".gallery-dots");

if (
   galleryTrack &&
   gallerySlides.length &&
   galleryPrev &&
   galleryNext &&
   galleryDotsContainer
) {
   let currentGalleryIndex = 0;

   function getSlidesPerView() {
      if (window.innerWidth <= 600) {
         return 1;
      }

      if (window.innerWidth <= 900) {
         return 2;
      }

      return 4;
   }

   function getMaxIndex() {
      return Math.max(0, gallerySlides.length - getSlidesPerView());
   }

   function updateGallery() {
      const slidesPerView = getSlidesPerView();
      const maxIndex = getMaxIndex();

      if (currentGalleryIndex > maxIndex) {
         currentGalleryIndex = maxIndex;
      }

      const slideWidth = gallerySlides[0].getBoundingClientRect().width;

      const gap = 10;

      galleryTrack.style.transform = `translateX(-${currentGalleryIndex * (slideWidth + gap)}px)`;

      updateGalleryDots();
   }

   function createGalleryDots() {
      galleryDotsContainer.innerHTML = "";

      const maxIndex = getMaxIndex();

      for (let i = 0; i <= maxIndex; i++) {
         const dot = document.createElement("button");

         dot.className = "gallery-dot";

         dot.setAttribute("aria-label", `Go to gallery slide ${i + 1}`);

         dot.addEventListener("click", () => {
            currentGalleryIndex = i;

            updateGallery();
         });

         galleryDotsContainer.appendChild(dot);
      }

      updateGalleryDots();
   }

   function updateGalleryDots() {
      const dots = galleryDotsContainer.querySelectorAll(".gallery-dot");

      dots.forEach((dot, index) => {
         dot.classList.toggle("active", index === currentGalleryIndex);
      });
   }

   galleryNext.addEventListener("click", () => {
      const maxIndex = getMaxIndex();

      if (currentGalleryIndex < maxIndex) {
         currentGalleryIndex++;
         updateGallery();
      }
   });

   galleryPrev.addEventListener("click", () => {
      if (currentGalleryIndex > 0) {
         currentGalleryIndex--;
         updateGallery();
      }
   });

   window.addEventListener("resize", () => {
      createGalleryDots();
      updateGallery();
   });

   /* Mobile swipe */

   let touchStartX = 0;
   let touchEndX = 0;

   galleryTrack.addEventListener(
      "touchstart",
      (event) => {
         touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true },
   );

   galleryTrack.addEventListener(
      "touchend",
      (event) => {
         touchEndX = event.changedTouches[0].screenX;

         const difference = touchStartX - touchEndX;

         if (Math.abs(difference) < 50) {
            return;
         }

         if (difference > 0) {
            const maxIndex = getMaxIndex();

            if (currentGalleryIndex < maxIndex) {
               currentGalleryIndex++;
               updateGallery();
            }
         } else {
            if (currentGalleryIndex > 0) {
               currentGalleryIndex--;
               updateGallery();
            }
         }
      },
      { passive: true },
   );

   createGalleryDots();
   updateGallery();
}
