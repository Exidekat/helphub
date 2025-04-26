"use client"

import { useEffect, useRef } from "react"

interface LocationProps {
  location: {
    name: string
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
}

export default function LocationMap({ location }: LocationProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real app, you would use Google Maps, Mapbox, or another mapping service
    if (mapRef.current) {
      const mapElement = mapRef.current
      mapElement.innerHTML = ""

      const canvas = document.createElement("canvas")
      canvas.width = mapElement.clientWidth || 300
      canvas.height = mapElement.clientHeight || 200
      mapElement.appendChild(canvas)

      const context = canvas.getContext("2d")
      if (!context) return

      // Draw a simple placeholder map
      context.fillStyle = "#e5e7eb"
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some "roads"
      context.strokeStyle = "#ffffff"
      context.lineWidth = 3

      // Horizontal roads
      for (let i = 1; i < 5; i++) {
        context.beginPath()
        context.moveTo(0, canvas.height * (i / 5))
        context.lineTo(canvas.width, canvas.height * (i / 5))
        context.stroke()
      }

      // Vertical roads
      for (let i = 1; i < 5; i++) {
        context.beginPath()
        context.moveTo(canvas.width * (i / 5), 0)
        context.lineTo(canvas.width * (i / 5), canvas.height)
        context.stroke()
      }

      // Draw a marker for the location
      context.fillStyle = "#ef4444"
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, 8, 0, Math.PI * 2)
      context.fill()

      // Add a pulse effect
      context.strokeStyle = "#ef4444"
      context.lineWidth = 2
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, 12, 0, Math.PI * 2)
      context.stroke()
    }
  }, [location])

  return (
    <div ref={mapRef} className="w-full h-full flex items-center justify-center bg-slate-100">
      <div className="text-sm text-gray-500">Map loading...</div>
    </div>
  )
}
