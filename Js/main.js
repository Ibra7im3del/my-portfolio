// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
const setMenu = open => {
  nav.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
};
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });

// Highlight the nav link of the section currently in view
const links = [...document.querySelectorAll('.nav-links a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

// Reveal elements once when they scroll into view
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

// Contact form (Formspree)
const form = document.querySelector('.contact form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  status.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) throw new Error('Request failed');
    form.reset();
    status.textContent = 'Message sent. Thank you, I will get back to you soon.';
  } catch {
    status.textContent = 'Could not send the message. Please email me directly.';
  }
});
