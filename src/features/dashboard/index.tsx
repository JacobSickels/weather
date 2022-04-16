import { Card, CardSection, Group, Text } from "@mantine/core";
import { useQuery } from "react-query";
import { PlacePhoto } from "../../google/PlacePhoto";
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
    <PlacePhoto
      render={({ photo, name }) => (
        <div style={{ width: "34rem" }}>
          <Card shadow="sm">
            <CardSection>
              <img
                src={photo.getUrl()}
                alt={name}
                style={{
                  height: "auto",
                  width: "34rem",
                }}
              />
            </CardSection>
            <CardSection p="lg">
              <Group position="apart">
                <Text weight={500} size="xl">
                  {name}
                </Text>
              </Group>
            </CardSection>
            <Group>
              <img
                style={{ display: "inline-block" }}
                src={"https:" + data?.current?.condition?.icon}
                alt={data?.current?.condition?.text}
              />
              <Text size="md">{data?.current?.condition?.text}</Text>
            </Group>
          </Card>
        </div>
      )}
    />
  );
};

export default Dashboard;
