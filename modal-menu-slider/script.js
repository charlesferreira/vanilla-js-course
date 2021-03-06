const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

function closeModal() {
  modal.classList.remove('show-modal');
}

// Toggle nav
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));

// Show modal
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Show modal
close.addEventListener('click', closeModal);

// Hide modal on outside click
window.addEventListener('click', e => (e.target === modal ? closeModal() : false));
