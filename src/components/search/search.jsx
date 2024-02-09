import './search.scss';
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';
import SearchIcon from '../../assets/icons/search-icon.svg';

const search = observer(() => {
  const { weatherStore } = rootStore;

  const handleCityChange = (e) => {
    weatherStore.setSelectedCity(e.target.value);
  };

  const handleWeatherSearch = async () => {
    await weatherStore.getWeatherByQuery();
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleWeatherSearch();
    }
  };

  return (
    <div id="search-container">
      <input
        className="search-input"
        type="search"
        name="search"
        id="search"
        placeholder="Search..."
        value={weatherStore.selectedCity}
        onChange={handleCityChange}
        onKeyDown={handleEnterPress}
      />
      <button className="search-btn" onClick={handleWeatherSearch}>
        <img
          id="search-icon"
          className="search-icon"
          src={SearchIcon}
          alt="search icon"
          width="30px"
          height="30px"
        />
      </button>
    </div>
  );
});

export default search;
