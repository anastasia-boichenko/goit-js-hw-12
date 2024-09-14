import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { listImagesEl, loaderEl, loaderMoreEl } from './appeal-collection';

export async function renderImages(images) {
  const murkup = await images
    .map(image => {
      return `<li class="images-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"

          />
          <div class="property">
          <p><span class="weight">Likes</span> ${image.likes}</p>
          <p><span class="weight">Views</span> ${image.views}</p>
          <p><span class="weight">Comments</span> ${image.comments}</p>
          <p><span class="weight">Downloads</span> ${image.downloads}</p>
          </div>
        </a>
      </li>`;
    })
    .join('');

  loaderEl.classList.remove('loader-open');
  loaderMoreEl.classList.remove('loader-more-open');
  listImagesEl.insertAdjacentHTML('beforeend', murkup);

  new SimpleLightbox('.images-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}
