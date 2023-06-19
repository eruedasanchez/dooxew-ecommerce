// Se comienza verificando si hay algo en el carrito viendo el local Storage

const CERO = 0;
let productsInBag = localStorage.getItem("products-in-bag");
productsInBag = JSON.parse(productsInBag);







const emptyBag = document.querySelector("#empty-bag");   // emptyBagContainer
const productCard = document.querySelector("#product-card"); // #bag-products
// bag-actions seria amount
// finish purchase seria pagar e iria con alguna libreria que confirme la compra 
let deleteBtns = document.querySelector(".product-close-btn"); // .bag-product-delete
// bag-actions-clear no lo voy a necesitar en este caso
const payBtn = document.querySelector("#pay-btn"); // bag-actions-buy

const subtotal = document.getElementById("subtotal");
const iva = document.getElementById("iva");
const shipping = document.getElementById("shipping");
const total = document.getElementById("total");
const payAmount = document.getElementById("payAmount");






function uploadPurchaseOrder(){
    // Si no hay productos en el carrito JSON.parse(productsInBag) evalua a null y null -> false
    
    if(productsInBag && productsInBag.length > CERO){
        emptyBag.classList.add("disabled");
        productCard.classList.remove("disabled");
        // bagActionsContainer.classList.remove("disabled");
        // finishPurchaseContainer.classList.add("disabled");
        
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

            const plusBtn = document.querySelector("#plus");
            let quantity = document.querySelector("#quantity");
            let price = document.querySelector("#price");

            let lastValue = parseInt(quantity.innerText);
            let lastPrice = parseInt(price.innerText);

            plusBtn.addEventListener('click', () => {
                lastValue++;
                lastPrice += 20;
            });
        })
    } else {
        emptyBag.classList.remove("disabled"); 
        productCard.classList.add("disabled");
        // bagActionsContainer.classList.add("disabled");
        // finishPurchaseContainer.classList.add("disabled");
    }
    refreshDeleteButtons();
    refreshTotal();
}

const refreshTotal = () => {
    const subtotalAmmount = Math.round(parseInt(productsInBag.reduce((acc, producto) => acc + (producto.price * producto.cant), 0)));
    const ivaTax = Math.round(parseInt(subtotalAmmount * 0.21));
    const shippingTax = Math.round(parseInt(subtotalAmmount * 0.03));
    subtotal.innerText = `${subtotalAmmount}`;
    iva.innerText = `${ivaTax}`;
    shipping.innerText = `${shippingTax}`;
    const totalAmmount = subtotalAmmount + ivaTax + shippingTax;
    total.innerText = `${totalAmmount}`; 
    payAmount.innerText = `${totalAmmount}`;
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



uploadPurchaseOrder();

// confirmar compra 

payBtn.addEventListener("click", () => {
    if(parseInt(payAmount.innerText) === 0){
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacio!',
            showConfirmButton: true,   // true muestra el boton de ok y false lo oculta
            // timer: 2000 // milisegundos
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
                Swal.fire(
                    'Compra confirmada!',
                    'Nos encontramos en Avenida Rivadavia 5700. Nuestros horarios de atencion son lunes a viernes de 9 a 18hs. Gracias por confiar en nostros',
                    'success'
                )

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




