(function () {
  function initHero() {
    const root = document.querySelector('.hero');
    if (!root) return;

    const dots = Array.from(document.querySelectorAll('.hero-dot'));
    if (!dots.length) return;

    // slides are represented by changing overlay text via data attributes
    const overlay = root.querySelector('.overlay');
    const heading = overlay && overlay.querySelector('h1');
    const paragraph = overlay && overlay.querySelector('p');

    if (!heading || !paragraph) return;

    const slides = [
      {
        title: "Let's Build A Better Tomorrow Together",
        body:
          'Empowering lives through education, food distribution,\n' +
          'women empowerment and environmental sustainability.'
      },
      {
        title: 'Education for Every Child',
        body: 'Helping students learn through free classes, mentorship and learning initiatives.'
      },
      {
        title: 'Food & Support When it Matters',
        body: 'Providing meals, clothes and essential supplies for underprivileged communities.'
      }
    ];

    let current = 0;

    function setActive(i) {
      current = i;
      const s = slides[i];
      if (s) {
        heading.textContent = s.title;
        paragraph.textContent = s.body;
      }

      dots.forEach((d, idx) => {
        d.setAttribute('aria-pressed', idx === i ? 'true' : 'false');
        d.classList.toggle('is-active', idx === i);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const i = Number(dot.getAttribute('data-slide') || '0');
        setActive(i);
      });
    });

    // initial (ensure text matches slide 0)
    setActive(0);

    // auto-rotate unless user prefers reduced motion
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      setInterval(() => {
        const next = (current + 1) % slides.length;
        setActive(next);
      }, 6000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
})();

