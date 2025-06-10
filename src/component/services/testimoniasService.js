import axios from 'axios';

const API_URL = 'http://localhost:3000/testimonials';

const getTestimonials = async () => {
  try {
    const response = await axios.get(API_URL);
    // Safely check if 'response.data.testimonials' exists and is an array
    if (response.data && Array.isArray(response.data.testimonials)) {
      return response.data.testimonials;
    } else {
      throw new Error('Testimonials data is not an array or not found.');
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;  // Rethrow error to be handled in the component
  }
};

export default {
  getTestimonials, // Ensure this matches the function name used in the component
};
