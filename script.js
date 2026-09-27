/* ========================================
   LITTLE STEPS PRODUCT DATABASE
======================================== */

const products = [

    {
        id: 1,
        name: "Extra Soft Baby Wipes",
        category: "diapers",
        price: 149,
        image: "images/products/baby-wipes.jpg",
        badge: "BEST SELLER",
        rating: 5
    },

    {
        id: 2,
        name: "Gentle Baby Lotion",
        category: "bath",
        price: 229,
        image: "images/products/baby-lotion.jpg",
        badge: "NEW",
        rating: 5
    },

    {
        id: 3,
        name: "Gentle Baby Wash",
        category: "bath",
        price: 249,
        image: "images/products/baby-wash.jpg",
        badge: "NEW",
        rating: 5
    },

    {
        id: 4,
        name: "Moisturizing Baby Cream",
        category: "bath",
        price: 199,
        image: "images/products/baby-cream.jpg",
        badge: "20% OFF",
        rating: 5
    },

    {
        id: 5,
        name: "Soft Baby Diapers",
        category: "diapers",
        price: 399,
        image: "images/products/diapers.jpg",
        badge: "POPULAR",
        rating: 5
    },

    {
        id: 6,
        name: "Anti-Colic Feeding Bottle",
        category: "feeding",
        price: 299,
        image: "images/products/feeding-bottle.jpg",
        badge: "NEW",
        rating: 4
    },

    {
        id: 7,
        name: "Baby Care Gift Set",
        category: "bath",
        price: 799,
        image: "images/products/gift-set.jpg",
        badge: "GIFT SET",
        rating: 5
    },

    {
        id: 8,
        name: "Soft Cotton Baby Clothes",
        category: "clothing",
        price: 499,
        image: "images/products/baby-clothes.jpg",
        badge: "20% OFF",
        rating: 5
    },

    {
        id: 9,
        name: "Digital Baby Thermometer",
        category: "health",
        price: 349,
        image: "images/products/thermometer.jpg",
        badge: "ESSENTIAL",
        rating: 5
    },

    {
        id: 10,
        name: "Baby Grooming Kit",
        category: "health",
        price: 599,
        image: "images/products/grooming-kit.jpg",
        badge: "POPULAR",
        rating: 4
    },

    {
        id: 11,
        name: "Baby Rattle Set",
        category: "toys",
        price: 299,
        image: "images/products/baby-rattle.jpg",
        badge: "NEW",
        rating: 5
    },

    {
        id: 12,
        name: "Soft Teddy Bear",
        category: "toys",
        price: 399,
        image: "images/products/teddy-bear.jpg",
        badge: "BEST SELLER",
        rating: 5
    },

    {
        id: 13,
        name: "Baby Training Cup",
        category: "feeding",
        price: 279,
        image: "images/products/training-cup.jpg",
        badge: "POPULAR",
        rating: 4
    },

    {
        id: 14,
        name: "Newborn Bodysuit Set",
        category: "clothing",
        price: 599,
        image: "images/products/bodysuit.jpg",
        badge: "NEW",
        rating: 5
    },

    {
        id: 15,
        name: "Sensitive Skin Baby Soap",
        category: "bath",
        price: 129,
        image: "images/products/baby-soap.jpg",
        badge: "GENTLE",
        rating: 5
    },

    {
        id: 16,
        name: "Premium Newborn Diapers",
        category: "diapers",
        price: 449,
        image: "images/products/premium-diapers.jpg",
        badge: "BEST SELLER",
        rating: 5
    }

];


/* ========================================
   ELEMENTS
======================================== */

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


let activeCategory = "all";

let searchTerm = "";


/* ========================================
   LOAD SAVED CART
======================================== */

let cart =
    JSON.parse(
        localStorage.getItem("littleStepsCart")
    ) || [];


/* ========================================
   CATEGORY NAME
======================================== */

function getCategoryName(category) {

    const categories = {
        diapers: "Diapers & Wipes",
        bath: "Bath & Skin Care",
        feeding: "Feeding",
        health: "Health & Safety",
        toys: "Toys & Playtime",
        clothing: "Clothing"
    };

    return categories[category] || category;
}


/* ========================================
   DISPLAY PRODUCTS
======================================== */

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


            return categoryMatch && searchMatch;

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

            <div class="product-image">

                <span class="product-badge">
                    ${product.badge}
                </span>

                <button
                    class="wishlist"
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

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

                    <strong class="price">
                        ₱${product.price.toLocaleString()}
                    </strong>

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


    noProducts.style.display =
        filteredProducts.length === 0
            ? "block"
            : "none";
}


/* ========================================
   FILTER PRODUCTS
======================================== */

function filterProducts(category) {

    activeCategory = category;


    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === category
            ) {

                button.classList.add("active");

            }

        });


    displayProducts();


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ========================================
   FILTER BUTTONS
======================================== */

document
    .querySelectorAll(".filter-button")
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


/* ========================================
   CATEGORY CARDS
======================================== */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                filterProducts(
                    card.dataset.category
                );

            }
        );

    });


/* ========================================
   NAVIGATION CATEGORY LINKS
======================================== */

document
    .querySelectorAll(
        ".nav-links [data-category]"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                filterProducts(
                    link.dataset.category
                );

            }
        );

    });


/* ========================================
   SEARCH
======================================== */

searchInput.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value.trim();

        displayProducts();

    }
);


searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        searchTerm =
            searchInput.value.trim();

        displayProducts();


        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ========================================
   ADD TO CART / WISHLIST
======================================== */

productGrid.addEventListener(
    "click",
    event => {

        /* ADD TO CART */

        if (
            event.target.classList
                .contains("add-cart")
        ) {

            const productId =
                Number(
                    event.target.dataset.id
                );


            const product =
                products.find(
                    product =>
                        product.id === productId
                );


            const existingProduct =
                cart.find(
                    item =>
                        item.id === productId
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    ...product,
                    quantity: 1
                });

            }


            saveCart();

            updateCartCount();


            showToast(
                `${product.name} added to cart`
            );

        }


        /* WISHLIST */

        if (
            event.target.classList
                .contains("wishlist")
        ) {

            event.target.classList.toggle(
                "liked"
            );


            if (
                event.target.classList
                    .contains("liked")
            ) {

                event.target.textContent = "♥";

                showToast(
                    "Added to wishlist"
                );

            } else {

                event.target.textContent = "♡";

                showToast(
                    "Removed from wishlist"
                );

            }

        }

    }
);


/* ========================================
   SAVE CART
======================================== */

function saveCart() {

    localStorage.setItem(
        "littleStepsCart",
        JSON.stringify(cart)
    );

}


/* ========================================
   CART COUNTER
======================================== */

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


/* ========================================
   TOAST
======================================== */

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


/* ========================================
   NEWSLETTER
======================================== */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            showToast(
                "Thank you for subscribing!"
            );

            event.target.reset();

        }
    );


/* ========================================
   MOBILE MENU
======================================== */

document
    .getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("navLinks")
                .classList.toggle("open");

        }
    );


/* ========================================
   INITIAL LOAD
======================================== */

displayProducts();

updateCartCount();