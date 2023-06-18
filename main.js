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

const firstAccesory = new Product("Art Deco Home", "accesory-01", "./assets/img/accesory-01.jpg", "accesory", "accesories", 30);
const secondAccesory = new Product("Dark Green Jug", "accesory-02", "./assets/img/accesory-02.jpg", "accesory", "accesories", 17);
const thirdAccesory = new Product("Drinking Glasses", "accesory-03", "./assets/img/accesory-03.jpg", "accesory", "accesories", 21); 
const fourthAccesory = new Product("High Quality Glass Bottle", "accesory-04", "./assets/img/accesory-04.jpg", "accesory", "accesories", 30);
const fifthAccesory = new Product("Living Room & Bedroom Lights", "accesory-05", "./assets/img/accesory-05.jpg", "accesory", "accesories", 45);
const sixthAccesory = new Product("Teapot With Black Tea", "accesory-06", "./assets/img/accesory-06.jpg", "accesory", "accesories", 25);
const seventhAccesory = new Product("Wooden Cups", "accesory-07", "./assets/img/accesory-07.jpg", "accesory", "accesories", 29);

const firstDecoration = new Product("Animi Dolor Pariatur", "decoration-01", "./assets/img/decoration-01.jpg", "decoration", "decorations", 10);
const secondDecoration = new Product("Artificial Potted Plant", "decoration-02", "./assets/img/decoration-02.jpg", "decoration", "decorations", 40);
const thirdDecoration = new Product("Smooth Disk", "decoration-03", "./assets/img/decoration-03.jpg", "decoration", "decorations", 46);
const fourthDecoration = new Product("Unique Decoration", "decoration-04", "./assets/img/decoration-04.jpg", "decoration", "decorations", 15);
const fifthecoration = new Product("Vase Of Flowers", "decoration-05", "./assets/img/decoration-05.jpg", "decoration", "decorations", 77);
const sixthDecoration = new Product("Wood Eggs", "decoration-06", "./assets/img/decoration-06.jpg", "decoration", "decorations", 19);
const seventhDecoration = new Product("Wooden Box", "decoration-07", "./assets/img/decoration-07.jpg", "decoration", "decorations", 27);

const firstFurniture = new Product("Helen Chair", "furniture-01", "./assets/img/furniture-01.jpg", "furniture", "furnitures", 69);
const secondFurniture = new Product("Nancy Chair", "furniture-02", "./assets/img/furniture-02.jpg", "furniture", "furnitures", 90);
const thirdFurniture = new Product("Simple Chair", "furniture-03", "./assets/img/furniture-03.jpg", "furniture", "furnitures", 40);
const fourthFurniture = new Product("Table Black", "furniture-04", "./assets/img/furniture-04.jpg", "furniture", "furnitures", 67);
const fifthFurniture = new Product("Table Wood Pine", "furniture-05", "./assets/img/furniture-05.jpg", "furniture", "furnitures", 50);

products.push(firstDecoration);
products.push(firstAccesory);
products.push(secondDecoration);
products.push(secondAccesory);

products.push(thirdAccesory);
products.push(firstFurniture);
products.push(fourthAccesory);
products.push(fifthAccesory);

products.push(secondFurniture);
products.push(thirdFurniture);
products.push(thirdDecoration);
products.push(fourthFurniture);

products.push(fifthFurniture);
products.push(sixthAccesory);
products.push(fourthDecoration);
products.push(fifthecoration);

products.push(sixthDecoration);
products.push(seventhDecoration);
products.push(seventhAccesory);


const btnCategory = document.querySelectorAll(".filter-btn");
const productsContainer = document.querySelector("#data-filter");
let btnAdd = document.querySelectorAll(".card-bag-btn");   // Seleccion de todos los botones "bag"
const quantity = document.querySelector("#ctn-badge");


/************************************************** START FUNCTIONS ***************************************************/

/**** Add products to the bag ****/

function addToBag(event){
    const idBtn = event.currentTarget.id;
    const addedProduct = products.find(product => product.id === idBtn);            

    if(productsInBag.some(product => product.id === idBtn)){
        /* El producto ya fue agregado al carrito */
        const index = productsInBag.findIndex(product => product.id === idBtn);    
        productsInBag[index].cant++;
    } else {
        /* El producto es agregado al carrito por primera vez */
        addedProduct.cant = 1;                                                      // Se agrega propiedad cantidad a los productos
        productsInBag.push(addedProduct);
    }

    refreshQuantity();
    
    /* Se guarda al arreglo en el local Storage para cargarlo desde carrito.html */ 
    localStorage.setItem("products-in-bag", JSON.stringify(productsInBag));
}

/**** Refresh quantity ****/

