import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

export async function requestImages(q, value, limit) {
  const response = await axios(`/api/`, {
    params: {
      page: value,
      per_page: limit,
      key: '44962191-b2ae47cce5f09f25f6a2bff80',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
