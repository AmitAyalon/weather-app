import RestApi from '../../services/rest-api.service';
import axios from 'axios';

export class WeatherApi extends RestApi {
  apiKey = 'f22d6958bfb3d4fa57a9acad154dce06';
  constructor() {
    super('https://api.openweathermap.org');
  }

  getWeatherByCoordinates(lat, lon) {
    return this.get(
      `/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${this.apiKey}&units=metric`
    );
  }

  getWeatherByQuery(city) {
    return this.get(
      `/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

  getCityGeocoding(city) {
    return axios.get(`/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`);
  }
}
