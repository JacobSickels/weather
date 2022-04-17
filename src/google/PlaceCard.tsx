import { Card, CardSection, Group, Skeleton, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useGeolocation } from "../hooks/use-geolocation";

interface PlaceCardProps {
  icon?: string;
  condition?: string;
}

export const PlaceCard = ({ icon, condition }: PlaceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useGeolocation();
  const [result, setResult] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (ref.current && location) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode(
        {
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        },
        (geoResult) => {
          const service = new google.maps.places.PlacesService(ref.current!);

          service.getDetails(
            {
              placeId: geoResult.find((geo) => geo.types.includes("locality"))
                ?.place_id!,
            },
            (result: any) => {
              setResult(result);
            }
          );
        }
      );
    }
  }, [location]);

  return (
    <>
      {result?.photos?.length && imageLoaded && (
        <div style={{ width: "34rem", margin: "0 auto", paddingTop: "5rem" }}>
          <Card shadow="sm">
            <CardSection>
              <img
                src={result?.photos[0].getUrl()}
                alt={result.name}
                style={{
                  height: "auto",
                  width: "34rem",
                }}
              />
            </CardSection>
            <CardSection p="lg">
              <Group position="apart">
                <Text weight={500} size="xl">
                  {result.formatted_address}
                </Text>
              </Group>
            </CardSection>
            <Group>
              <div
                style={{
                  height: "4rem",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "2rem",
                }}
              >
                <img
                  style={{ display: "inline-block" }}
                  src={"https:" + icon}
                  alt={condition}
                />
              </div>
              <Text size="md">{condition}</Text>
            </Group>
          </Card>
        </div>
      )}

      <img
        src={result?.photos[0].getUrl()}
        alt={result?.name}
        style={{
          display: "none",
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {!result?.photos?.length && (
        <div style={{ width: "34rem", margin: "0 auto", paddingTop: "5rem" }}>
          <Card shadow="sm">
            <CardSection>
              <Skeleton height={"20rem"} width={"34rem"} />
            </CardSection>
            <CardSection p="lg">
              <Group position="apart">
                <Skeleton height={8} mt={16} mb={16} radius="xl" />
              </Group>
            </CardSection>
            <Group>
              <div style={{ display: "inline-block" }}>
                <Skeleton height={64} circle />
              </div>

              <div style={{ display: "inline-block", width: "75%" }}>
                <Skeleton height={8} mt={-8} radius="xl" />
              </div>
            </Group>
          </Card>
        </div>
      )}

      <div ref={ref} />
    </>
  );
};
