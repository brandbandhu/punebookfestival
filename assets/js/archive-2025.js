const archiveAlbums = [...document.querySelectorAll('.archive-gallery a')];
const archiveDialog = document.querySelector('.archive-dialog');
const galleryFilters = document.querySelector('.archive-gallery-filters');
const galleryCount = document.querySelector('.archive-gallery-count');

if (galleryFilters && galleryCount) {
  const buttons = [...galleryFilters.querySelectorAll('button')];
  galleryFilters.hidden = false;
  galleryCount.hidden = false;
  galleryCount.textContent = `${archiveAlbums.length} albums`;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.galleryFilter;
      buttons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      const visibleAlbums = archiveAlbums.filter(link => {
        link.hidden = category !== 'all' && link.dataset.category !== category;
        return !link.hidden;
      });
      galleryCount.textContent = visibleAlbums.length === 1 ? '1 album' : `${visibleAlbums.length} albums`;
    });
  });
}

const archiveMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const revealObserver = new IntersectionObserver(entries => {
    let delay = 0;
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      revealObserver.unobserve(target);
      if (!archiveMotion.matches) continue;
      target.animate(
        [
          { opacity: .55, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 420, delay, easing: 'ease-out', fill: 'backwards' }
      );
      delay = Math.min(delay + 55, 165);
    }
  }, { threshold: .2 });

  document.querySelectorAll(
    '#achievements dl > div, .archive-editorial-photo, .archive-highlights article, .archive-gallery a, .archive-timeline li'
  ).forEach(element => revealObserver.observe(element));
}

if (archiveAlbums.length && typeof archiveDialog?.showModal === 'function') {
  const photo = archiveDialog.querySelector('img');
  const caption = archiveDialog.querySelector('figcaption');
  const counter = archiveDialog.querySelector('[aria-live]');
  const thumbnails = archiveDialog.querySelector('.archive-album-thumbnails');
  let albumPhotos = [];
  let activePhoto = 0;

  function showPhoto(index) {
    activePhoto = (index + albumPhotos.length) % albumPhotos.length;
    const selected = albumPhotos[activePhoto];
    photo.src = selected.dataset.full;
    photo.alt = selected.querySelector('img').alt;
    caption.textContent = selected.dataset.caption;
    counter.textContent = `${activePhoto + 1} / ${albumPhotos.length}`;
    albumPhotos.forEach(button => button.setAttribute('aria-current', String(button === selected)));
  }

  archiveAlbums.forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const album = document.getElementById(link.dataset.album);
      if (!album?.content.firstElementChild) return;
      event.preventDefault();
      thumbnails.replaceChildren(album.content.cloneNode(true));
      albumPhotos = [...thumbnails.children];
      thumbnails.scrollLeft = 0;
      showPhoto(0);
      archiveDialog.showModal();
    });
  });

  archiveDialog.addEventListener('click', event => {
    const thumbnail = event.target.closest('[data-full]');
    if (thumbnail) showPhoto(albumPhotos.indexOf(thumbnail));
    const step = event.target.closest('[data-photo-step]');
    if (step) showPhoto(activePhoto + Number(step.dataset.photoStep));
    if (event.target === archiveDialog || event.target.closest('.archive-close')) archiveDialog.close();
  });

  archiveDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(activePhoto + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
}
