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

    if (heroPhoto) {

        if (isMobile) {

            heroPhoto.src =
                "assets/images/Egwuonwu-Micheal2011.png";

        } else {

            heroPhoto.src = isLight
                ? "assets/images/Egwuonwu-Micheal2011.png"
                : "assets/images/Egwuonwu-Micheal1.png";

        }

    }

    if (themeBtn) {

        themeBtn.textContent =
            isLight ? "☀️" : "🌙";

    }

}

window.addEventListener(
    "resize",
    updateThemeAssets
);

if (themeBtn) {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }

    updateThemeAssets();

    themeBtn.addEventListener("click", async () => {

        const switchTheme = () => {

            document.body.classList.toggle("light-theme");

            const theme =
                document.body.classList.contains("light-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem("theme", theme);

        };

        if (!document.startViewTransition) {

            switchTheme();
            updateThemeAssets();
            return;

        }

        const rect =
            themeBtn.getBoundingClientRect();

        const x =
            rect.left + rect.width / 2;

        const y =
            rect.top + rect.height / 2;

        const endRadius = Math.hypot(

            Math.max(x, innerWidth - x),

            Math.max(y, innerHeight - y)

        );

        /* Start rotation immediately */

        themeBtn.classList.remove("finish");
        themeBtn.classList.add("rotate");

        const transition =
            document.startViewTransition(() => {

                switchTheme();

            });

        await transition.ready;

        document.documentElement.animate(

            {
                clipPath: [

                    `circle(0px at ${x}px ${y}px)`,

                    `circle(${endRadius}px at ${x}px ${y}px)`

                ]

            },

            {

                duration: 500,

                easing:
                    "cubic-bezier(.65,0,.35,1)",

                pseudoElement:
                    "::view-transition-new(root)"

            }

        );

        /* Change icon halfway through the spin */

        setTimeout(() => {

            updateThemeAssets();

        }, 180);

        /* Finish animation */

        setTimeout(() => {

            themeBtn.classList.remove("rotate");

            themeBtn.classList.add("finish");

        }, 320);

        /* Return to normal */

        setTimeout(() => {

            themeBtn.classList.remove("finish");

        }, 520);

    });

}
