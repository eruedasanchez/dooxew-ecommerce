/* Navbar toggle */

const navbar = document.querySelector(".sidebar"); 
const navbarLinks = document.querySelectorAll(".navbar-link");
const openMenuBtn = document.getElementById("nav-toggler-open-menu");
const closeMenuBtn = document.getElementById("nav-toggler-close-menu");
const overlayBtn = document.getElementById("nav-toggler-overlay");
const overlay = document.querySelector(".overlay");

const toggleNavbar = () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}

openMenuBtn.addEventListener('click', () => {
    toggleNavbar();  
});

closeMenuBtn.addEventListener('click', () => {
    toggleNavbar();  
});

overlayBtn.addEventListener('click', () => {
    toggleNavbar();  
});

const closeNavbar = () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

navbarLinks.forEach(navbarlink => {
    navbarlink.addEventListener('click', () => {
        closeNavbar();
    });
});

/* Header active when windows scroll down to 100px */

const header = document.querySelector(".header");
const backTopBtn = document.querySelector(".back-top-btn");

const showElementOnScroll = () => {
    if(window.scrollY > 100){
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
}

window.addEventListener('scroll', () => {
    showElementOnScroll();  
});






