const body = document.body;
const logo = document.getElementById("logo");
const navButtons = document.querySelectorAll(".nav-btn");

// PAGES SETUP
const pages = ["about", "projects", "scripts", "contact"];
let currentPage = 0;

//FIRST SETUP
const savedTheme = localStorage.getItem("theme") || "light";
body.className = savedTheme;

updateLogo();
showPage(currentPage);

//CHANGING THEME 
logo.addEventListener("click", () => {
    body.className = body.classList.contains("light") ? "dark" : "light";

    updateLogo();
    localStorage.setItem("theme", body.className);
});

//UPDATE LOGO WITH THEME
function updateLogo() {
    logo.style.opacity = 0;

    setTimeout(() => {
        logo.src = body.classList.contains("light")
            ? "images/sunsetMask.png"
            : "images/nightMask.png";

        logo.style.opacity = 1;
    }, 200);
}

//SWITCHING BETWEEN PAGES
function showPage(index) {
    const current = document.querySelector(".page.active");
    const next = document.getElementById(pages[index]);

    if (!next || current === next) return;

    current.classList.remove("active");
    next.classList.add("active");

    navButtons.forEach(btn => btn.classList.remove("active"));
    navButtons[index].classList.add("active");
}

// NAVIGATING BETWEEN PAGES
navButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        currentPage = index;
        showPage(currentPage);
    });
});

