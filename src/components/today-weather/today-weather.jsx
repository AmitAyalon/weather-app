import './today-weather.scss'
import CelsiusIcon from '../../assets/icons/celsius-icon.svg';
import FeelsLikeIcon from '../../assets/icons/thermometer-icon.svg';
import MinTempIcon from '../../assets/icons/thermometer-minus-icon-light.svg';
import MaxTempIcon from '../../assets/icons/thermometer-plus-icon-light.svg';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';

const TodayWeather = observer(() => {
    const { weatherStore } = rootStore;
    const { weatherDetails } = weatherStore;

    const getCurrentDayAndTime = () => {
        return new Date().toLocaleDateString('en', {
            weekday: 'long',
            hour: 'numeric',
            hour12: true,
        });
    };

    // get the current day and time in this format: "09 February"
    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en', {
            day: 'numeric',
            month: 'long',
        });
    };

    if (!weatherDetails) {
        return null;
    }

    return (
        <div id="today-weather-temp-container">
            <div className="d-flex title">{weatherDetails.city_name} - weather (<img className="celsius-icon" src={CelsiusIcon} alt="celsius icon" width="30px" height="30px"/>)</div>
            <div className="d-flex align-items justify-content temp-and-icon-container">
                <div className="d-flex align-items justify-content icon-wrapper">
                    <img src={weatherDetails.icon} alt="weather icon" width="200px" height="200px"/>
                </div>
                <div className="d-flex align-items justify-content temperature-wrapper">{weatherDetails.temperature}&deg;</div>
            </div>
            <div className="d-flex info-container">
                <div className="left-container">
                    <div className="d-flex align-items feels-like-wrapper">
                        <img src={FeelsLikeIcon} alt="feels like icon" width="24px" height="24px"/>
                        <span>feels like:&nbsp;{weatherDetails.feels_like}&deg;</span>
                    </div>
                    <div className="d-flex align-items min-temp-wrapper">
                        <img src={MinTempIcon} alt="min temp icon" width="24px" height="24px"/>
                        <span>min:&nbsp;{weatherDetails.min_temperature}&deg;</span>
                    </div>
                    <div className="d-flex align-items max-temp-wrapper">
                        <img src={MaxTempIcon} alt="max temp icon" width="24px" height="24px"/>
                        <span>max:&nbsp;{weatherDetails.max_temperature}&deg;</span>
                    </div>
                </div>
                <div className="right-container">
                    <div className="city-name-wrapper">{getCurrentDate()}</div>
                    <div className="day-time-wrapper">{getCurrentDayAndTime()}</div>
                    <div className="description-wrapper">{weatherDetails.description}</div>
                </div>
            </div>
        </div>
    );
});

export default TodayWeather;