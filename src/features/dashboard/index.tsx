import { useQuery } from "react-query";
import { PlaceCard } from "../../google/PlaceCard";
import { useGeolocation } from "../../hooks/use-geolocation";

export const Dashboard = () => {
  const location = useGeolocation();

  const { data } = useQuery<CurrentWeather, unknown, CurrentWeather>(
    ["test"],
    () => {
      return fetch(
        `https://api.weatherapi.com/v1/current.json?key=fd5ab1b0df0c409690502604220104&q=${location?.coords.latitude},${location?.coords.longitude}`,
        { method: "GET" }
      ).then((resp) => resp.json());
    },
    {
      enabled: !!location,
    }
  );

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f1f1f1",
      }}
    >
      <PlaceCard
        icon={data?.current?.condition?.icon}
        condition={data?.current?.condition?.text}
      />
    </div>
  );
};

export default Dashboard;
