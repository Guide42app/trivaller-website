'use client'

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import { itineraryDays } from '@/data/content'
import 'leaflet/dist/leaflet.css'

const icon = (active: boolean, label: string) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;border-radius:9999px;display:grid;place-items:center;
      background:${active ? '#1a1b1d' : '#ffffff'};color:${active ? '#ffffff' : '#1a1b1d'};
      border:2px solid ${active ? '#3f3f46' : 'rgba(26,27,29,0.15)'};
      font:600 12px Manrope,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.35);
      ${active ? 'animation:pulse 1.6s ease-in-out infinite;' : ''}
    ">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

function FlyTo({ index }: { index: number }) {
  const map = useMap()
  useEffect(() => {
    const day = itineraryDays[index]
    map.flyTo([day.coords.lat, day.coords.lng], 8, { duration: 0.8 })
  }, [index, map])
  return null
}

export default function PlannerMap({ activeDay }: { activeDay: number }) {
  return (
    <MapContainer
      center={[39.5, -105.5]}
      zoom={7}
      scrollWheelZoom={false}
      className="h-full w-full rounded-[1.5rem]"
      style={{ minHeight: 360 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FlyTo index={activeDay} />
      {itineraryDays.map((day, index) => (
        <Marker
          key={day.day}
          position={[day.coords.lat, day.coords.lng]}
          icon={icon(index === activeDay, String(day.day))}
        >
          <Popup>
            Day {day.day}: {day.title}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
