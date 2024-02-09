import WeatherStore from './weather-store/weather-store';

class RootStore {
  weatherStore;
  constructor() {
    this.weatherStore = new WeatherStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
