import DeliveryBoy from "../assets/DeliveryBoy.jpg";
import UserDeliveryLocation from "../assets/UserDeliveryLocation.jpg";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: DeliveryBoy,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const customerIcon = new L.Icon({
  iconUrl: UserDeliveryLocation,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function DeliveryBoyTracking({ data }) {
  const deliveryBoyLat = data.deliveryBoyLocation.lat;
  const deliveryBoyLon = data.deliveryBoyLocation.lon;

  const customerLat = data.customerLocation.lat;
  const customerLon = data.customerLocation.lon;

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliveryBoyLat, deliveryBoyLon];
  return (
    <div className="w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md">
      <MapContainer className="w-full h-full" center={center} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[deliveryBoyLat, deliveryBoyLon]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>
        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>You</Popup>
        </Marker>

        <Polyline positions={path} color="green" weight={4}></Polyline>
      </MapContainer>
    </div>
  );
}

export default DeliveryBoyTracking;
