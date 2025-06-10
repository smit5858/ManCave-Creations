import axios from 'axios';

const API_URL = 'http://localhost:3000';

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/setorder`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const updateUser = async (email, userData) => {
  try {
    // Ensure email is properly encoded
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.put(
      `${API_URL}/setuserdetails/${encodedEmail}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export { createOrder, updateUser };