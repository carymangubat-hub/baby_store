const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    Number(params.get("id"));


const product =
    getProductById(productId);


const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");


let quantity = 1;


let cart =
    JSON.parse(
        localStorage.getItem("littleStepsCart")
    ) || [];


/* =========================
   PRODUCT NOT FOUND
========================= */

if (!product) {

    document.getElementById(
        "productDetail"
    ).innerHTML = `

        <div class="product-not-found">

            <h1>
                Product not found
            </h1>

            <p>
                This product may no longer be available.
            </p>

            <a
                href="index.html"
                class="primary-button">

                Return to Shop

            </a>

        </div>

    `;

} else {

    displayProduct();

    displayRelatedProducts();

}


/* =========================
   DISPLAY PRODUCT
========================= */

function displayProduct() {

    document.title =
        `${product.name} | Little Steps Baby Care`;


    document.getElementById(
        "breadcrumbCategory"
    ).textContent =
        getCategoryName(product.category);


    document.getElementById(
        "breadcrumbName"
    ).textContent =
        product.name;


    document.getElementById(
        "detailBadge"
    ).textContent =
        product.badge;


    const image =
        document.getElementById(
            "detailImage"
        );

    image.src = product.image;
    image.alt = product.name;


    document.getElementById(
        "detailCategory"
    ).textContent =
        getCategoryName(product.category);


    document.getElementById(
        "detailName"
    ).textContent =
        product.name;


    document.getElementById(
        "detailStars"
    ).textContent =
        createStars(product.rating);


    document.getElementById(
        "detailRating"
    ).textContent =
        product.rating;


    document.getElementById(
        "detailReviewCount"
    ).textContent =
        `${product.reviewCount} reviews`;


    document.getElementById(
        "detailPrice"
    ).textContent =
        formatPrice(product.price);


    document.getElementById(
        "detailDescription"
    ).textContent =
        product.description;


    document.getElementById(
        "longDescription"
    ).textContent =
        product.description;


    const featureHTML =
        product.features
            .map(
                feature =>
                    `<li>✓ ${feature}</li>`
            )
            .join("");


    document.getElementById(
        "detailFeatures"
    ).innerHTML =
        featureHTML;


    document.getElementById(
        "fullFeatures"
    ).innerHTML =
        featureHTML;


    document.getElementById(
        "reviewRating"
    ).textContent =
        product.rating;


    document.getElementById(
        "reviewStars"
    ).textContent =
        createStars(product.rating);


    document.getElementById(
        "reviewTotal"
    ).textContent =
        `Based on ${product.reviewCount} demo ratings`;

}


/* =========================
   QUANTITY
========================= */

document.getElementById(
    "increaseQuantity"
)?.addEventListener(
    "click",
    () => {

        quantity++;

        updateQuantity();

    }
);


document.getElementById(
    "decreaseQuantity"
)?.addEventListener(
    "click",
    () => {

        if (quantity > 1) {
            quantity--;
        }

        updateQuantity();

    }
);


function updateQuantity() {

    document.getElementById(
        "quantity"
    ).textContent =
        quantity;

}


/* =========================
   ADD TO CART
========================= */

document.getElementById(
    "detailAddCart"
)?.addEventListener(
    "click",
    () => {

        addCurrentProductToCart();

        showToast(
            `${product.name} added to cart`
        );

    }
);


function addCurrentProductToCart() {

    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            id: product.id,
            quantity: quantity
        });

    }


    saveCart();

    updateCartCount();

}


/* =========================
   BUY NOW
========================= */

document.getElementById(
    "buyNow"
)?.addEventListener(
    "click",
    () => {

        addCurrentProductToCart();

        window.location.href =
            "cart.html";

    }
);


/* =========================
   RELATED PRODUCTS
========================= */

function displayRelatedProducts() {

    const container =
        document.getElementById(
            "relatedProducts"
        );


    let related =
        products.filter(
            item =>
                item.category ===
                    product.category &&
                item.id !== product.id
        );


    if (related.length < 4) {

        const extra =
            products.filter(
                item =>
                    item.id !== product.id &&
                    !related.some(
                        relatedItem =>
                            relatedItem.id === item.id
                    )
            );


        related =
            related.concat(extra);

    }


    related
        .slice(0, 4)
        .forEach(item => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image-wrapper">

                    <a
                        href="product.html?id=${item.id}"
                    >

                        <img
                            class="product-image"
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </a>


                    <span class="product-badge">
                        ${item.badge}
                    </span>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${getCategoryName(item.category)}
                    </span>


                    <a
                        href="product.html?id=${item.id}"
                        class="product-title-link"
                    >

                        <h3>
                            ${item.name}
                        </h3>

                    </a>


                    <div class="product-rating">

                        <span class="stars">
                            ${createStars(item.rating)}
                        </span>

                        <span>
                            ${item.rating}
                        </span>

                    </div>


                    <div class="product-bottom">

                        <strong class="product-price">
                            ${formatPrice(item.price)}
                        </strong>


                        <a
                            href="product.html?id=${item.id}"
                            class="view-product-button"
                        >
                            View
                        </a>

                    </div>

                </div>

            `;


            container.appendChild(card);

        });

}


/* =========================
   CART STORAGE
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
   TOAST
========================= */

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
        2500
    );

}


updateCartCount();