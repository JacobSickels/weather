import { useEffect, useRef, useState } from "react";
import { useGeolocation } from "../hooks/use-geolocation";

interface PlacePhotoProps {
  render: ({
    photo,
    name,
  }: {
    name: string;
    photo: {
      getUrl: () => string;
      height: number;
    };
  }) => React.ReactNode;
}

export const PlacePhoto = ({ render }: PlacePhotoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useGeolocation();
  const [result, setResult] = useState<any>(null);

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
              placeId: geoResult[0].place_id,
            },
            (result: any) => setResult(result)
          );
        }
      );
    }
  }, [location]);

  return (
    <div ref={ref}>
      {result?.photos?.length &&
        render({ photo: result?.photos[0], name: result.name })}
    </div>
  );
};
