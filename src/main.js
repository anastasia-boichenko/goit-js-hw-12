import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { requestImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import { scrollDawn } from './js/imagesScroll.js';

import {
  formEl,
  listImagesEl,
  loaderEl,
  inputEl,
  btnMoreEl,
  loaderMoreEl,
} from './js/appeal-collection';

let LIMIT = 15;
let PAGE = 1;
let valueUser;
let totalHits;
let totalPages;

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  btnMoreEl.classList.remove('btn-more-open');
  listImagesEl.innerHTML = '';
  loaderEl.classList.add('loader-open');

  if (valueUser !== inputEl.value.trim()) PAGE = 1;
  valueUser = inputEl.value.trim();

  formEl.reset();
  if (!valueUser) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    loaderEl.classList.remove('loader-open');
    btnMoreEl.classList.remove('btn-more-open');
    return;
  }

  try {
    const data = await requestImages(valueUser, PAGE, LIMIT);

    if (data.hits.length === 0) {
      loaderEl.classList.remove('loader-open');
      btnMoreEl.classList.remove('btn-more-open');
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      return;
    }

    await renderImages(data.hits);
    btnMoreEl.classList.add('btn-more-open');

    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / LIMIT);

    if (totalHits < LIMIT) {
      btnMoreEl.classList.remove('btn-more-open');
      return iziToast.info({
        position: 'bottomRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
    });
  }
});

btnMoreEl.addEventListener('click', async () => {
  PAGE += 1;
  btnMoreEl.classList.remove('btn-more-open');
  loaderMoreEl.classList.add('loader-more-open');

  try {
    const data = await requestImages(valueUser, PAGE, LIMIT);

    await renderImages(data.hits);

    if (PAGE >= totalPages || data.hits.length < LIMIT) {
      loaderMoreEl.classList.remove('loader-more-open');
      return iziToast.info({
        position: 'bottomRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const imageItem = listImagesEl.querySelector('.images-item');
    scrollDawn(imageItem);

    btnMoreEl.classList.add('btn-more-open');
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
    });
  }
});
