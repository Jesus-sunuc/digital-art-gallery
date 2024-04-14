import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'HEtY5s-u0VohbhWNXZ5qHAZEqaTdbPWSgF8sRM7lWXg';
const baseUrl = 'https://api.unsplash.com';

const unsplashService = {
  searchPhotos: async (query, page = 2) => {
    try {
      const response = await axios.get(`${baseUrl}/search/photos`, {
        params: {
          query: query,
          page: page,
          per_page: 20,  // Number of items per page
          client_id: UNSPLASH_ACCESS_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error);
      return [];
    }
  },
};

export default unsplashService;