import axios from 'axios';
import constants from './constants';

function get(endpoint, callback) {
  axios.get(endpoint)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function post(endpoint, data, callback) {
  axios.post(endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function doDelete(endpoint, callback) {
  axios.delete(endpoint)
    .then((response) => {
      callback(response.status === constants.http_ok ||
               response.status === constants.http_no_content, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function put(endpoint, data, callback) {
  axios.put(endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function patch(endpoint, data, callback) {
  axios.patch(endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

export default {

};
