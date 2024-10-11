import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

export async function requestImages(q, value, limit) {
  const response = await axios(`/api/`, {
    params: {
      page: value,
      per_page: limit,
      key: '45209949-5a312a82ff87c6973b888687f',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
