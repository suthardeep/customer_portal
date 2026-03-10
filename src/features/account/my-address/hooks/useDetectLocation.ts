import { useEffect, useState } from "react";

interface DetectedAddress {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface UseDetectLocationReturn {
  detect: () => void;
  isDetecting: boolean;
  error: string | null;
}

type UseDetectLocation = (
  onSuccess: (address: DetectedAddress) => void,
  options?: { autoDetect?: boolean },
) => UseDetectLocationReturn;

export const useDetectLocation: UseDetectLocation = (
  onSuccess,
  { autoDetect = false } = {},
) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } },
          );

          if (!res.ok) throw new Error("Failed to fetch address.");

          const data = await res.json();
          const a = data.address ?? {};

          const road = a.road ?? a.pedestrian ?? a.suburb ?? "";
          const houseNumber = a.house_number ? `${a.house_number}, ` : "";
          const neighbourhood = a.neighbourhood ?? a.quarter ?? "";

          onSuccess({
            addressLine1: `${houseNumber}${road}`.trim(),
            addressLine2: neighbourhood || undefined,
            city:
              a.city ?? a.town ?? a.village ?? a.county ?? a.district ?? "",
            state: a.state ?? "",
            pincode: a.postcode ?? "",
            country: a.country ?? "",
            latitude,
            longitude,
          });
        } catch {
          setError("Could not fetch address details. Please try again.");
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        setIsDetecting(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location permission denied.");
        } else {
          setError("Unable to retrieve your location.");
        }
      },
      { timeout: 10000 },
    );
  };

  useEffect(() => {
    if (autoDetect) detect();
  }, []);

  return { detect, isDetecting, error };
};
