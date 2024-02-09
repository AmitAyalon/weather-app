import { makeAutoObservable } from 'mobx';
import { WeatherApi } from './weather.api';

class WeatherStore {
  weatherApi;
  unitsMode = 'metric';

  weatherDetails = null;
  todaysForecast = [];
  fiveDayForecast = {};

  selectedCity = '';
  selectedCityGeocoding = { lat: null, lon: null };

  isLoading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    this.weatherApi = new WeatherApi();
  }

  async getWeatherByQuery() {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.weatherApi.getWeatherByQuery(this.selectedCity);
      if (
        result.data.cod &&
        Number(result.data.cod) >= 200 &&
        Number(result.data.cod) < 300
      ) {
        this.parseResponseData(result.data);
      } else {
        alert(`Code: ${result.data.cod}\nMessage: ${result.data.message}`);
        this.weatherDetails = null;
        this.todaysForecast = [];
        this.fiveDayForecast = {};
      }
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  }

  async getWeatherByCoordinates(lat, lon) {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.weatherApi.getWeatherByCoordinates(lat, lon);
      if (
        result.data.cod &&
        Number(result.data.cod) >= 200 &&
        Number(result.data.cod) < 300
      ) {
        this.parseResponseData(result.data);
      } else {
        alert(`Code: ${result.data.cod}\nMessage: ${result.data.message}`);
        this.weatherDetails = null;
        this.todaysForecast = [];
        this.fiveDayForecast = {};
      }
    } catch (err) {
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  }

  async getCityGeocoding(city) {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await this.weatherApi.getCityGeocoding(city);
      this.selectedCityGeocoding.lat = res.data[0].lat;
      this.selectedCityGeocoding.lon = res.data[0].lon;
    } catch (err) {
      console.log(err);
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  }

  setSelectedCity(city) {
    this.selectedCity = city;
  }

  parseResponseData(data) {
    this.getWeatherDetails(data);
    this.getTodaysAndFiveDayForecastDetails(data);
  }

  getWeatherDetails(data) {
    const dateConfig = {
      hour: 'numeric',
      hour12: true,
    };
    try {
      const main = data.list[0].main;
      const wind = data.list[0].wind;
      const weather = data.list[0].weather[0];
      this.weatherDetails = {
        city_name: data.city.name,
        temperature: Math.round(main.temp),
        min_temperature: Math.round(main.temp_min),
        max_temperature: Math.round(main.temp_max),
        feels_like: Math.round(main.feels_like),
        humidity: main.humidity,
        pressure: main.pressure,
        wind: Math.round(wind.speed * 3.6),
        description: weather.description,
        icon: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
        sunrise: new Date(data.city.sunrise * 1000).toLocaleString(
          'en',
          dateConfig
        ),
        sunset: new Date(data.city.sunset * 1000).toLocaleString(
          'en',
          dateConfig
        ),
      };
    } catch (error) {
      console.error(error.message);
    }
  }

  getTodaysAndFiveDayForecastDetails(data) {
    const dateConfig = {
      hour: 'numeric',
      hour12: true,
    };
    try {
      for (const obj of data.list) {
        const currentDate = new Date().toLocaleDateString();
        const dataDate = new Date(obj.dt_txt).toLocaleDateString();
        let hours = '9 AM';
        if (dataDate === currentDate) {
          const time = new Date(obj.dt_txt).toLocaleString('en', dateConfig);
          const temp = Math.round(obj.main.temp);
          const icon = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@4x.png`;
          this.todaysForecast.push({ time, temp, icon });
        } else {
          const dateInfo = new Date(obj.dt_txt).toLocaleDateString('en', {
            weekday: 'long',
            hour: 'numeric',
            hour12: true,
          });
          const dayName = dateInfo.split(',')[0].trim();
          const icon = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
          const description = obj.weather[0].main;
          const min = Math.round(obj.main.temp_min);
          const max = Math.round(obj.main.temp_max);
          if (this.todaysForecast.length > 0) {
            hours = this.todaysForecast[0].time;
          }
          if (dateInfo.includes(hours)) {
            this.fiveDayForecast[dayName] = {
              day: dayName,
              description,
              icon,
              min,
              max,
            };
          } else if (!this.fiveDayForecast[dayName]) {
            this.fiveDayForecast[dayName] = {
              day: dayName,
              description,
              icon,
              min,
              max,
            };
          }
          if (this.fiveDayForecast.hasOwnProperty(dayName)) {
            this.fiveDayForecast[dayName].min = Math.min(
              this.fiveDayForecast[dayName].min,
              min
            );
            this.fiveDayForecast[dayName].max = Math.max(
              this.fiveDayForecast[dayName].max,
              max
            );
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  checkIfDataExists() {
    return this.weatherDetails && this.todaysForecast.length > 0;
  }

  clearData() {
    this.weatherData = null;
  }
}

export default WeatherStore;
