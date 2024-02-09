import axios from 'axios';

class RestApi {
  apiUrl;
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get(url) {
    return axios.get(this.apiUrl + url);
  }

  post(url, data) {
    return axios.post(this.apiUrl + url, data);
  }

  put(url, data) {
    return axios.put(this.apiUrl + url, data);
  }

  patch(url, data) {
    return axios.patch(this.apiUrl + url, data);
  }

  delete(url, payload) {
    return axios.delete(this.apiUrl + url, payload);
  }
}

export default RestApi;
