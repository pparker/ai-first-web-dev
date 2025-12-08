document.addEventListener('DOMContentLoaded', () => {
  const more = document.getElementById('more-text');
  const btn = document.getElementById('toggle-btn');
  if (!more || !btn) return;

  // Ensure initial state: hidden if element has data-hidden attribute, otherwise shown
  if (more.hasAttribute('data-hidden')) {
    more.style.display = 'none';
    btn.textContent = 'Show more';
  }

  btn.addEventListener('click', () => {
    const isHidden = getComputedStyle(more).display === 'none';
    if (isHidden) {
      more.style.display = '';
      btn.textContent = 'Show less';
    } else {
      more.style.display = 'none';
      btn.textContent = 'Show more';
    }
  });
});
