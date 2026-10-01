const searchInput = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  cards.forEach((card) => {
    const content = `${card.textContent} ${card.dataset.tags || ''}`.toLowerCase();
    const isMatch = content.includes(query);
    card.classList.toggle('is-hidden', !isMatch);
  });
});
