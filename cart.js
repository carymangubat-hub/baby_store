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

const shippingMessage =
    document.getElementById("shippingMessage");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

        orderSummary.style.display =
            "none";

        updateCartCount();

        return;

    }


    emptyCart.style.display =
        "none";

    orderSummary.style.display =
        "block";


    cart.forEach(item => {

        const product =
            getProductById(item.id);


        if (!product) {
            return;
        }


        const element =
            document.createElement(
                "article"
            );


        element.className =
            "cart-item";


        element.innerHTML = `

            <a
                href="product.html?id=${product.id}"
                class="cart-image"
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </a>


            <div class="cart-item-info">

                <span class="product-category">
                    ${getCategoryName(product.category)}
                </span>


                <a
                    href="product.html?id=${product.id}"
                    class="product-title-link"
                >

                    <h3>
                        ${product.name}
                    </h3>

                </a>


                <strong>
                    ${formatPrice(product.price)}
                </strong>


                <button
                    class="remove-item"
                    data-id="${product.id}"
                    type="button"
                >
                    Remove
                </button>

            </div>


            <div class="cart-quantity">

                <button
                    class="decrease"
                    data-id="${product.id}"
                    type="button"
                >
                    −
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    class="increase"
                    data-id="${product.id}"
                    type="button"
                >
                    +
                </button>

            </div>


            <strong class="cart-item-total">

                ${formatPrice(
                    product.price *
                    item.quantity
                )}

            </strong>

        `;


        cartItems.appendChild(
            element
        );

    });


    calculateTotals();

    updateCartCount();

}


/* =========================
   TOTALS
========================= */

function calculateTotals() {

    const subtotal =
        cart.reduce(
            (total, item) => {

                const product =
                    getProductById(
                        item.id
                    );

                if (!product) {
                    return total;
                }

                return (
                    total +
                    product.price *
                    item.quantity
                );

            },
            0
        );


    const shipping =
        subtotal >= 1500
            ? 0
            : 120;


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        formatPrice(subtotal);


    shippingElement.textContent =
        shipping === 0
            ? "FREE"
            : formatPrice(shipping);


    totalElement.textContent =
        formatPrice(total);


    if (
        subtotal > 0 &&
        subtotal < 1500
    ) {

        shippingMessage.textContent =
            `Add ${formatPrice(
                1500 - subtotal
            )} more for free shipping.`;

    } else {

        shippingMessage.textContent =
            subtotal >= 1500
                ? "You qualify for free shipping!"
                : "";

    }

}


/* =========================
   CART BUTTONS
========================= */

cartItems.addEventListener(
    "click",
    event => {

        const increase =
            event.target.closest(
                ".increase"
            );

        const decrease =
            event.target.closest(
                ".decrease"
            );

        const remove =
            event.target.closest(
                ".remove-item"
            );


        if (increase) {

            const item =
                cart.find(
                    item =>
                        item.id ===
                        Number(
                            increase.dataset.id
                        )
                );

            if (item) {
                item.quantity++;
            }

        }


        if (decrease) {

            const item =
                cart.find(
                    item =>
                        item.id ===
                        Number(
                            decrease.dataset.id
                        )
                );


            if (item) {

                item.quantity--;

                if (item.quantity <= 0) {

                    cart =
                        cart.filter(
                            cartItem =>
                                cartItem.id !==
                                item.id
                        );

                }

            }

        }


        if (remove) {

            const id =
                Number(
                    remove.dataset.id
                );


            cart =
                cart.filter(
                    item =>
                        item.id !== id
                );

        }


        saveCart();

        displayCart();

    }
);


/* =========================
   STORAGE
========================= */

function saveCart() {

    localStorage.setItem(
        "littleStepsCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        total;

}


/* =========================
   CHECKOUT
========================= */

document.getElementById(
    "checkoutButton"
).addEventListener(
    "click",
    () => {

        showToast(
            "Checkout is not connected to a payment system yet."
        );

    }
);


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2800
    );

}


displayCart();