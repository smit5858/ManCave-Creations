import axios from 'axios';


const API_URL = 'http://localhost:3000/products';

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    // Safely check if 'response.data.products' exists and is an array
    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      throw new Error('Products data is not an array or not found.');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Rethrow error to be handled in the component
  }
};

export default {
  getProducts,
};
