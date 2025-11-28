"use client";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useRef } from "react";

const libraries: "places"[] = ["places"];

interface AddressAutocompleteProps {
  placeholder: string;
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void;
}

export default function AddressAutocomplete({
  placeholder,
  onPlaceSelect,
}: AddressAutocompleteProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || "",
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (onPlaceSelect) {
        onPlaceSelect(place);
      }
    }
  };

  if (!isLoaded) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        disabled
        className="w-full px-5 py-4 rounded-full border border-gray-300 
        focus:ring-2 focus:ring-gray-300/60 outline-none text-base bg-gray-50"
      />
    );
  }

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        componentRestrictions: { country: "vn" }, // Giới hạn tìm kiếm trong VN
        fields: ["address_components", "formatted_address", "geometry", "name"],
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-full border border-gray-300 
        focus:ring-2 focus:ring-gray-300/60 outline-none text-base"
      />
    </Autocomplete>
  );
}
