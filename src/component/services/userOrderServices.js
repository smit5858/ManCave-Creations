// userOrderServices.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this URL based on your backend

const userOrderServices = {
  getUserOrders: async (email, skip = 0, limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/userorders`, {
        params: { 
          email,
          skip,
          limit
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error fetching orders');
    }
  }
};

export default userOrderServices;