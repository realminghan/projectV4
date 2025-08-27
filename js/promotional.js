// Floating icons data
const floatingIcons = [
    { icon: 'fas fa-hamburger', size: 'fa-3x' },
    { icon: 'fas fa-pizza-slice', size: 'fa-2x' },
    { icon: 'fas fa-coffee', size: 'fa-2x' },
    { icon: 'fas fa-fish', size: 'fa-3x' }
];

// Promotions data with URLs
const promotions = [
    {
        title: 'Burger Bonanza',
        icon: 'fas fa-hamburger',
        iconColor: 'text-warning',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
        badge: 'BOGO',
        description: 'Buy 1 Get 1 Free on all burgers this weekend only! Double the flavor, double the fun!',
        buttonText: 'Grab Deal',
        buttonIcon: 'fas fa-fire',
        url: '#burger-deals' // Added URL
    },
    {
        title: 'Pizza Party',
        icon: 'fas fa-pizza-slice',
        iconColor: 'text-danger',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop',
        badge: '30% OFF',
        description: 'Get 30% off on all large pizzas every Friday night! Perfect for weekend celebrations.',
        buttonText: 'Order Now',
        buttonIcon: 'fas fa-shopping-cart',
        url: '#pizza-deals' // Added URL
    },
    {
        title: 'Sushi Special',
        icon: 'fas fa-fish',
        iconColor: 'text-info',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
        badge: '25% OFF',
        description: 'Enjoy 25% off sushi sets all day on Mondays! Fresh ingredients, authentic taste.',
        buttonText: 'Get Offer',
        buttonIcon: 'fas fa-percent',
        url: '#sushi-deals' // Added URL
    },
    {
        title: 'Dessert Delight',
        icon: 'fas fa-ice-cream',
        iconColor: 'text-success',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop',
        badge: 'FREE',
        description: 'Free dessert with every meal purchased this weekend! Sweet endings to perfect meals.',
        buttonText: 'Claim Now',
        buttonIcon: 'fas fa-gift',
        url: '#dessert-deals' // Added URL
    },
    {
        title: 'Coffee Craze',
        icon: 'fas fa-coffee',
        iconColor: 'text-warning',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
        badge: 'BOGO',
        description: 'Happy hour: Buy 1 Get 1 Free coffee from 2pm to 5pm daily. Perfect afternoon boost!',
        buttonText: 'Enjoy Now',
        buttonIcon: 'fas fa-clock',
        url: '#coffee-deals' // Added URL
    },
    {
        title: 'Seafood Sensation',
        icon: 'fas fa-fish',
        iconColor: 'text-primary',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=250&fit=crop',
        badge: '50% OFF',
        description: '50% off seafood platters every Saturday night only! Ocean fresh, chef prepared.',
        buttonText: 'Book Now',
        buttonIcon: 'fas fa-calendar-check',
        url: '#seafood-deals' // Added URL
    }
];

// Function to create floating icons
function createFloatingIcons() {
    const container = document.getElementById('floatingIcons');

    floatingIcons.forEach(iconData => {
        const icon = document.createElement('i');
        icon.className = `${iconData.icon} ${iconData.size} floating-icon`;
        container.appendChild(icon);
    });
}

// Function to create promotion cards
function createPromotionCards() {
    const container = document.getElementById('promoCards');

    promotions.forEach((promo, index) => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12';

        col.innerHTML = `
            <div class="card promo-card">
                <div class="card-img-container">
                    <img src="${promo.image}" class="card-img-top" alt="${promo.title}" loading="lazy">
                    <div class="promo-badge">${promo.badge}</div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="${promo.icon} ${promo.iconColor}"></i>
                        ${promo.title}
                    </h5>
                    <p class="card-text">${promo.description}</p>
                    <button class="btn promo-btn w-100" onclick="handlePromoClick('${promo.url}')">
                        <i class="${promo.buttonIcon}"></i> ${promo.buttonText}
                    </button>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

function handlePromoClick(url) {
    // Additional logic here before redirecting
    console.log(`Redirecting to: ${url}`);
    // You can replace this with actual navigation logic
    alert(`This would redirect to: ${url}`);
    // window.location.href = url; // Uncomment this for actual navigation
}

// Alternative navigation function with more control
function navigateTo(url) {
    console.log(`Navigating to: ${url}`);
    window.location.href = url;
}

// Add interactive features
function addInteractiveFeatures() {
    const cards = document.querySelectorAll('.promo-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Removed the non-existent createNavigation() function call
    createFloatingIcons();
    createPromotionCards();

    // Add fade-in animation to cards after creation
    setTimeout(() => {
        const cards = document.querySelectorAll('.promo-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';

                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });
    }, 100);

    // Add interactive features
    setTimeout(addInteractiveFeatures, 500);
});