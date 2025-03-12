"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Navigation, Plus, Minus, Layers } from "lucide-react"
import "./MapView.scss"

export interface MapLocation {
  id: string
  name: string
  latitude: number
  longitude: number
  description?: string
  icon?: string
}

export interface MapViewProps {
  locations?: MapLocation[]
  center?: [number, number]
  zoom?: number
  height?: string | number
  width?: string | number
  onLocationSelect?: (location: MapLocation) => void
  className?: string
  showSearch?: boolean
  showControls?: boolean
}

export function MapView({
  locations = [],
  center = [51.505, -0.09], // Default to London
  zoom = 13,
  height = "500px",
  width = "100%",
  onLocationSelect,
  className = "",
  showSearch = true,
  showControls = true,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Load Leaflet dynamically (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined" && !window.L) {
      // Load Leaflet CSS
      const linkEl = document.createElement("link")
      linkEl.rel = "stylesheet"
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkEl.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkEl.crossOrigin = ""
      document.head.appendChild(linkEl)

      // Load Leaflet JS
      const scriptEl = document.createElement("script")
      scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptEl.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      scriptEl.crossOrigin = ""
      scriptEl.onload = () => {
        setIsMapLoaded(true)
      }
      document.head.appendChild(scriptEl)
    } else if (window.L) {
      setIsMapLoaded(true)
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || map) return

    const L = window.L
    const newMap = L.map(mapRef.current).setView(center, zoom)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap)

    setMap(newMap)

    return () => {
      newMap.remove()
    }
  }, [isMapLoaded, center, zoom, map])

  // Add markers for locations
  useEffect(() => {
    if (!map || !isMapLoaded) return

    // Clear existing markers
    markers.forEach((marker) => marker.remove())
    const newMarkers: any[] = []
    const L = window.L

    // Add markers for each location
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(
          `<div class="map-view__popup">
            <h3>${location.name}</h3>
            ${location.description ? `<p>${location.description}</p>` : ""}
          </div>`,
        )

      marker.on("click", () => {
        if (onLocationSelect) {
          onLocationSelect(location)
        }
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)
  }, [map, locations, isMapLoaded, onLocationSelect])

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim() || !map || !isMapLoaded) return

    // This is a simplified search - in a real app, you'd use a geocoding service
    const matchedLocation = locations.find((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (matchedLocation) {
      map.setView([matchedLocation.latitude, matchedLocation.longitude], 15)
      markers.forEach((marker) => {
        const markerLatLng = marker.getLatLng()
        if (markerLatLng.lat === matchedLocation.latitude && markerLatLng.lng === matchedLocation.longitude) {
          marker.openPopup()
        }
      })
    }
  }

  // Map control handlers
  const handleZoomIn = () => map?.zoomIn()
  const handleZoomOut = () => map?.zoomOut()
  const handleLocate = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          map.setView([latitude, longitude], 15)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleLayerToggle = () => {
    // In a real app, you'd toggle between different map layers
    // This is a simplified example
    alert("Layer toggle functionality would go here")
  }

  return (
    <div className={`map-view ${className}`} style={{ height, width }}>
      {showSearch && (
        <div className="map-view__search">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} aria-label="Search">
            <Search size={18} />
          </button>
        </div>
      )}

      <div ref={mapRef} className="map-view__container"></div>

      {showControls && (
        <div className="map-view__controls">
          <button onClick={handleZoomIn} aria-label="Zoom in">
            <Plus size={18} />
          </button>
          <button onClick={handleZoomOut} aria-label="Zoom out">
            <Minus size={18} />
          </button>
          <button onClick={handleLocate} aria-label="My location">
            <Navigation size={18} />
          </button>
          <button onClick={handleLayerToggle} aria-label="Toggle layers">
            <Layers size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

