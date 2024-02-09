import './today-forecast.scss'
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';

const TodayForecast = observer(() => {
  const { weatherStore } = rootStore;
  const { todaysForecast } = weatherStore;

  return (
    <div id="today-forecast-container">
        <div className="title">Today's&nbsp;weather</div>
        <div className="forecast-container">
            {todaysForecast.slice(-3).map((obj, i) => (
                <div className="info" key={i} id={i}>
                    <div className="time-wrapper">{obj.time}</div>
                    <div className="icon-wrapper"><img src={obj.icon} alt="weather icon" width="86px" height="86px"/></div>
                    <div className="temp-wrapper">{obj.temp}&deg;</div>
                </div>
            ))}
        </div>
    </div>
);
});

export default TodayForecast;