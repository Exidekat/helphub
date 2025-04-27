// ./frontend/components/GoogleMapEmbed.tsx

"use client";
import React from "react";
import { GOOGLE_MAPS_API_KEY } from "../config";

type GoogleMapEmbedProps = {
  lat: number;
  lng: number;
  zoom?: number;
};

export default function GoogleMapEmbed({ lat, lng, zoom = 16 }: GoogleMapEmbedProps) {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500 text-sm rounded-md">
        Map unavailable (missing API key)
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={src}
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
