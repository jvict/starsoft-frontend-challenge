import axios from "axios";

const API_URL = "https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products";

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};