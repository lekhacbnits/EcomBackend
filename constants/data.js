const  products = [
    { 
       name:"product1",
       description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',

      
        price:500,
        //  {
        //     mrp: 1195,
        //     cost: 625,
        //     discount: '47%'
        // },
        category: "electric",
        url: 'https://images-eu.ssl-images-amazon.com/images/I/31BMd11KciL._AC_SX184_.jpg', 
        detailUrl: 'https://images-eu.ssl-images-amazon.com/images/I/31BMd11KciL._AC_SX184_.jpg', 
        title: {
            shortTitle: 'Home & Kitchen',
            longTitle: 'Pigeon FAVOURITE Electric Kettle  (1.5 L, Silver, Black)'
        }, 
        quantity: 1,
        discount: 'Extra 10% Off', 
        tagline: 'Deal of the day' 
    },
    { 
       name:"product2",   
      description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',

      price:600,

        category: "electric",

        url: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/Wireless/shasvijo/AUG_ART_2022/434x530_hex_1._CB630580113_.jpg', 
        detailUrl: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/Wireless/shasvijo/AUG_ART_2022/434x530_hex_1._CB630580113_.jpg', 
        title: {
            shortTitle: 'Sandwich Makers',
            longTitle: 'Flipkart SmartBuy Sandwich 01 Grill  (Black)'
        },
        // price: {
        //     mrp: 1499,
        //     cost: 899,
        //     discount: '40%'
        // },
        quantity: 1,
        discount: 'From 99+5% Off', 
        tagline: 'Pestige, Nova & more' 
    },
    { 
       name: "product3",
       description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',

        url: 'https://images-eu.ssl-images-amazon.com/images/I/715Vz2m6BvL._AC_UL450_SR450,320_.jpg', 
        detailUrl: 'https://images-eu.ssl-images-amazon.com/images/I/715Vz2m6BvL._AC_UL450_SR450,320_.jpg', 
        title: {
            shortTitle: 'Fitness Gear',
            longTitle: 'AJRO DEAL New Adjustable Single Resistance Tube (Multicolor) Resistance Tube  (Multicolor)'
        }, 
        category: "electric",

        price:500,
        // price: {
        //     mrp: 499,
        //     cost: 166,
        //     discount: '66%'
        // },
        quantity: 1,
        discount: 'Upto 70% Off', 
        tagline: 'Deal of the Day' 
    },
    { 
       name:"product4",
       description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',

        url: 'https://images-eu.ssl-images-amazon.com/images/I/61YRI2+SIIL._AC_UL450_SR450,320_.jpg', 
        detailUrl: 'https://images-eu.ssl-images-amazon.com/images/I/61YRI2+SIIL._AC_UL450_SR450,320_.jpg', 
        title: {
            shortTitle: 'Smart Watches',
            longTitle: 'Molife Sense 500 Smartwatch  (Black Strap, Freesize)',
        }, 
        category: "electric",

        price: 250,
        // price: {
        //     mrp: 6999,
        //     cost: 4049,
        //     discount: '42%'
        // },
        quantity: 1,
        discount: 'Grab Now', 
        tagline: 'Best Seller' 
    },
    { 
       name:"product5",
       description: 'Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.',

        url: 'https://images-eu.ssl-images-amazon.com/images/I/51QnuLIY2uL._AC_SX184_.jpg', 
        detailUrl: 'https://images-eu.ssl-images-amazon.com/images/I/51QnuLIY2uL._AC_SX184_.jpg', 
        title: {
            shortTitle: 'Trimmers, Dryers & more',
            longTitle: 'Nova Professional NHP 8220 Hair Dryer  (1800 W, Multicolor)'
        }, 
        price:800,
        category:"bcdh",
        // price: {
        //     mrp: 1899,
        //     cost: 1124,
        //     discount: '40%'
        // },
        quantity: 1,
        description: '',
        discount: 'From ₹499', 
        tagline: 'Kubra, Nova & more' 
    },
    { 
        name: 'product6',
        description: 'Table Fan. Perfect size fan for use on a table, desk or in an RV. Whisper quiet, powerful airflow and reliable operation in a compact 6" size. Two adjustable speeds to customize airflow: high or low settings. Tough break-resistant ABS plastic blades. ',

        url: 'https://m.media-amazon.com/images/I/81iUXe9ygkL._AC_UY327_FMwebp_QL65_.jpg', 
        detailUrl: 'https://m.media-amazon.com/images/I/81iUXe9ygkL._AC_UY327_FMwebp_QL65_.jpg', 
        title: {
            shortTitle: 'Table Fans',
            longTitle: 'Portable 300 mm Ultra High Speed 3 Blade Table Fan  (Black, Pack of 1)'
        }, 
        price:900,
        category: "electric",

        // price: {
        //     mrp: 2250,
        //     cost: 1199,
        //     discount: '46%'
        // },
        quantity: 1,
        discount: 'Minimum 40% Off', 
        tagline: 'Top Selling' 
    },
    { 
        name: 'product7',
        description: 'Let music brighten up your mood anytime, anywhere with the boAt 235v2 Fast Charging Bluetooth Headset. This Bluetooth headset features a Call Vibration Alert, a Fast Charging Technology, and Easy Access Controls to listen to and manage your favorite music with ease.',

        url: 'https://m.media-amazon.com/images/I/71-ZoZzeKiL._AC_UY327_FMwebp_QL65_.jpg', 
        detailUrl: 'https://m.media-amazon.com/images/I/71-ZoZzeKiL._AC_UY327_FMwebp_QL65_.jpg', 
        title: {
            shortTitle: 'Headphones',
            longTitle: 'boAt Rockerz 235v2 with ASAP charging Version 5.0 Bluetooth Headset '
        }, 
        price:500,
        category: "electric",

        // price: {
        //     mrp: 2990,
        //     cost: 1199,
        //     discount: '59%'
        // },
        quantity: 1,
        discount: 'Minimum 50% Off', 
        tagline: 'Grab Now!' 
    }
];

module.exports =  products