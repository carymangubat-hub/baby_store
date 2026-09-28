const products = [
    {
        id: 1,
        name: "Extra Soft Baby Wipes",
        category: "diapers",
        price: 149,
        image: "images/products/baby-wipes.jpg",
        badge: "BEST SELLER",
        rating: 4.9,
        reviewCount: 186,
        description:
            "Soft and convenient baby wipes made for everyday cleanups at home or while travelling.",
        features: [
            "Soft everyday wipes",
            "Convenient resealable pack",
            "Perfect for diaper changes",
            "Easy to carry"
        ]
    },

    {
        id: 2,
        name: "Gentle Baby Lotion",
        category: "bath",
        price: 229,
        image: "images/products/baby-lotion.jpg",
        badge: "POPULAR",
        rating: 4.8,
        reviewCount: 127,
        description:
            "A lightweight everyday moisturizing lotion for baby's delicate skin.",
        features: [
            "Gentle everyday care",
            "Lightweight moisturizing formula",
            "Easy pump bottle",
            "Suitable for daily use"
        ]
    },

    {
        id: 3,
        name: "Gentle Baby Wash",
        category: "bath",
        price: 249,
        image: "images/products/baby-wash.jpg",
        badge: "NEW",
        rating: 4.9,
        reviewCount: 94,
        description:
            "A gentle baby wash made for easy everyday bath-time care.",
        features: [
            "Gentle cleansing",
            "Easy pump bottle",
            "Made for bath time",
            "Everyday baby care"
        ]
    },

    {
        id: 4,
        name: "Moisturizing Baby Cream",
        category: "bath",
        price: 199,
        image: "images/products/baby-cream.jpg",
        badge: "20% OFF",
        rating: 4.7,
        reviewCount: 73,
        description:
            "A rich moisturizing cream for baby's everyday skin-care routine.",
        features: [
            "Rich moisturizing texture",
            "Easy-to-use container",
            "Gentle everyday care",
            "Compact size"
        ]
    },

    {
        id: 5,
        name: "Soft Baby Diapers",
        category: "diapers",
        price: 399,
        image: "images/products/diapers.jpg",
        badge: "POPULAR",
        rating: 4.8,
        reviewCount: 211,
        description:
            "Comfortable everyday diapers designed for convenient changing.",
        features: [
            "Soft construction",
            "Everyday comfort",
            "Convenient pack",
            "Easy changing"
        ]
    },

    {
        id: 6,
        name: "Anti-Colic Feeding Bottle",
        category: "feeding",
        price: 299,
        image: "images/products/feeding-bottle.jpg",
        badge: "NEW",
        rating: 4.6,
        reviewCount: 68,
        description:
            "A practical feeding bottle designed for comfortable everyday feeding.",
        features: [
            "Easy-grip bottle",
            "Secure bottle cap",
            "Convenient feeding design",
            "Easy to clean"
        ]
    },

    {
        id: 7,
        name: "Baby Care Gift Set",
        category: "bath",
        price: 799,
        image: "images/products/gift-set.jpg",
        badge: "GIFT SET",
        rating: 4.9,
        reviewCount: 156,
        description:
            "A beautifully coordinated collection of Little Steps baby-care essentials.",
        features: [
            "Multiple baby-care essentials",
            "Gift-ready presentation",
            "Matching Little Steps collection",
            "Great for new parents"
        ]
    },

    {
        id: 8,
        name: "Soft Cotton Baby Clothes",
        category: "clothing",
        price: 499,
        image: "images/products/baby-clothes.jpg",
        badge: "20% OFF",
        rating: 4.8,
        reviewCount: 81,
        description:
            "Soft baby clothing designed for comfortable everyday wear.",
        features: [
            "Soft fabric",
            "Comfortable fit",
            "Everyday baby clothing",
            "Easy-care design"
        ]
    },

    {
        id: 9,
        name: "Digital Baby Thermometer",
        category: "health",
        price: 349,
        image: "images/products/thermometer.jpg",
        badge: "ESSENTIAL",
        rating: 4.7,
        reviewCount: 102,
        description:
            "A compact digital thermometer for convenient temperature checks.",
        features: [
            "Digital display",
            "Compact design",
            "Simple operation",
            "Easy to store"
        ]
    },

    {
        id: 10,
        name: "Baby Grooming Kit",
        category: "health",
        price: 599,
        image: "images/products/grooming-kit.jpg",
        badge: "POPULAR",
        rating: 4.6,
        reviewCount: 59,
        description:
            "A convenient collection of everyday baby grooming essentials.",
        features: [
            "Multiple grooming tools",
            "Organized storage case",
            "Travel-friendly",
            "Useful everyday essentials"
        ]
    },

    {
        id: 11,
        name: "Baby Rattle Set",
        category: "toys",
        price: 299,
        image: "images/products/baby-rattle.jpg",
        badge: "NEW",
        rating: 4.8,
        reviewCount: 77,
        description:
            "A colorful rattle set for supervised baby playtime.",
        features: [
            "Colorful design",
            "Easy-to-hold shapes",
            "Multiple pieces",
            "Great for playtime"
        ]
    },

    {
        id: 12,
        name: "Soft Teddy Bear",
        category: "toys",
        price: 399,
        image: "images/products/teddy-bear.jpg",
        badge: "BEST SELLER",
        rating: 4.9,
        reviewCount: 143,
        description:
            "A soft teddy bear companion for your little one's nursery and playtime.",
        features: [
            "Soft plush design",
            "Cute neutral styling",
            "Nursery-friendly",
            "Gift-ready"
        ]
    },

    {
        id: 13,
        name: "Baby Training Cup",
        category: "feeding",
        price: 279,
        image: "images/products/training-cup.jpg",
        badge: "POPULAR",
        rating: 4.6,
        reviewCount: 65,
        description:
            "A practical training cup designed for growing little ones.",
        features: [
            "Easy-grip handles",
            "Compact design",
            "Simple drinking spout",
            "Easy to clean"
        ]
    },

    {
        id: 14,
        name: "Newborn Bodysuit Set",
        category: "clothing",
        price: 599,
        image: "images/products/bodysuit.jpg",
        badge: "NEW",
        rating: 4.9,
        reviewCount: 119,
        description:
            "A coordinated newborn bodysuit set for comfortable everyday wear.",
        features: [
            "Soft fabric",
            "Newborn-friendly design",
            "Coordinated set",
            "Everyday comfort"
        ]
    },

    {
        id: 15,
        name: "Sensitive Skin Baby Soap",
        category: "bath",
        price: 129,
        image: "images/products/baby-soap.jpg",
        badge: "GENTLE",
        rating: 4.7,
        reviewCount: 88,
        description:
            "A simple baby soap for your little one's everyday bath-time routine.",
        features: [
            "Gentle cleansing",
            "Compact bar",
            "Everyday bath care",
            "Easy to store"
        ]
    },

    {
        id: 16,
        name: "Premium Newborn Diapers",
        category: "diapers",
        price: 449,
        image: "images/products/premium-diapers.jpg",
        badge: "BEST SELLER",
        rating: 4.9,
        reviewCount: 235,
        description:
            "Premium newborn diapers designed for soft everyday comfort.",
        features: [
            "Designed for newborns",
            "Soft construction",
            "Convenient pack",
            "Everyday changing essential"
        ]
    }
];


function getProductById(id) {
    return products.find(product => product.id === Number(id));
}


function getCategoryName(category) {

    const categories = {
        diapers: "Diapers & Wipes",
        bath: "Bath & Skin Care",
        feeding: "Feeding",
        health: "Health & Safety",
        toys: "Toys & Playtime",
        clothing: "Baby Clothing"
    };

    return categories[category] || category;
}


function formatPrice(price) {
    return `₱${price.toLocaleString("en-PH")}`;
}


function createStars(rating) {

    const rounded = Math.round(rating);

    return "★".repeat(rounded) +
           "☆".repeat(5 - rounded);
}