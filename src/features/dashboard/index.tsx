import { useQuery } from "react-query";
import { useGeolocation } from "../../hooks/use-geolocation";

export const Dashboard = () => {
  const location = useGeolocation();

  const { data, isLoading } = useQuery<CurrentWeather, unknown, CurrentWeather>(
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.current?.condition?.text}
      <img
        src={"https:" + data?.current?.condition?.icon}
        alt={data?.current?.condition?.text}
      />
    </div>
  );
};

export default Dashboard;
