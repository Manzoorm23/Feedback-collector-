let selectedRating = 0;


document.querySelectorAll('.rating span').forEach(star => {
  
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    updateStarSelection();
  });
});


document.getElementById('submitBtn').addEventListener('click', () => {
  const text = document.getElementById('feedbackText').value.trim();

  if (selectedRating === 0 || text === "") {
    alert("Please give a rating and write your feedback.");
    return;
  }

  const feedback = {
    rating: selectedRating,
    message: text,
  };

 
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  feedbacks.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));


  document.getElementById('feedbackText').value = "";
  selectedRating = 0;
  updateStarSelection();

  displayFeedbacks();
});


function updateStarSelection() {
  const stars = document.querySelectorAll('.rating span');
  stars.forEach(star => {
    star.classList.remove('selected');
  });

  stars.forEach(star => {
    if (parseInt(star.dataset.value) <= selectedRating) {
      star.classList.add('selected');
    }
  });
}


function displayFeedbacks() {
  const list = document.getElementById('feedbackList');
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");

  list.innerHTML = "<h2>Submitted Feedback</h2>";

  feedbacks.reverse().forEach(item => {
    const div = document.createElement('div');
    div.className = "feedback-entry";
    div.innerHTML = `
      <div class="stars">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</div>
      <p>${item.message}</p>
    `;
    list.appendChild(div);
  });
}
displayFeedbacks();
