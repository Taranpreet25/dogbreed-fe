import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});


export const getBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  console.log(response.data); 
  return response.data;
};

export const fetchBreedDetails = async (breed: string) => {
  const response = await api.get(`/dogs/breeds/${breed}/images`);
  console.log(response.data); 
  return response.data;
};
