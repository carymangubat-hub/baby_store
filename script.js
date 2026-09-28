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


let cart =
    JSON.parse(
        localStorage.getItem("littleStepsCart")
    ) || [];


/* =========================
   DISPLAY PRODUCTS
========================= */

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


    productCount.textContent =
        `${filteredProducts.length} products`;


    noProducts.style.display =
        filteredProducts.length
            ? "none"
            : "block";


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image-wrapper">

                <a
                    href="product.html?id=${product.id}"
                    class="product-image-link"
                >

                    <img
                        class="product-image"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </a>


                <span class="product-badge">
                    ${product.badge}
                </span>


                <button
                    class="wishlist"
                    type="button"
                    aria-label="Add ${product.name} to wishlist"
                >
                    ♡
                </button>

            </div>


            <div class="product-info">

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


                <a
                    href="product.html?id=${product.id}#reviews"
                    class="product-rating"
                >

                    <span class="stars">
                        ${createStars(product.rating)}
                    </span>

                    <span>
                        ${product.rating}
                        (${product.reviewCount})
                    </span>

                </a>


                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatPrice(product.price)}
                    </strong>


                    <button
                        class="add-cart"
                        type="button"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

    activeCategory = category;


    document
        .querySelectorAll(".filter-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
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


/* CATEGORY CARDS */

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


/* NAVIGATION CATEGORY LINKS */

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


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    () => {

        searchTerm =
            searchInput.value.trim();

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


/* =========================
   PRODUCT BUTTONS
========================= */

productGrid.addEventListener(
    "click",
    event => {

        const cartButton =
            event.target.closest(".add-cart");

        const wishlistButton =
            event.target.closest(".wishlist");


        if (cartButton) {

            const id =
                Number(cartButton.dataset.id);

            addToCart(id);

        }


        if (wishlistButton) {

            wishlistButton.classList.toggle(
                "liked"
            );

            wishlistButton.textContent =
                wishlistButton.classList
                    .contains("liked")
                    ? "♥"
                    : "♡";

        }

    }
);


/* =========================
   CART
========================= */

function addToCart(id) {

    const product =
        getProductById(id);

    if (!product) {
        return;
    }


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();

    showToast(
        `${product.name} added to cart`
    );

}


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


    cartCount.textContent = total;

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        () => {
            toast.classList.remove("show");
        },
        2500
    );

}


/* =========================
   NEWSLETTER
========================= */

const newsletter =
    document.getElementById(
        "newsletterForm"
    );


newsletter.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        showToast(
            "Thanks for joining Little Steps!"
        );

        newsletter.reset();

    }
);


/* =========================
   MOBILE MENU
========================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const navLinks =
    document.getElementById("navLinks");


mobileMenu.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle("open");

    }
);


displayProducts();
updateCartCount();