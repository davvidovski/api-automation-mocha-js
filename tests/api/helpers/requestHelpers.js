import axios from 'axios';
import config from '../../../config/apiConfig.js';

const requestHelper = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${config.baseURL}${endpoint}`, { headers: config.headers });
      //console.log('GET Response:', response.data); // Log the data for debugging
      //console.log('GET Status:', response.status); // Log status code
      return response; // Return the entire response object, not just the data
    } catch (error) {
      console.error(`GET request to ${endpoint} failed:`, error.response || error.message);
      throw new Error(`GET request to ${endpoint} failed: ${error.message}`);
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${config.baseURL}${endpoint}`, data, { headers: config.headers });
      //console.log('POST Response:', response.data); // Log the data for debugging
      //console.log('POST Status:', response.status); // Log status code
      return response; // Return the entire response object, not just the data
    } catch (error) {
      console.error(`POST request to ${endpoint} failed:`, error.response || error.message);
      throw new Error(`POST request to ${endpoint} failed: ${error.message}`);
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${config.baseURL}${endpoint}`, data, { headers: config.headers });
      //console.log('PUT Response:', response.data); // Log the data for debugging
      //console.log('PUT Status:', response.status); // Log status code
      return response; // Return the entire response object, not just the data
    } catch (error) {
      console.error(`PUT request to ${endpoint} failed:`, error.response || error.message);
      throw new Error(`PUT request to ${endpoint} failed: ${error.message}`);
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${config.baseURL}${endpoint}`, { headers: config.headers });
      //console.log('DELETE Response:', response.data); // Log the data for debugging
      //console.log('DELETE Status:', response.status); // Log status code
      return response; // Return the entire response object, not just the data
    } catch (error) {
      console.error(`DELETE request to ${endpoint} failed:`, error.response || error.message);
      throw new Error(`DELETE request to ${endpoint} failed: ${error.message}`);
    }
  },
};

export default requestHelper;
