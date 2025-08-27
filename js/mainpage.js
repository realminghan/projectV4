$(document).ready(function () {
    'use strict';
    initializeNavigation();
    initializeVideoSection();
    initializeReviewSystem();
    initializeRestaurantCarousel();
    initializeInteractiveElements();
    initializePerformanceOptimizations();
    console.log('JomBite loaded successfully with dynamic reviews!');
});

function initializeNavigation() {
    console.log('Navigation initialized');
    
    $('.navbar-nav .nav-link').on('click', function(e) {
        const target = $(this).attr('href');
        if (target && target.startsWith('#')) {
            e.preventDefault();
            const targetElement = $(target);
            if (targetElement.length) {
                $('html, body').animate({
                    scrollTop: targetElement.offset().top - 80
                }, 800);
            }
        }
    });

    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });
}

function initializeInteractiveElements() {
    console.log('Interactive elements initialized');
    
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutCubic');
        }
    });

    $('.card, .restaurant-card').hover(
        function() {
            $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
        }
    );
}

function initializePerformanceOptimizations() {
    console.log('Performance optimizations initialized');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

function initializeRestaurantCarousel() {
    console.log('Restaurant carousel initialized');
    
    setTimeout(() => {
        const track = document.querySelector('.restaurant-track');
        const cards = document.querySelectorAll('.restaurant-card');
        const carousel = document.querySelector('.restaurant-carousel');

        if (!track || !cards.length || !carousel) {
            console.warn('Carousel elements not found');
            return;
        }

        const gap = 20;
        const cardWidth = cards[0].offsetWidth + gap;
        let index = 0;

        let visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        let maxIndex = Math.max(0, cards.length - visibleCards);

        function updateCarousel() {
            track.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        window.addEventListener("resize", debounce(() => {
            visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
            maxIndex = Math.max(0, cards.length - visibleCards);
            if (index > maxIndex) index = 0;
            updateCarousel();
        }, 250));

        let autoSlide = setInterval(() => {
            index = index >= maxIndex ? 0 : index + 1;
            updateCarousel();
        }, 3000);

        carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
        carousel.addEventListener("mouseleave", () => {
            autoSlide = setInterval(() => {
                index = index >= maxIndex ? 0 : index + 1;
                updateCarousel();
            }, 3000);
        });

        updateCarousel();
    }, 100);
}

function initializeReviewSystem() {
    const reviewsData = {
        reviews: [
            {
                id: 1,
                name: "John Doe",
                image: "../images/reviewer1.jpg",
                rating: 5,
                comment: "The food here is amazing! Highly recommended!",
                date: "2025-01-15",
                verified: true
            },
            {
                id: 2,
                name: "Jane Smith",
                image: "../images/reviewer2.jpg",
                rating: 4,
                comment: "Loved the experience, will definitely come again!",
                date: "2025-01-10",
                verified: true
            },
            {
                id: 3,
                name: "Michael Lee",
                image: "../images/reviewer3.jpg",
                rating: 5,
                comment: "Best street food in Malaysia, hands down!",
                date: "2025-01-08",
                verified: true
            },
            {
                id: 4,
                name: "Alicia Tan",
                image: "../images/reviewer4.jpg",
                rating: 4,
                comment: "Nice ambience, fast service, and delicious food!",
                date: "2025-01-05",
                verified: false
            },
            {
                id: 5,
                name: "Chris Wong",
                image: "../images/reviewer5.jpg",
                rating: 5,
                comment: "Affordable prices with top-notch quality food!",
                date: "2025-01-03",
                verified: true
            },
            {
                id: 6,
                name: "Nurul Izzah",
                image: "../images/reviewer6.jpg",
                rating: 4,
                comment: "A perfect spot for foodies! Totally worth it!",
                date: "2025-01-01",
                verified: true
            }
        ],
        currentPage: 1,
        reviewsPerPage: 6,
        totalReviews: function () {
            return this.reviews.length;
        },
        averageRating: function () {
            if (this.reviews.length === 0) return 0;
            const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
            return (sum / this.reviews.length).toFixed(1);
        }
    };

    const reviewManager = {
        addReview: function (reviewData) {
            const newReview = {
                id: reviewsData.reviews.length + 1,
                name: reviewData.name,
                image: reviewData.image || '../images/default-avatar.jpg',
                rating: parseInt(reviewData.rating),
                comment: reviewData.comment,
                date: new Date().toISOString().split('T')[0],
                verified: false
            };

            reviewsData.reviews.unshift(newReview);
            this.renderReviews();
            this.updateStats();
            this.showSuccessMessage("Review added successfully!");
            return newReview;
        },

        removeReview: function (reviewId) {
            const reviewIndex = reviewsData.reviews.findIndex(r => r.id === reviewId);
            if (reviewIndex !== -1) {
                reviewsData.reviews.splice(reviewIndex, 1);
                this.renderReviews();
                this.updateStats();
                this.showSuccessMessage("Review removed successfully!");
                return true;
            }
            return false;
        },

        filterByRating: function (rating) {
            if (rating === 'all') {
                this.renderReviews();
            } else {
                const filteredReviews = reviewsData.reviews.filter(r => r.rating === rating);
                this.renderFilteredReviews(filteredReviews);
            }
        },

        searchReviews: function (searchTerm) {
            if (!searchTerm.trim()) {
                this.renderReviews();
                return;
            }

            const filteredReviews = reviewsData.reviews.filter(review =>
                review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.comment.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.renderFilteredReviews(filteredReviews);
        },

        renderReviews: function () {
            const startIndex = (reviewsData.currentPage - 1) * reviewsData.reviewsPerPage;
            const endIndex = startIndex + reviewsData.reviewsPerPage;
            const reviewsToShow = reviewsData.reviews.slice(startIndex, endIndex);

            this.renderReviewCards(reviewsToShow);
            this.renderPagination();
        },

        renderFilteredReviews: function (reviews) {
            this.renderReviewCards(reviews);
            $('#review-pagination').hide();
        },

        renderReviewCards: function (reviews) {
            const reviewContainer = $('#reviews-container');
            reviewContainer.empty();

            if (reviews.length === 0) {
                reviewContainer.html(`
                    <div class="col-12 text-center">
                        <p class="text-muted">No reviews found.</p>
                    </div>
                `);
                return;
            }

            reviews.forEach((review, index) => {
                const stars = '⭐'.repeat(review.rating);
                const verifiedBadge = review.verified ?
                    '<span class="badge bg-success ms-2" title="Verified Review">✓</span>' : '';

                const reviewCard = $(`
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div class="card text-center p-3 shadow-sm rounded-4 review-card" 
                             data-review-id="${review.id}" 
                             style="animation-delay: ${index * 0.1}s;">
                            <div class="review-header d-flex justify-content-between align-items-start mb-2">
                                <small class="text-muted">${this.formatDate(review.date)}</small>
                            </div>
                            <img src="${review.image}" 
                                 class="rounded-circle mx-auto review-avatar" 
                                 alt="${review.name} Profile Picture" 
                                 width="80" height="80"
                                 onerror="this.src='../images/default-avatar.jpg'">
                            <h5 class="mt-3 mb-1">
                                ${review.name}
                                ${verifiedBadge}
                            </h5>
                            <div class="stars mb-2" aria-label="${review.rating} stars rating">
                                ${stars}
                                <span class="ms-1 text-muted">(${review.rating}/5)</span>
                            </div>
                            <p class="text-muted small review-comment">"${review.comment}"</p>
                            <div class="review-actions mt-2">
                                <button class="btn btn-sm btn-outline-primary like-review" 
                                        data-review-id="${review.id}">
                                    <i class="fas fa-thumbs-up"></i> Helpful
                                </button>
                            </div>
                        </div>
                    </div>
                `);

                reviewContainer.append(reviewCard);
            });

            this.initializeReviewAnimations();
        },

        renderPagination: function () {
            const totalPages = Math.ceil(reviewsData.totalReviews() / reviewsData.reviewsPerPage);
            const paginationContainer = $('#review-pagination');

            if (totalPages <= 1) {
                paginationContainer.hide();
                return;
            }

            paginationContainer.show().empty();

            let paginationHTML = '<nav aria-label="Review pagination"><ul class="pagination justify-content-center">';

            paginationHTML += `
                <li class="page-item ${reviewsData.currentPage === 1 ? 'disabled' : ''}">
                    <button class="page-link" data-page="${reviewsData.currentPage - 1}">Previous</button>
                </li>
            `;

            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `
                    <li class="page-item ${i === reviewsData.currentPage ? 'active' : ''}">
                        <button class="page-link" data-page="${i}">${i}</button>
                    </li>
                `;
            }

            paginationHTML += `
                <li class="page-item ${reviewsData.currentPage === totalPages ? 'disabled' : ''}">
                    <button class="page-link" data-page="${reviewsData.currentPage + 1}">Next</button>
                </li>
            `;

            paginationHTML += '</ul></nav>';
            paginationContainer.html(paginationHTML);
        },

        updateStats: function () {
            const statsContainer = $('#review-stats');
            if (statsContainer.length === 0) {
                $('#reviews h2').after(`
                    <div id="review-stats" class="text-center mb-4">
                        <div class="row">
                            <div class="col-md-3">
                                <h4 class="text-primary" id="total-reviews">${reviewsData.totalReviews()}</h4>
                                <small class="text-muted">Total Reviews</small>
                            </div>
                            <div class="col-md-3">
                                <h4 class="text-warning" id="average-rating">${reviewsData.averageRating()}</h4>
                                <small class="text-muted">Average Rating</small>
                            </div>
                            <div class="col-md-6">
                                <div class="d-flex justify-content-center gap-2">
                                    <select class="form-select form-select-sm" id="rating-filter" style="width: auto;">
                                        <option value="all">All Ratings</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                    <input type="text" class="form-control form-control-sm" 
                                           id="search-reviews" placeholder="Search reviews..." 
                                           style="width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            } else {
                $('#total-reviews').text(reviewsData.totalReviews());
                $('#average-rating').text(reviewsData.averageRating());
            }
        },

        formatDate: function (dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        },

        showSuccessMessage: function (message) {
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            $('#reviews').prepend(alertHtml);

            setTimeout(() => {
                $('.alert').fadeOut(() => {
                    $('.alert').remove();
                });
            }, 3000);
        },

        initializeReviewAnimations: function () {
            const reviewObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '-50px'
            });

            $('.review-card').each(function (index) {
                $(this).css('animation-delay', `${index * 0.1}s`);
                reviewObserver.observe(this);
            });

            $('.review-card').hover(
                function () {
                    $(this).find('.review-avatar').css('transform', 'scale(1.1) rotate(5deg)');
                    $(this).find('.stars').css('transform', 'scale(1.1)');
                },
                function () {
                    $(this).find('.review-avatar').css('transform', 'scale(1) rotate(0deg)');
                    $(this).find('.stars').css('transform', 'scale(1)');
                }
            );
        }
    };

    const ajaxManager = {
        addReviewAPI: function (reviewData) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.1) {
                        const newReview = reviewManager.addReview(reviewData);
                        resolve({
                            success: true,
                            data: newReview,
                            message: 'Review added successfully!'
                        });
                    } else {
                        reject({
                            success: false,
                            message: 'Failed to add review. Please try again.'
                        });
                    }
                }, 1000);
            });
        },

        removeReviewAPI: function (reviewId) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.1) {
                        const success = reviewManager.removeReview(reviewId);
                        if (success) {
                            resolve({
                                success: true,
                                message: 'Review removed successfully!'
                            });
                        } else {
                            reject({
                                success: false,
                                message: 'Review not found.'
                            });
                        }
                    } else {
                        reject({
                            success: false,
                            message: 'Failed to remove review. Please try again.'
                        });
                    }
                }, 500);
            });
        }
    };

    function setupEventHandlers() {
        $(document).on('submit', '#add-review-form', function (e) {
            e.preventDefault();

            const formData = {
                name: $('#reviewer-name').val(),
                rating: $('#reviewer-rating').val(),
                comment: $('#reviewer-comment').val()
            };

            const submitBtn = $(this).find('button[type="submit"]');
            const originalText = submitBtn.text();
            submitBtn.prop('disabled', true).text('Adding...');

            ajaxManager.addReviewAPI(formData)
                .then(response => {
                    $(this)[0].reset();
                    $('#addReviewModal').modal('hide');
                })
                .catch(error => {
                    alert(error.message);
                })
                .finally(() => {
                    submitBtn.prop('disabled', false).text(originalText);
                });
        });

        $(document).on('click', '.remove-review', function () {
            const reviewId = parseInt($(this).data('review-id'));

            if (confirm('Are you sure you want to remove this review?')) {
                const btn = $(this);
                btn.prop('disabled', true);

                ajaxManager.removeReviewAPI(reviewId)
                    .catch(error => {
                        alert(error.message);
                        btn.prop('disabled', false);
                    });
            }
        });

        $(document).on('change', '#rating-filter', function () {
            const rating = $(this).val();
            if (rating === 'all') {
                reviewManager.filterByRating('all');
            } else {
                reviewManager.filterByRating(parseInt(rating));
            }
        });

        let searchTimeout;
        $(document).on('input', '#search-reviews', function () {
            const searchTerm = $(this).val();

            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                reviewManager.searchReviews(searchTerm);
            }, 300);
        });

        $(document).on('click', '#review-pagination .page-link', function () {
            const page = parseInt($(this).data('page'));
            if (page && page !== reviewsData.currentPage) {
                reviewsData.currentPage = page;
                reviewManager.renderReviews();

                $('html, body').animate({
                    scrollTop: $('#reviews').offset().top - 100
                }, 500);
            }
        });

        $(document).on('click', '.like-review', function () {
            const btn = $(this);
            const icon = btn.find('i');

            if (btn.hasClass('liked')) {
                btn.removeClass('liked btn-primary').addClass('btn-outline-primary');
                icon.removeClass('fas').addClass('far');
                btn.find('span').remove();
            } else {
                btn.addClass('liked btn-primary').removeClass('btn-outline-primary');
                icon.removeClass('far').addClass('fas');
                btn.append(' <span>(1)</span>');
            }
        });
    }

    function init() {
        createAddReviewModal();
        $('#reviews').append('<div id="review-pagination" class="mt-4"></div>');
        setupEventHandlers();
        reviewManager.renderReviews();
        reviewManager.updateStats();
        addReviewStyles();
    }

    function createAddReviewModal() {
        const modalHTML = `
            <div class="text-center mb-4">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addReviewModal">
                    <i class="fas fa-plus"></i> Add Your Review
                </button>
            </div>

            <div class="modal fade" id="addReviewModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Share Your Experience</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form id="add-review-form">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="reviewer-name" class="form-label">Your Name</label>
                                    <input type="text" class="form-control" id="reviewer-name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="reviewer-rating" class="form-label">Rating</label>
                                    <select class="form-select" id="reviewer-rating" required>
                                        <option value="">Choose rating</option>
                                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                                        <option value="4">⭐⭐⭐⭐ Good</option>
                                        <option value="3">⭐⭐⭐ Average</option>
                                        <option value="2">⭐⭐ Poor</option>
                                        <option value="1">⭐ Terrible</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="reviewer-comment" class="form-label">Your Review</label>
                                    <textarea class="form-control" id="reviewer-comment" rows="3" 
                                              placeholder="Share your experience..." required></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        $('#reviews h2').after(modalHTML);
    }

    function addReviewStyles() {
        const styles = `
            .review-card {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .review-card.animate-in {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            .review-avatar,
            .review-card .stars {
                transition: transform 0.3s ease;
            }
            .remove-review {
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            .review-card:hover .remove-review {
                opacity: 1;
            }
            .like-review.liked {
                background-color: #0d6efd !important;
                border-color: #0d6efd !important;
                color: white !important;
            }
            .review-header {
                height: 30px;
            }
        `;

        $('<style>').prop('type', 'text/css').html(styles).appendTo('head');
    }

    init();

    window.JomBiteReviews = {
        addReview: reviewManager.addReview.bind(reviewManager),
        removeReview: reviewManager.removeReview.bind(reviewManager),
        searchReviews: reviewManager.searchReviews.bind(reviewManager),
        getReviews: () => reviewsData.reviews,
        getStats: () => ({
            total: reviewsData.totalReviews(),
            average: reviewsData.averageRating()
        })
    };
}

function initializeVideoSection() {
    let videoScrollTimeout;

    $(window).scroll(throttle(function () {
        const scrollTop = $(this).scrollTop();
        const videoContainer = $('.video-fullscreen-container');

        if (videoContainer.length === 0) return;

        const videoHeight = videoContainer.height();
        const scrollProgress = Math.min(scrollTop / videoHeight, 1);

        clearTimeout(videoScrollTimeout);

        if (scrollProgress > 0.3) {
            $('.video-overlay').addClass('active').css('opacity', scrollProgress * 0.5);
            $('.scroll-up-wrapper').addClass('active');
        } else {
            $('.video-overlay').removeClass('active');
            $('.scroll-up-wrapper').removeClass('active');
        }

        videoScrollTimeout = setTimeout(() => {
            if (scrollTop > 200) {
                $('.scroll-up-wrapper').fadeOut(500);
            }
        }, 2000);
    }, 16));

    $('.scroll-up-wrapper').on('click keypress', function (e) {
        if (e.type === 'click' || e.which === 13 || e.which === 32) {
            e.preventDefault();

            const targetSection = $('.simpleBrief');
            if (targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 80
                }, {
                    duration: 1000,
                    easing: 'easeInOutCubic'
                });
            }
        }
    });

    const video = $('.video-fullscreen-container video')[0];
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(console.warn);
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

$.extend($.easing, {
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
});