import { observer } from 'mobx-react-lite';
import MapView from '../../components/map-view/map-view';

const MapViewPage = observer(() => {
  return (
    <MapView
      isMarkerShown={false}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
});

export default MapViewPage;
