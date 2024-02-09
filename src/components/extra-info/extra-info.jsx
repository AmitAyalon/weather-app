import './extra-info.scss';
import WindIcon from '../../assets/icons/wind-icon.svg';
import HumidityIcon from '../../assets/icons/humidity-icon.svg';
import SunsetIcon from '../../assets/icons/sunset-icon.svg';
import SunriseIcon from '../../assets/icons/sunrise-icon.svg';

import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';

const ExtraInfo = observer(() => {
    const { weatherStore } = rootStore;
    const { weatherDetails } = weatherStore;

    if (!weatherDetails) {
        return null;
    }
    return (
        <div id="extra-info-container">
            <div className="title">Today's&nbsp;Details</div>
            <div className="info-container">
                <div className="top-container">
                    <div className="wind-speed-container">
                        <div className="title d-flex">
                            <img className="icon" src={WindIcon} alt="wind icon" width="24px" height="24px"/>
                            wind
                        </div>
                        <div className="wrapper">{weatherDetails.wind}&nbsp;km/h</div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="humidity-container">
                        <div className="title d-flex">
                            <img className="icon" src={HumidityIcon} alt="humidity icon" width="24px" height="24px"/>
                            humidity
                        </div>
                        <div className="wrapper">{weatherDetails.humidity}%</div>
                    </div>
                    <div className="vertical-line"></div>
                </div>
                <div className="middle-container">
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                    <div className="wrapper"><div className="horizontal-line"></div></div>
                </div>
                <div className="bottom-container">
                    <div className="sunrise-container">
                        <div className="title d-flex">
                            <img className="icon" src={SunriseIcon} alt="sunrise icon" width="22px" height="22px"/>
                            sunrise
                        </div>
                        <div className="wrapper">{weatherDetails.sunrise}</div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="sunset-container">
                        <div className="title d-flex">
                            <img className="icon" src={SunsetIcon} alt="sunset icon" width="22px" height="22px"/>
                            sunset
                        </div>
                        <div className="wrapper">{weatherDetails.sunset}</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ExtraInfo