const refreshQuantity = () => {
    let newQuantity = productsInBag.reduce((acc, product) => acc + product.cant, 0);   // Se cuenta la cantidad de productos del arreglo y como los repetidos se almacenan en cant, se aplica reduce 
    quantity.innerText = newQuantity;
}

/**** Refresh add btn ****/

const refreshAddBtn = () => {
    btnAdd = document.querySelectorAll(".card-bag-btn");
    btnAdd.forEach(btn => {
        btn.addEventListener("click", addToBag);
    })
}

/* Load products */ 

const load = (productsChosen) => {
    productsContainer.innerHTML = "";           // Vacia el contenedor para que no vaya acumulando las categorias filtradas dado que se le aplica un append 
    
    productsChosen.forEach(product => {
        const li = document.createElement("li");
        const productCat = product.categoryName; 
        li.classList.add(productCat);
        if(product.id === "decoration-01"){
            li.innerHTML = `
            <div class="product-card">
                <div class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
                    <img src="${product.image}" width="300" height="300" loading="lazy" alt="${product.name}" class="img-cover">
                    <ul class="card-action-list">
                        <li>
                            <button class="card-action-btn">
                                <ion-icon name="add-outline"></ion-icon>
                            </button>
                        </li>
                        <li>
                            <button id=${product.id} class="card-bag-btn">
                                <ion-icon name="bag-handle-outline"></ion-icon>
                            </button>
                        </li>
                        <li>
                            <button class="card-heart-btn">
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
                        </li>
                    </ul>

                    <ul class="badge-list">
                        <li>
                            <div class="badge orange">Sale</div>
                        </li>
                        <li>
                            <div class="badge cyan">-10%</div>
                        </li>
                    </ul>
                </div>

                <div class="card-content">
                    <h3 class="h3">
                        <a href="#" class="card-title">${product.name}</a>
                    </h3>
                    <div class="card-price">
                        <del class="del">$19.00</del>
                        <data class="price" value="${product.price}">$${product.price}.00</data>
                    </div>
                </div>
            </div>
            `;
        } else if(product.id === "accesory-01"){
            li.innerHTML = `
            <div class="product-card">
                <div class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
                    <img src="${product.image}" width="300" height="300" loading="lazy" alt="${product.name}" class="img-cover">
                    <ul class="card-action-list">
                        <li>
                            <button class="card-action-btn">
                                <ion-icon name="add-outline"></ion-icon>
                            </button>
                        </li>
                        <li>
                            <button class="card-heart-btn">
                                <ion-icon name="heart-outline"></ion-icon>
                            </button>
                        </li>
                    </ul>
                    <div class="card-badge">Out of stock</div>
                </div>

                <div class="card-content">
                    <h3 class="h3">
                        <a href="#" class="card-title">${product.name}</a>
                    </h3>
                    <div class="card-price">
                        <data class="price" value="${product.price}">$${product.price}.00</data>
                    </div>
                </div>
            </div>
        `;
        } else {
            li.innerHTML = `
                <div class="product-card">
                    <div class="card-banner img-holder has-before" style="--width: 300; --height: 300;">
                        <img src="${product.image}" width="300" height="300" loading="lazy" alt="${product.name}" class="img-cover">
                        <ul class="card-action-list">
                            <li>
                                <button class="card-action-btn">
                                    <ion-icon name="add-outline"></ion-icon>
                                </button>
                            </li>
                            <li>
                                <button id=${product.id} class="card-bag-btn">
                                    <ion-icon name="bag-handle-outline"></ion-icon>
                                </button>
                            </li>
                            <li>
                                <button class="card-heart-btn">
                                    <ion-icon name="heart-outline"></ion-icon>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="card-content">
                        <h3 class="h3">
                            <a href="#" class="card-title">${product.name}</a>
                        </h3>
                        <div class="card-price">
                            <data class="price" value="${product.price}">$${product.price}.00</data>
                        </div>
                    </div>
                </div>
            `;
        }
        productsContainer.append(li);
    })
    refreshAddBtn();
}

/************************************************** END FUNCTIONS ***************************************************/

load(products);

/***** Navbar toggle *****/

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

/***** Header active when windows scroll down to 100px *****/

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

/**** Product filter ****/

btnCategory.forEach(btn => {
    btn.addEventListener("click", (event) => {
        btnCategory.forEach(btn => btn.classList.remove("active"));  
        event.currentTarget.classList.add("active");                
        
        /* Filter products by category */
        if(event.currentTarget.id != "all"){
        const selected = products.filter(product => product.categoryId === event.currentTarget.id);
        load(selected);
        } else{
        load(products);                                   
        }
    })
});


let productsInBag;
let productsInBagLocalStorage = localStorage.getItem("products-in-bag");

if(productsInBagLocalStorage){
    productsInBag = JSON.parse(productsInBagLocalStorage);
    refreshQuantity();                                       
} else {
    productsInBag = [];
}












