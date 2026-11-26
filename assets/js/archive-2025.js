const archivePhotos = [...document.querySelectorAll('.archive-gallery a')];
const archiveDialog = document.querySelector('.archive-dialog');

if (archivePhotos.length && typeof archiveDialog?.showModal === 'function') {
  const photo = archiveDialog.querySelector('img');
  const caption = archiveDialog.querySelector('figcaption');
  const counter = archiveDialog.querySelector('[aria-live]');
  let activePhoto = 0;

  function showPhoto(index) {
    activePhoto = (index + archivePhotos.length) % archivePhotos.length;
    const link = archivePhotos[activePhoto];
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    caption.textContent = link.querySelector('span').textContent;
    counter.textContent = `${activePhoto + 1} / ${archivePhotos.length}`;
  }

  archivePhotos.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(index);
      archiveDialog.showModal();
    });
  });

  archiveDialog.addEventListener('click', event => {
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
