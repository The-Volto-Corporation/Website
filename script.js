const body = document.body;
const logo = document.getElementById("logo");
const navButtons = document.querySelectorAll(".nav-btn");

// Pages system
const pages = ["about", "projects", "contact"];
let currentPage = 0;

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
body.className = savedTheme;

updateLogo();
showPage(currentPage);

// ------------------ THEME TOGGLE ------------------

logo.addEventListener("click", () => {
    body.className = body.classList.contains("light") ? "dark" : "light";

    updateLogo();
    localStorage.setItem("theme", body.className);
});

// ------------------ LOGO UPDATE ------------------

function updateLogo() {
    logo.style.opacity = 0;

    setTimeout(() => {
        if (body.classList.contains("light")) {
            logo.src = "images/sunsetMask.png";
        } else {
            logo.src = "images/nightMask.png";
        }

        logo.style.opacity = 1;
    }, 200);
}

// ------------------ PAGE SWITCHING ------------------

function showPage(index) {

    const current = document.querySelector(".page.active");
    const next = document.getElementById(pages[index]);

    if (current === next) return;

    current.classList.remove("active");

    setTimeout(() => {
        next.classList.add("active");

        navButtons.forEach(btn => btn.classList.remove("active"));
        navButtons[index].classList.add("active");

    }, 150);
}

navButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        currentPage = index;
        showPage(currentPage);

        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

    });

});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Message sent!");

});