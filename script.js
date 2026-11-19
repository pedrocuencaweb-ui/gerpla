
(() => {
  const gallery = document.querySelector('.gerpla .hero-gallery');
  if (!gallery) return;
  const photos = ['assets/hero-original-1.jpg', 'assets/hero-original-2.jpg', 'assets/hero-original-3.jpg'];
  const photo = gallery.querySelector('.hero-photo');
  const title = gallery.querySelector('h1');
  const description = gallery.querySelector('.hero-copy p');
  const captions = [
    ['Servicio', 'integral', description.textContent],
    ['Tranquilidad', 'y seguridad', 'Está en las mejores manos. Simplificamos los trámites para que pueda trabajar con tranquilidad.'],
    ['Comodidad', 'y cercanía', 'Cada cliente es único y especial. Personalizamos nuestros servicios a sus necesidades.']
  ];
  const dots = [...gallery.querySelectorAll('.dots button')];
  const track = gallery.closest('.hero-scroll');
  const prev = gallery.querySelector('.prev');
  const next = gallery.querySelector('.next');
  let current = -1;
  let frame = 0;

  photos.slice(1).forEach(src => { new Image().src = src; });

  function show(index) {
    if (index === current) return;
    current = index;
    photo.src = photos[index];
    const [heading, emphasis, copy] = captions[index];
    const accent = document.createElement('em');
    accent.className = 'accent-type';
    accent.textContent = emphasis;
    title.replaceChildren(heading + ' ', accent);
    description.textContent = copy;
    prev.disabled = index === 0;
    next.disabled = index === photos.length - 1;
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
  }

  function step() {
    return (track.offsetHeight - gallery.offsetHeight) / (photos.length - 1);
  }

  function update() {
    frame = 0;
    const offset = parseFloat(getComputedStyle(gallery).top) - track.getBoundingClientRect().top;
    show(Math.max(0, Math.min(photos.length - 1, Math.round(offset / step()))));
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function goTo(index) {
    const top = window.scrollY + track.getBoundingClientRect().top;
    window.scrollTo({ top: top - parseFloat(getComputedStyle(gallery).top) + index * step(), behavior: 'instant' });
    scheduleUpdate();
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  update();
})();




