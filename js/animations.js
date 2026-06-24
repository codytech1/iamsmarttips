/* =========================
   ABOUT COUNTER
========================= */

const counters =
document.querySelectorAll(".count-up");

const animateCounter = (counter) => {

  const target =
  +counter.getAttribute("data-target");

  let count = 0;

  const speed =
  target / 180;

  const update = () => {

    count += speed;

    if(count < target){

      counter.innerText =
      Math.floor(count);

      requestAnimationFrame(update);

    }else{

      counter.innerText =
      target;

    }

  };

  update();

};

if(counters.length){

  const counterObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        animateCounter(
          entry.target
        );

        counterObserver.unobserve(
          entry.target
        );

      }

    });

  }, {
    threshold: 0.6
  });

  counters.forEach(counter => {

    counterObserver.observe(counter);

  });

}

/* =========================
   SOCIAL STATS
========================= */

const stats =
document.querySelectorAll(".stat");

if(stats.length){

  const statsObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        const count =
        entry.target.querySelector(".count");

        const fill =
        entry.target.querySelector(".fill");

        const target =
        +count.getAttribute("data-target");

        let current = 0;

        const increment =
        target / 180;

        const updateCount = () => {

          if(current < target){

            current += increment;

            if(target >= 1000){

              count.innerText =
              Math.floor(current / 1000)
              + "K";

            }else{

              count.innerText =
              Math.floor(current);

            }

            requestAnimationFrame(
              updateCount
            );

          }else{

            if(target >= 1000){

              count.innerText =
              (target / 1000)
              + "K";

            }else{

              count.innerText =
              target;

            }

          }

        };

        updateCount();

        if(fill){

          fill.style.width = "100%";

        }

        statsObserver.unobserve(
          entry.target
        );

      }

    });

  }, {
    threshold: 0.5
  });

  stats.forEach(stat => {

    statsObserver.observe(stat);

  });

}

/* =========================
   REVEAL ANIMATIONS
========================= */

const reveals =
document.querySelectorAll(".reveal");

if(reveals.length){

  const revealObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add(
          "active"
        );

      }

    });

  }, {
    threshold: 0.2
  });

  reveals.forEach(el => {

    revealObserver.observe(el);

  });

}

const fadeElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add('show');

    }

  });

},{
  threshold:0.15
});

fadeElements.forEach(el=>{

  observer.observe(el);

});