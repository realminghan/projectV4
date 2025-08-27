/*
Done by : Lee Ming Han 2204232

1. The section of this code is mainly will be generated automatically when new object is added to the list.

*/

$(document).ready(function () {
    const posts = [
        {
            img: "../images/blog/porridge.png",
            date: "August 17, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Ming Kee Porridge | SS2 | Petaling Jaya",
            excerpt: "I'm not personally the biggest fan of porridge, so you can bet that it has to be a pretty tasty looking porridge...",
            link: "#"
        },
        {
            img: "../images/blog/patkraphao.png",
            date: "August 2, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Bai Gra Pow | Bangsar",
            excerpt: "This is a new Thai spot in Bangsar that I would say is on the more reasonable and price-wise side...",
            link: "#"
        },
        {
            img: "../images/blog/nasilemak.png",
            date: "July 26, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Best Nasi Lemak in Petaling Jaya / KL",
            excerpt: "Everyone has a different favourite, so here's just my way of saying, I want to join the conversation...",
            link: "#"
        },
        {
            img: "../images/blog/dimsum.png",
            date: "July 18, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Dim Sum Paradise | Subang Jaya",
            excerpt: "Sunday morning dim sum is a tradition that never gets old. This hidden gem serves authentic Cantonese flavors...",
            link: "#"
        },
        {
            img: "../images/blog/satay.png",
            date: "June 28, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Satay Station | Kajang",
            excerpt: "No trip to Kajang is complete without authentic satay. The smoky aroma and tender meat make this a must-visit...",
            link: "#"
        },
        {
            img: "../images/blog/laksa.png",
            date: "June 15, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Laksa Lovers | Penang Style",
            excerpt: "The eternal debate: Assam laksa or curry laksa? Today we're diving deep into Penang's signature dish...",
            link: "#"
        },
        {
            img: "../images/blog/roticanai.png",
            date: "June 8, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Roti Canai Revolution | Mamak Stall",
            excerpt: "From plain to tissue paper thin, roti canai is an art form. This mamak stall has perfected the craft...",
            link: "#"
        },
        {
            img: "../images/blog/charkueytiew.png",
            date: "May 25, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Char Kway Teow Chronicles | Georgetown",
            excerpt: "The wok hei, the perfect balance of sweet and savory - this Georgetown stall knows how to do CKT right...",
            link: "#"
        },
        {
            img: "../images/blog/bakkuteh.png",
            date: "May 18, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Bak Kut Teh Bonanza | Klang",
            excerpt: "Herbal, peppery, and soul-warming. Klang's famous bak kut teh is a comfort food that hits all the right notes...",
            link: "#"
        },
        {
            img: "../images/blog/aiskacang.png",
            date: "May 10, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Cendol & ABC Special | Melaka",
            excerpt: "Beat the heat with Malaysia's favorite desserts. The gula melaka and coconut milk combination is pure bliss...",
            link: "#"
        },
        {
            img: "../images/blog/banaleaf.png",
            date: "April 30, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Indian Banana Leaf Rice | Brickfields",
            excerpt: "The complete banana leaf experience with all the traditional sides. Little India never disappoints with authenticity...",
            link: "#"
        },
        {
            img: "../images/blog/hookeanmee.png",
            date: "April 22, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Hokkien Mee Masterclass | KL Chinatown",
            excerpt: "Dark soy sauce, fresh prawns, and that distinctive smoky flavor. Chinatown's version is the gold standard...",
            link: "#"
        },
        {
            img: "../images/blog/tehtarik.png",
            date: "April 15, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Teh Tarik & Toast | Kopitiam Culture",
            excerpt: "The morning ritual of every Malaysian. Perfect teh tarik paired with kaya toast at this nostalgic kopitiam...",
            link: "#"
        },
        {
            img: "../images/blog/curryfish.png",
            date: "March 28, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Curry Fish Head | Ampang",
            excerpt: "Spicy, tangy, and loaded with vegetables. This curry fish head is perfect for sharing with friends and family...",
            link: "#"
        },
        {
            img: "../images/blog/wontonnoodles.png",
            date: "March 20, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Wonton Noodles | Petaling Street",
            excerpt: "Silky noodles, perfectly seasoned wontons, and that clear broth. Petaling Street's hidden gem serves perfection...",
            link: "#"
        },
        {
            img: "../images/blog/mamak.png",
            date: "March 12, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Mee Goreng Mamak | Late Night Feast",
            excerpt: "When hunger strikes after midnight, mamak mee goreng is the answer. Spicy, satisfying, and available 24/7...",
            link: "#"
        },
        {
            img: "../images/blog/chickenrice.png",
            date: "March 5, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Chicken Rice Showdown | Hainanese vs Local",
            excerpt: "The classic debate continues. Today we compare traditional Hainanese style with local Malaysian adaptations...",
            link: "#"
        },
        {
            img: "../images/blog/asampedas.png",
            date: "February 25, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Assam Pedas Adventure | Melaka Specialty",
            excerpt: "Tangy, spicy, and bursting with flavor. This Melaka specialty showcases the best of Peranakan cuisine...",
            link: "#"
        },
        {
            img: "../images/blog/rojak.png",
            date: "February 18, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Rojak Rendezvous | Fruit & Vegetable Mix",
            excerpt: "Sweet, sour, spicy, and crunchy all in one dish. This rojak stall creates the perfect balance of flavors...",
            link: "#"
        },
        {
            img: "../images/blog/ytf.png",
            date: "February 10, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Yong Tau Fu | Hakka Comfort Food",
            excerpt: "Fresh vegetables stuffed with fish paste and served in clear soup. Simple ingredients, extraordinary taste...",
            link: "#"
        },
        {
            img: "../images/blog/panmee.png",
            date: "February 3, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Pan Mee Hand-Pulled | Cheras Discovery",
            excerpt: "Watch the noodles being pulled right before your eyes. This Cheras stall keeps the traditional art alive...",
            link: "#"
        },
        {
            img: "../images/blog/claypot.png",
            date: "January 28, 2025",
            author: "Lee Ming Han",
            title: "Food Blog | Claypot Rice | Slow-Cooked Perfection",
            excerpt: "The crispy bottom layer, perfectly steamed rice, and savory toppings. Claypot rice is comfort food at its finest...",
            link: "#"
        }
    ];

    const container = $("#food-blog-container");
    posts.forEach(post => {
        const card = `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="food-blog-card">
                <img src="${post.img}" class="img-fluid blog-img" alt="${post.title}">
                <div class="food-blog-content">
                    <small class="text-muted d-block mb-2">${post.date} • ${post.author}</small>
                    <h4 class="blog-title">${post.title}</h4>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="${post.link}" class="read-more">READ MORE →</a>
                </div>
            </div>
        </div>`;
        container.append(card);
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([3.139, 101.6869], 6);

    // Use OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Hardcoded array of 20 food locations
    const foodLocations = [
        { name: "Nasi Kandar Line Clear", latitude: 5.4194, longitude: 100.3327 },
        { name: "Restoran Capitol Satay", latitude: 2.1967, longitude: 102.2461 },
        { name: "Village Park Nasi Lemak", latitude: 3.1455, longitude: 101.6225 },
        { name: "Kin Kin Chili Pan Mee", latitude: 3.1656, longitude: 101.7010 },
        { name: "Restoran Fatty Crab", latitude: 3.1215, longitude: 101.6158 },
        { name: "Lok Lok Street", latitude: 5.4190, longitude: 100.3272 },
        { name: "Gurney Drive Hawker Centre", latitude: 5.4370, longitude: 100.3099 },
        { name: "Hameediyah Restaurant", latitude: 5.4179, longitude: 100.3288 },
        { name: "Restoran Kari Kepala Ikan SG", latitude: 3.0821, longitude: 101.5206 },
        { name: "Restoran Sambal Hijau", latitude: 3.1575, longitude: 101.6021 },
        { name: "Tg. Tualang Seafood", latitude: 4.3385, longitude: 101.0569 },
        { name: "Restoran Wong Ah Wah", latitude: 3.1389, longitude: 101.6989 },
        { name: "Restoran Kayu Nasi Kandar", latitude: 3.0810, longitude: 101.6075 },
        { name: "Nasi Ganja Ipoh", latitude: 4.5975, longitude: 101.0901 },
        { name: "Ipoh Tuck Kee", latitude: 4.5980, longitude: 101.0889 },
        { name: "Gerai Rojak Pasembur", latitude: 5.4165, longitude: 100.3250 },
        { name: "Mee Udang Banjir", latitude: 5.2391, longitude: 100.4914 },
        { name: "Laksa Teluk Kechai", latitude: 6.0700, longitude: 100.3698 },
        { name: "Pasar Malam SS2", latitude: 3.1155, longitude: 101.6165 },
        { name: "Cendol Kampung Hulu", latitude: 2.1963, longitude: 102.2468 }
    ];

    // Add markers to the map
    foodLocations.forEach(spot => {
        const lat = parseFloat(spot.latitude);
        const lng = parseFloat(spot.longitude);
        const name = spot.name || "Unnamed Place";

        if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.marker([lat, lng]).addTo(map);
            const gmapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            marker.bindPopup(`<strong><a href="${gmapLink}" target="_blank">${name}</a></strong>`);
        }
    });
});
