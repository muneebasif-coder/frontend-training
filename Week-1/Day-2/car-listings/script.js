const form = document.getElementById('filterForm');
const cards = document.querySelectorAll('.car-card');
const resultCount = document.getElementById('result-count');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const make = form.make.value;
  const maxPrice = Number(form.maxPrice.value);
  const transmission = form.transmission.value;
  const yearFrom = Number(form.yearFrom.value);

  let shown = 0;

  cards.forEach((card) => {
    let match = true;

    if (make && card.dataset.make !== make) match = false;
    if (maxPrice && Number(card.dataset.price) > maxPrice) match = false;
    if (transmission !== 'any' && card.dataset.transmission !== transmission) match = false;
    if (yearFrom && Number(card.dataset.year) < yearFrom) match = false;

    // hide the <li> not the article, so the list count stays right for screen readers
    card.parentElement.hidden = !match;
    if (match) shown++;
  });

  if (shown === 0) {
    resultCount.textContent = 'No cars match these filters. Try clearing some of them.';
  } else {
    resultCount.textContent = 'Showing ' + shown + ' of ' + cards.length + ' cars';
  }
});

form.addEventListener('reset', function () {
  cards.forEach((card) => {
    card.parentElement.hidden = false;
  });
  resultCount.textContent = 'Showing all ' + cards.length + ' cars';
});
