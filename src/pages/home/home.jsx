import './home.scss';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';
import Search from '../../components/search/search';
import FiveDayForecast from '../../components/five-day-forecast/five-day-forecast';
import TodayForecast from '../../components/today-forecast/today-forecast';
import TodayWeather from '../../components/today-weather/today-weather';
import ExtraInfo from '../../components/extra-info/extra-info';
import Empty from '../../components/empty/empty';
import Navbar from '../../components/navbar/navbar';

const HomePage = observer(() => {
  const { weatherStore } = rootStore;

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            await weatherStore.getWeatherByCoordinates(latitude, longitude);
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  return (
    <div id="home-page">
      {weatherStore.checkIfDataExists() ? (
        <div className="weather-data-container">
          <div className="weather-data-forecast">
            <div className="left-panel">
              <Search />
              <FiveDayForecast />
              <ExtraInfo />
            </div>
            <div className="right-panel">
              <Navbar />
              <TodayWeather />
              <TodayForecast />
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
});

export default HomePage;
