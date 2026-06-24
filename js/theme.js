/* =========================
   THEME TOGGLE
========================= */

const themeBtn = document.querySelector(".theme-toggle");
const heroPhoto = document.getElementById("heroPhoto");

function updateThemeAssets() {

  const isLight =
    document.body.classList.contains("light-theme");

  const isMobile =
    window.innerWidth <= 768;

  if(heroPhoto){

    if(isMobile){

      heroPhoto.src =
        "assets/images/Egwuonwu-Micheal2011.png";

    }else{

      heroPhoto.src = isLight
        ? "assets/images/Egwuonwu-Micheal2011.png"
        : "assets/images/Egwuonwu-Micheal1.png";
    }

  }

  if(themeBtn){

    themeBtn.textContent = isLight
      ? "☀️"
      : "🌙";
  }

}

window.addEventListener(
  "resize",
  updateThemeAssets
);

if(themeBtn){

  const savedTheme =
    localStorage.getItem("theme");

  if(savedTheme === "light"){
    document.body.classList.add("light-theme");
  }

  /* APPLY ON PAGE LOAD */
  updateThemeAssets();

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const theme =
      document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

    localStorage.setItem("theme", theme);

    updateThemeAssets();
  });

}