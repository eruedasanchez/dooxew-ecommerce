/**** Verificacion del local Storage para chequear si hay productos cargados en el carrito ****/ 

const CERO = 0;
let productsInBag = localStorage.getItem("products-in-bag");
productsInBag = JSON.parse(productsInBag);

/**** Selectors ****/

const emptyBag = document.querySelector("#empty-bag");   
const productCard = document.querySelector("#product-card"); 
let deleteBtns = document.querySelector(".product-close-btn"); 
const payBtn = document.querySelector("#pay-btn"); 

const subtotal = document.getElementById("subtotal");
const iva = document.getElementById("iva");
const shipping = document.getElementById("shipping");
const total = document.getElementById("total");
const payAmount = document.getElementById("payAmount");

/************************************************** START FUNCTIONS ***************************************************/

function uploadPurchaseOrder(){
    // Si no hay productos en el carrito JSON.parse(productsInBag) evalua a null y null -> false
    
    if(productsInBag && productsInBag.length > CERO){
        emptyBag.classList.add("disabled");
        productCard.classList.remove("disabled");
        
        productCard.innerHTML = "";
        
        productsInBag.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("card");   
            div.innerHTML = `
            <div class="img-box">
                <img src="../assets/img/${product.id}.jpg" alt="${product.name}" width="80px" class="cart-img product-img">
            </div>
            <div class="detail">
                <h4 class="product-name">${product.name}</h4>
                <div class="wrapper">
                    <div class="product-qty">
                        <button class="cart-button cart-button-minus" id="minus"><ion-icon class="cart-ion-icon" name="remove-outline"></ion-icon></button>
                        <span class=".cart-span" id="quantity">${product.cant}</span>
                        <button class="cart-button cart-button-plus" id="plus"><ion-icon class="cart-ion-icon" name="add-outline"></ion-icon></button>
                    </div>
                    <div class="price">
                        $ <span class=".cart-span" id="price">${product.price * product.cant}.00</span>
                    </div>
                </div>
            </div>
            <button class="cart-button product-close-btn" id="${product.id}"> 
                <ion-icon class="cart-ion-icon" name="close-outline"></ion-icon>
            </button>
            `;
            
            productCard.append(div);
        })
    } else {
        emptyBag.classList.remove("disabled"); 
        productCard.classList.add("disabled");
    }
    refreshDeleteButtons();
    refreshTotal();
}

const refreshTotal = () => {
    const applyBtn = document.querySelector('#apply-btn');
    const discountToken = document.querySelector('#discount-token');
    
    const subtotalAmmount = Math.round(parseInt(productsInBag.reduce((acc, producto) => acc + (producto.price * producto.cant), 0)));
    const ivaTax = Math.round(parseInt(subtotalAmmount * 0.21));
    const shippingTax = Math.round(parseInt(subtotalAmmount * 0.03));
    const totalAmmount = subtotalAmmount + ivaTax + shippingTax;

    subtotal.innerText = `${subtotalAmmount}`;
    iva.innerText = `${ivaTax}`;
    shipping.innerText = `${shippingTax}`;
    total.innerText = `${totalAmmount}`; 
    payAmount.innerText = `${totalAmmount}`;

    /**** Apply gift card / Discout card ****/

    let discountHasApplied = false;
    const TENPERCENT = 0.10;
    
    applyBtn.addEventListener('click', () => {
        if(!discountHasApplied && discountToken.value == "CODER-JS-2023"){
            payAmount.innerText = `${totalAmmount}` - `${totalAmmount}` * TENPERCENT;
            total.innerText = `${totalAmmount}` - `${totalAmmount}` * TENPERCENT;
            discountHasApplied = true;
            
            setTimeout(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Felicitaciones! Descuento del 10% aplicado',
                    showConfirmButton: false,
                    timer: 3000
                })
            }, 1500)
        } else if(discountToken.value == "CODER-JS-2023"){
            setTimeout(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Su gift card ya fue utilizada!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }, 1500)
                
        } else {
            setTimeout(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Codigo incorrecto',
                    showConfirmButton: false,
                    timer: 2000
                })
            }, 1500)
        }
    });
}

const refreshDeleteButtons = () => {
    deleteBtns = document.querySelectorAll(".product-close-btn");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", deleteOfBag);
    });
}

const deleteOfBag = (event) => {
    const idBtn = event.currentTarget.id; 
    const index = productsInBag.findIndex(product => product.id === idBtn); 
    
    productsInBag.splice(index,1);          // Borra un elemento del producto seleccionado
    uploadPurchaseOrder();

    localStorage.setItem("products-in-bag", JSON.stringify(productsInBag));
}

/************************************************** END FUNCTIONS ***************************************************/

uploadPurchaseOrder();

/**** Confirm purchase ****/

payBtn.addEventListener("click", () => {
    if(parseInt(payAmount.innerText) === 0){
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacio!',
            showConfirmButton: true,   
        })
    } else {
        Swal.fire({
            title: 'Desea solicitar su pedido?',
            text: "Presione solicitar pedido para confirmar su compra",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'hsl(27, 46%, 58%)',
            cancelButtonColor: '#9ca3b0',
            confirmButtonText: 'Solicitar pedido'
        }).then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    Swal.fire(
                        'Compra confirmada!',
                        'Nos encontramos en Avenida Rivadavia 5700. Nuestros horarios de atencion son lunes a viernes de 9 a 18hs. Gracias por confiar en nosotros',
                        'success'
                    )
                }, 1000)

                productsInBag.length = 0;
                localStorage.setItem("products-in-bag", JSON.stringify(productsInBag));

                emptyBag.classList.remove("disabled"); 
                productCard.classList.add("disabled");

                subtotal.innerText = 0;
                iva.innerText = 0; 
                shipping.innerText = 0;
                total.innerText = 0;
                payAmount.innerText = 0;
            }
        })
    }
});

