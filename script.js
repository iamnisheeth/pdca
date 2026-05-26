// Reads PDCA_SECTIONS from sections.js (loaded before this script).
// Reads PDCA_UPCOMING_EVENTS from events-data.js when present.
// Applies nav visibility on every page, and hides index sections on the home page.

function renderEvents() {
  var container = document.getElementById('upcoming-events-grid');
  if (!container || typeof PDCA_UPCOMING_EVENTS === 'undefined') return;

  if (PDCA_UPCOMING_EVENTS.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted)">No upcoming events at the moment. Check back soon.</p>';
    return;
  }

  container.innerHTML = PDCA_UPCOMING_EVENTS.map(function (ev) {
    return '<div class="card">' +
      '<img src="' + ev.img + '" alt="' + ev.title + '">' +
      '<h3>' + ev.title + '</h3>' +
      '<p>Date: ' + ev.date + '</p>' +
      (ev.time  ? '<p>Time: '  + ev.time  + '</p>' : '') +
      (ev.venue ? '<p>Venue: ' + ev.venue + '</p>' : '') +
      '<a class="btn" href="' + ev.registerUrl + '" target="_blank" rel="noopener">Register</a>' +
      '</div>';
  }).join('');
}

document.addEventListener('DOMContentLoaded', function () {

  renderEvents();

  // Hide nav links for any page marked false in sections.js
  Object.keys(PDCA_SECTIONS).forEach(function (page) {
    if (!PDCA_SECTIONS[page]) {
      var link = document.querySelector('nav a[href="' + page + '"]');
      if (link) link.closest('li').style.display = 'none';
    }
  });

  // On the index page: also hide the section block itself
  document.querySelectorAll('section[data-page]').forEach(function (section) {
    if (!PDCA_SECTIONS[section.getAttribute('data-page')]) {
      section.style.display = 'none';
    }
  });

  // Subscribe button (news page)
  var subscribeBtn = document.getElementById('subscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function () {
      alert('Newsletter feature coming soon!');
    });
  }

  // Highlight active nav link (ul links only — excludes the h1 title link)
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

});
