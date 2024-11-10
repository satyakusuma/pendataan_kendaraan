import axios from 'axios';

const API_URL = 'http://localhost:5145/api/vehicles';

const getVehicles = () => {
  return axios.get(API_URL);
};

const getVehicle = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createVehicle = (vehicleData) => {
  //const axios = require('axios');
  //let data = JSON.stringify(vehicleData);
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:5145/api/vehicles',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : vehicleData
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
};

const updateVehicle = (id, vehicleData) => {
  return axios.put(`${API_URL}/${id}`, vehicleData);
};

const deleteVehicle = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
};
