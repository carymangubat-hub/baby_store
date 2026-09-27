/* ==============================
   PRODUCT DATABASE
================================ */

const products = [

    {
        id: 1,
        name: "Extra Soft Baby Wipes",
        category: "diapers",
        price: 149,
        icon: "🧻",
        badge: "BEST SELLER",
        rating: 5
    },

    {
        id: 2,
        name: "Gentle Baby Lotion",
        category: "bath",
        price: 229,
        icon: "🧴",
        badge: "NEW",
        rating: 5
    },

    {
        id: 3,
        name: "Gentle Baby Wash",
        category: "bath",
        price: 249,
        icon: "🧴",
        badge: "NEW",
        rating: 5
    },

    {
        id: 4,
        name: "Moisturizing Baby Cream",
        category: "bath",
        price: 199,
        icon: "🫙",
        badge: "20% OFF",
        rating: 5
    },

    {
        id: 5,
        name: "Little Steps Baby Diapers",
        category: "diapers",
        price: 399,
        icon: "👶",
        badge: "POPULAR",
        rating: 5
    },

    {
        id: 6,
        name: "Anti-Colic Feeding Bottle",
        category: "feeding",
        price: 299,
        icon: "🍼",
        badge: "NEW",
        rating: 4
    },

    {
        id: 7,
        name: "Baby Care Gift Set",
        category: "bath",
        price: 799,
        icon: "🎁",
        badge: "GIFT SET",
        rating: 5
    },

    {
        id: 8,
        name: "Soft Cotton Baby Clothes",
        category: "clothing",
        price: 499,
        icon: "👕",
        badge: "20% OFF",
        rating: 5
    },

    {
        id: 9,
        name: "Digital Baby Thermometer",
        category: "health",
        price: 349,
        icon: "🌡️",
        badge: "ESSENTIAL",
        rating: 5
    },

    {
        id: 10,
        name: "Baby Grooming Kit",
        category: "health",
        price: 599,
        icon: "🩺",
        badge: "POPULAR",
        rating: 4
    },

    {
        id: 11,
        name: "Baby Rattle Set",
        category: "toys",
        price: 299,
        icon: "🪇",
        badge: "NEW",
        rating: 5
    },

    {
        id: 12,
        name: "Soft Teddy Bear",
        category: "toys",
        price: 399,
        icon: "🧸",
        badge: "BEST SELLER",
        rating: 5
    },

    {
        id: 13,
        name: "Baby Training Cup",
        category: "feeding",
        price: 279,
        icon: "🥤",
        badge: "POPULAR",
        rating: 4
    },

    {
        id: 14,
        name: "Newborn Bodysuit Set",
        category: "clothing",
        price: 599,
        icon: "👚",
        badge: "NEW",
        rating: 5
    },

    {
        id: 15,
        name: "Sensitive Skin Baby Soap",
        category: "bath",
        price: 129,
        icon: "🧼",
        badge: "GENTLE",
        rating: 5
    },

    {
        id: 16,
        name: "Premium Newborn Diapers",
        category: "diapers",
        price: 449,
        icon: "🧷",
        badge: "BEST SELLER",
        rating: 5
    }

];


/* ==============================
   VARIABLES
================================ */

const productGrid =
    document.getElementById("productGrid");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const searchInput =
    document.getElementById("searchInput");

const searchForm =
    document.getElementById("searchForm");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");

let cart = JSON.parse(localStorage.getItem("littleStepsCart")) || [];

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

let activeCategory = "all";

let searchTerm = "";


/* ==============================
   DISPLAY PRODUCTS
================================ */

function displayProducts() {

    const filteredProducts =
        products.filter(product => {

            const categoryMatch =
                activeCategory === "all" ||
                product.category === activeCategory;

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            return categoryMatch &&
                   searchMatch;

        });


    productGrid.innerHTML = "";


    filteredProducts.forEach(product => {

        const stars =
            "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);


        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <span class="product-badge">
                ${product.badge}
            </span>

            <button
                class="wishlist"
                aria-label="Add ${product.name} to wishlist"
            >
                ♡
            </button>


            <div class="product-image">

                ${product.icon}

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${getCategoryName(product.category)}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ${stars}
                </div>


                <div class="product-bottom">

                    <span class="price">
                        ₱${product.price.toLocaleString()}
                    </span>

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });


    productCount.textContent =
        `${filteredProducts.length} products`;


    if (filteredProducts.length === 0) {

        noProducts.style.display =
            "block";

    } else {

        noProducts.style.display =
            "none";

    }

}


/* ==============================
   CATEGORY NAME
================================ */

function getCategoryName(category) {

    const names = {

        diapers: "Diapers & Wipes",

        bath: "Bath & Skin Care",

        feeding: "Feeding",

        health: "Health & Safety",

        toys: "Toys & Playtime",

        clothing: "Baby Clothing"

    };


    return names[category] ||
           category;

}


/* ==============================
   FILTER PRODUCTS
================================ */

function filterProducts(category) {

    activeCategory = category;


    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.classList.toggle(

                "active",

                button.dataset.category ===
                category

            );

        });


    displayProducts();


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* FILTER BUTTONS */

document
    .querySelectorAll(
        ".filter, .category-card, .view-all"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterProducts(
                    button.dataset.category
                );

            }
        );

    });


/* NAV CATEGORY LINKS */

document
    .querySelectorAll(
        ".nav-links [data-category]"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                filterProducts(
                    link.dataset.category
                );

            }
        );

    });


/* ==============================
   SEARCH
================================ */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        searchTerm =
            searchInput.value.trim();

        activeCategory = "all";

        displayProducts();

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


searchInput.addEventListener(
    "input",
    () => {

        searchTerm =
            searchInput.value.trim();

        displayProducts();

    }
);


/* ==============================
   PRODUCT BUTTONS
================================ */

productGrid.addEventListener(
    "click",
    event => {

        /* ADD TO CART */


            if (
                event.target
                .classList
                .contains("add-cart")
                ) {

                const productId =
                Number(event.target.dataset.id);

                const product =
                products.find(
                item => item.id === productId
                );

                const existingProduct =
                cart.find(
                item => item.id === productId
                );

            if (existingProduct) {

                existingProduct.quantity++;

                } else {

                cart.push({
                ...product,
                quantity: 1
                });

                }

                localStorage.setItem(
                "littleStepsCart",
                JSON.stringify(cart)
                );

                updateCartCount();

                showToast(
                `${product.name} added to cart`
                );
            }


        /* WISHLIST */

        if (
            event.target
                .classList
                .contains("wishlist")
        ) {

            event.target
                .classList
                .toggle("active");


            if (
                event.target
                    .classList
                    .contains("active")
            ) {

                event.target.textContent =
                    "♥";

                showToast(
                    "Added to wishlist"
                );

            } else {

                event.target.textContent =
                    "♡";

                showToast(
                    "Removed from wishlist"
                );

            }

        }

    }
);


/* ==============================
   TOAST
================================ */

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },

        2500
    );

}


/* ==============================
   MOBILE MENU
================================ */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );


menuButton.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "open"
        );

    }
);


/* ==============================
   NEWSLETTER
================================ */

document
    .getElementById(
        "newsletterForm"
    )
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "Thanks for subscribing!"
            );

            event.target.reset();

        }
    );


/* ==============================
   INITIALIZE WEBSITE
================================ */

displayProducts();
updateCartCount();