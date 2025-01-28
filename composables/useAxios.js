import axios from 'axios';

export const useAxios = () => {
  return axios.create({
    baseURL: 'https://library-render-oewo.onrender.com/v1/',
  });
};
