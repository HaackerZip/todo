"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Skeleton } from "../ui/skeleton"

// Tipos para TypeScript
type Skatepark = {
  id: number
  name: string
  lat: number
  lng: number
  rating: number
  features: string[]
  distance?: number
}

type UserPosition = {
  lat: number
  lng: number
  accuracy?: number
}

// Constantes de configuración
const DEFAULT_CENTER: [number, number] = [-24.1858, -65.2995] // Coordenadas de Jujuy
const DEFAULT_ZOOM = 13
const MAX_NEARBY_DISTANCE_KM = 10 // Radio para considerar skateparks cercanos

// Componente para manejar la lógica de ubicación
function LocationMarker({
  onPositionFound,
  onPositionError,
}: {
  onPositionFound: (pos: UserPosition) => void
  onPositionError: () => void
}) {
  const map = useMap()

  useEffect(() => {
    let watchId: number | null = null

    const handleLocationFound = (e: L.LocationEvent) => {
      const position = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        accuracy: e.accuracy,
      }
      onPositionFound(position)
      map.flyTo(e.latlng, map.getZoom())
    }

    const handleLocationError = (e: L.ErrorEvent) => {
      console.error("Error de geolocalización:", e.message)
      onPositionError()
    }

    // Usar la API de geolocalización del navegador para mayor precisión
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }
          onPositionFound(position)
          map.flyTo([position.lat, position.lng], map.getZoom())
        },
        (err) => {
          console.error("Error de geolocalización:", err.message)
          handleLocationError(err as L.ErrorEvent)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      )
    } else {
      // Fallback al método de Leaflet si no hay API de geolocalización
      map
        .locate({
          setView: false,
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000,
        })
        .on("locationfound", handleLocationFound)
        .on("locationerror", handleLocationError)
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [map, onPositionFound, onPositionError])

  return null
}

// Función para calcular distancia entre coordenadas (Haversine)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Componente principal del mapa
export function SkateparksMap() {
  const [clientSide, setClientSide] = useState(false)
  const [userPosition, setUserPosition] = useState<UserPosition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Skateparks reales de Jujuy (ejemplo)
  const [skateparks, setSkateparks] = useState<Skatepark[]>([
    {
      id: 1,
      name: "Skatepark Palpalá",
      lat: -24.2565,
      lng: -65.2116,
      rating: 4.2,
      features: ["Bowl", "Street", "Rampas"],
    },
    {
      id: 2,
      name: "Skatepark San Salvador",
      lat: -24.1946,
      lng: -65.2974,
      rating: 4.5,
      features: ["Half-pipe", "Rieles", "Escaleras"],
    },
    {
      id: 3,
      name: "Skatepark Perico",
      lat: -24.3829,
      lng: -65.1149,
      rating: 3.9,
      features: ["Bowl", "Mini rampa", "Cajones"],
    },
    {
      id: 4,
      name: "Skatepark Libertador",
      lat: -23.8067,
      lng: -64.7876,
      rating: 4.0,
      features: ["Street", "Rieles", "Gaps"],
    },
  ])

  // Iconos personalizados
  const userIcon = useMemo(() => L.divIcon({
    className: 'bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg',
    html: '👤',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }), [])

  const skateparkIcon = useMemo(() => L.divIcon({
    className: 'bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg',
    html: '🛹',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  }), [])

  const shopIcon = useMemo(() => L.divIcon({
    className: 'bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg',
    html: '🏪',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }), [])

  // Datos de tu tienda
  const skateShop = useMemo(
    () => ({
      id: 0,
      name: "Skate Shop Jujuy",
      lat: -24.1858,
      lng: -65.2995,
      description: "Tu tienda de skate en Jujuy",
      address: "Av. Belgrano 1234, San Salvador de Jujuy",
    }),
    []
  )

  // Efecto para renderizado en cliente y manejo de carga
  useEffect(() => {
    setClientSide(true)
    // Si después de 5 segundos no se ha obtenido la ubicación, mostrar vista por defecto
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false)
        setError('No se pudo obtener tu ubicación. Mostrando vista por defecto.')
      }
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [loading])

  // Manejar posición encontrada
  const handlePositionFound = useCallback((position: UserPosition) => {
    setUserPosition(position)
    setLoading(false)
    setError(null)
  }, [])

  // Manejar error de posición
  const handlePositionError = useCallback(() => {
    setUserPosition(null)
    setLoading(false)
    setError("No se pudo obtener tu ubicación. Mostrando vista por defecto.")
    // Podrías agregar un toast o notificación aquí
  }, [])

  // Calcular skateparks cercanos
  const nearbySkateparks = useMemo(() => {
    if (!userPosition) return skateparks

    return skateparks
      .map((park) => ({
        ...park,
        distance: calculateDistance(userPosition.lat, userPosition.lng, park.lat, park.lng),
      }))
      .filter((park) => park.distance <= MAX_NEARBY_DISTANCE_KM)
      .sort((a, b) => a.distance - b.distance)
  }, [skateparks, userPosition])

  // Renderizado de carga
  if (!clientSide || loading) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto bg-gray-300" />
          <p className="text-gray-500">Cargando mapa...</p>
          <p className="text-sm text-gray-400">Obteniendo tu ubicación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      {/* Mapa principal */}
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker onPositionFound={handlePositionFound} onPositionError={handlePositionError} />

        {/* Marcador de la tienda */}
        <Marker position={[skateShop.lat, skateShop.lng]} icon={shopIcon}>
          <Popup>
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg text-blue-600">{skateShop.name}</h3>
              <p className="text-sm mt-1">{skateShop.description}</p>
              <p className="text-xs text-gray-600 mt-2">{skateShop.address}</p>
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                  Ver tienda
                </button>
                <button className="flex-1 bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                  Dirección
                </button>
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Marcador de usuario */}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Tu ubicación</p>
                {userPosition.accuracy && (
                  <p className="text-xs text-gray-600">Precisión: ~{Math.round(userPosition.accuracy)} metros</p>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Skateparks cercanos */}
        {nearbySkateparks.map((park) => (
          <Marker key={park.id} position={[park.lat, park.lng]} icon={skateparkIcon}>
            <Popup>
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-lg">{park.name}</h3>
                {park.distance && (
                  <p className="text-sm text-gray-600">
                    A {park.distance.toFixed(1)} km de {userPosition ? "ti" : "la tienda"}
                  </p>
                )}
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{park.rating}</span>
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-sm">Características:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {park.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 px-2 py-1 rounded-full whitespace-nowrap"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-amber-500 text-white py-1 px-2 rounded text-sm font-medium hover:bg-amber-600 transition-colors">
                    Ver detalles
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-1 px-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                    Cómo llegar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Panel de información */}
      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-10">
          <p>{error}</p>
        </div>
      )}

      {userPosition && nearbySkateparks.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-10 max-w-xs">
          <h3 className="font-bold">Skateparks cercanos</h3>
          <ul className="mt-2 space-y-2">
            {nearbySkateparks.slice(0, 3).map((park) => (
              <li key={park.id} className="flex justify-between items-center">
                <span className="text-sm">{park.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {park.distance?.toFixed(1)} km
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}