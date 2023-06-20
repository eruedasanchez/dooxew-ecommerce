import products from './data.json' assert{type: 'json'}; // Consumir datos de la API local

const btnCategory = document.querySelectorAll(".filter-btn");
const productsContainer = document.querySelector("#data-filter");
let btnAdd = document.querySelectorAll(".card-bag-btn");  
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
        addedProduct.cant = 1;                                                  // Se agrega propiedad cantidad a los productos
        productsInBag.push(addedProduct);
    }

    refreshQuantity();
    
    localStorage.setItem("products-in-bag", JSON.stringify(productsInBag));    // Guarda al arreglo en el local Storage para cargarlo desde carrito.html
}

/**** Refresh quantity ****/

const refreshQuantity = () => {
    let newQuantity = productsInBag.reduce((acc, product) => acc + product.cant, 0);   // Cuenta la cantidad de productos del arreglo y como los repetidos se almacenan en cant, se aplica reduce 
    quantity.innerText = newQuantity;
}

/**** Refresh add btn ****/

const refreshAddBtn = () => {
    btnAdd = document.querySelectorAll(".card-bag-btn");
    btnAdd.forEach(btn => {
        btn.addEventListener("click", addToBag);
    })
}

/**** Load products ****/ 

const load = (productsChosen) => {
    productsContainer.innerHTML = "";           // Vacia el contenedor para que no vaya acumulando las categorias filtradas porque se aplica un append
    
    productsChosen.forEach(product => {
        const li = document.createElement("li");
        const productCat = product.categoryName; 
        li.classList.add(productCat);
        if(product.id === "decoration-01"){
            /* Producto con el 10% descuento */
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
            /* Producto que no cuenta con stock */
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
                    <div class="card-badge">Sin stock</div>
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
            /* Todos los demas productos */
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

/**** Like products ****/

let likesCounter = 0;  
const likeCtn = document.querySelector('#ctn-heart'); 
const likeBtns = document.querySelectorAll(".card-heart-btn");

likeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        likesCounter++;
        likeCtn.innerText = likesCounter;
    });
})

/**** Load products in Local Storage ****/

let productsInBag;
let productsInBagLocalStorage = localStorage.getItem("products-in-bag");

if(productsInBagLocalStorage){
    productsInBag = JSON.parse(productsInBagLocalStorage);
    refreshQuantity();                                       
} else {
    productsInBag = [];
}

