/* Define products in array products */

class Product{
    constructor(name, id, image, categoryName, categoryId, price){
        this.name = name;
        this.id = id;
        this.image = image;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.price = price;
    }
}

const products = [];

const firstAccesory = new Product("Animi dolor pariatur", "accesory-01", "./assets/img/accesory-01.jpg", "Accesory", "accesories", 30);
const secondAccesory = new Product("Dark green jug", "accesory-02", "./assets/img/accesory-02.jpg", "Accesory", "accesories", 17);
const thirdAccesory = new Product("Drinking glasses", "accesory-03", "./assets/img/accesory-03.jpg", "Accesory", "accesories", 21); 
const fourthAccesory = new Product("High Quality Glass Bottle", "accesory-04", "./assets/img/accesory-04.jpg", "Accesory", "accesories", 30);
const fifthAccesory = new Product("Living Room & Bedroom Lights", "accesory-05", "./assets/img/accesory-05.jpg", "Accesory", "accesories", 45);
const sixthAccesory = new Product("Teapot with black tea", "accesory-06", "./assets/img/accesory-06.jpg", "Accesory", "accesories", 25);
const seventhAccesory = new Product("Wooden Cups", "accesory-07", "./assets/img/accesory-07.jpg", "Accesory", "accesories", 29);

const firstDecoration = new Product("Animi dolor pariatur", "decoration-01", "./assets/img/decoration-01.jpg", "Decoration", "decorations", 10);
const secondDecoration = new Product("Artificial potted plant", "decoration-02", "./assets/img/decoration-02.jpg", "Decoration", "decorations", 40);
const thirdDecoration = new Product("Smooth disk", "decoration-03", "./assets/img/decoration-03.jpg", "Decoration", "decorations", 46);
const fourthDecoration = new Product("Unique decoration", "decoration-04", "./assets/img/decoration-04.jpg", "Decoration", "decorations", 15);
const fifthecoration = new Product("Vase of flowers", "decoration-05", "./assets/img/decoration-05.jpg", "Decoration", "decorations", 77);
const sixthDecoration = new Product("Wood Eggs", "decoration-06", "./assets/img/decoration-06.jpg", "Decoration", "decorations", 19);
const seventhDecoration = new Product("Wooden Box", "decoration-07", "./assets/img/decoration-07.jpg", "Decoration", "decorations", 27);

const firstFurniture = new Product("Helen chair", "furniture-01", "./assets/img/furniture-01.jpg", "Furniture", "furnitures", 69);
const secondFurniture = new Product("Nancy chair", "furniture-02", "./assets/img/furniture-02.jpg", "Furniture", "furnitures", 90);
const thirdFurniture = new Product("Simple chair", "furniture-03", "./assets/img/furniture-03.jpg", "Furniture", "furnitures", 40);
const fourthFurniture = new Product("Table Black", "furniture-04", "./assets/img/furniture-04.jpg", "Furniture", "furnitures", 67);
const fifthFurniture = new Product("Table wood pine", "furniture-05", "./assets/img/furniture-05.jpg", "Furniture", "furnitures", 50);

products.push(firstAccesory);
products.push(secondAccesory);
products.push(thirdAccesory);
products.push(fourthAccesory);
products.push(fifthAccesory);
products.push(sixthAccesory);
products.push(seventhAccesory);

products.push(firstDecoration);
products.push(secondDecoration);
products.push(thirdDecoration);
products.push(fourthDecoration);
products.push(fifthecoration);
products.push(sixthDecoration);
products.push(seventhDecoration);

products.push(firstFurniture);
products.push(secondFurniture);
products.push(thirdFurniture);
products.push(fourthFurniture);
products.push(fifthFurniture);


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

