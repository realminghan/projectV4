$(document).ready(function () {
  const $form = $("#reviewForm");
  const $userReviews = $("#userReviews");

  // Determine page type (food or restaurant) based on URL or manually set
  const isFoodPage = window.location.pathname.includes("food-review.html");
  const storageKey = isFoodPage ? "foodReviews" : "restaurantReviews";

  // Load existing reviews from localStorage
  let reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
  reviews.forEach(reviewObj => addReviewCard(reviewObj));

  $form.submit(function (e) {
    e.preventDefault();

    const reviewObj = {
      name: $("#userName").val(),
      item: $("#itemName").val(),
      reviewText: $("#reviewText").val(),
      rating: parseInt($("#rating").val())
    };

    // Save to localStorage
    reviews.unshift(reviewObj);  // add to the beginning
    localStorage.setItem(storageKey, JSON.stringify(reviews));

    // Add review card dynamically with fade-in
    addReviewCard(reviewObj);

    this.reset();
  });

  function addReviewCard(reviewObj) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= reviewObj.rating
        ? '<i class="bi bi-star-fill text-warning"></i>'
        : '<i class="bi bi-star text-warning"></i>';
    }

    const $card = $(`
            <div class="col-md-4">
              <div class="card shadow-sm h-100" style="display:none;">
                <div class="card-body">
                  <h5 class="card-title">${reviewObj.item}</h5>
                  <p class="card-text">${reviewObj.reviewText}</p>
                  <p class="mb-0">${starsHtml}</p>
                  <p class="text-muted small mt-2">- ${reviewObj.name}</p>
                </div>
              </div>
            </div>
        `);

    $userReviews.prepend($card);
    $card.find(".card").fadeIn(600);  // smooth fade-in
  }
});
