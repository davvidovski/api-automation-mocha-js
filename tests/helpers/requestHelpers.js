import axios from 'axios';
import config from '../../config/apiConfig.js';

const requestHelper = {
  // Create user (POST)
  createUser: async (data) => {
    try {
      const response = await axios.post(`${config.baseURL}/users`, data, { headers: config.headers });
      return response;
    } catch (error) {
      // If there's an error, return the response (if available) to validate in test cases
      if (error.response) {
        return error.response;  // Return the error response for test validation
      } else {
        console.error('POST request to create user failed:', error.message);
        throw new Error('POST request to create user failed: ' + error.message);
      }
    }
  },

  // Get user (GET)
  getUser: async (endpoint) => {
    try {
      const response = await axios.get(`${config.baseURL}${endpoint}`, { headers: config.headers });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error('GET request for user failed:', error.message);
        throw new Error('GET request for user failed: ' + error.message);
      }
    }
  },

  // Update user (PUT)
  updateUser: async (endpoint, data) => {
    try {
      const response = await axios.put(`${config.baseURL}${endpoint}`, data, { headers: config.headers });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error('PUT request to update user failed:', error.message);
        throw new Error('PUT request to update user failed: ' + error.message);
      }
    }
  },

  // Delete user (DELETE)
  deleteUser: async (endpoint) => {
    try {
      const response = await axios.delete(`${config.baseURL}${endpoint}`, { headers: config.headers });
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        console.error('DELETE request to delete user failed:', error.message);
        throw new Error('DELETE request to delete user failed: ' + error.message);
      }
    }
  }
};

export default requestHelper;
