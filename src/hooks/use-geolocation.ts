import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          if (process.env.NODE_ENV === "production") {
            setLocation({
              timestamp: 0,
              coords: {
                latitude: 37.3346,
                longitude: -122.009,
              } as any,
            });
          } else {
            setLocation(location);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, []);

  return location;
};
