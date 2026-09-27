let cart =
    JSON.parse(
        localStorage.getItem("littleStepsCart")
    ) || [];


const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const orderSummary =
    document.getElementById("orderSummary");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const totalElement =
    document.getElementById("total");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");


function saveCart() {

    localStorage.setItem(
        "littleStepsCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent = count;

}


function displayCart() {

    cartItems.innerHTML = "";

    updateCartCount();


    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

        orderSummary.style.display =
            "none";

        return;
    }


    emptyCart.style.display =
        "none";

    orderSummary.style.display =
        "block";


    cart.forEach(product => {

        const item =
            document.createElement("article");


        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="cart-item-details">

                <span class="cart-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <strong>
                    ₱${product.price.toLocaleString()}
                </strong>

                <button
                    class="remove-item"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>


            <div class="quantity-control">

                <button
                    class="decrease"
                    data-id="${product.id}"
                >
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button
                    class="increase"
                    data-id="${product.id}"
                >
                    +
                </button>

            </div>


            <div class="item-total">

                ₱${(
                    product.price *
                    product.quantity
                ).toLocaleString()}

            </div>

        `;


        cartItems.appendChild(item);

    });


    calculateTotals();
}


function calculateTotals() {

    const subtotal =
        cart.reduce(
            (total, product) =>

                total +
                product.price *
                product.quantity,

            0
        );


    const shipping =
        subtotal >= 1500
            ? 0
            : 120;


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        `₱${subtotal.toLocaleString()}`;


    shippingElement.textContent =
        shipping === 0
            ? "FREE"
            : `₱${shipping.toLocaleString()}`;


    totalElement.textContent =
        `₱${total.toLocaleString()}`;
}


cartItems.addEventListener(
    "click",
    event => {

        const id =
            Number(
                event.target.dataset.id
            );


        if (!id) return;


        const product =
            cart.find(
                item => item.id === id
            );


        if (
            event.target.classList
                .contains("increase")
        ) {

            product.quantity++;
        }


        if (
            event.target.classList
                .contains("decrease")
        ) {

            product.quantity--;


            if (product.quantity <= 0) {

                cart =
                    cart.filter(
                        item =>
                            item.id !== id
                    );

            }
        }


        if (
            event.target.classList
                .contains("remove-item")
        ) {

            cart =
                cart.filter(
                    item =>
                        item.id !== id
                );


            showToast(
                "Product removed from cart"
            );
        }


        saveCart();

        displayCart();

    }
);


document
    .getElementById("checkoutButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Checkout will be added next."
            );

        }
    );


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


displayCart();