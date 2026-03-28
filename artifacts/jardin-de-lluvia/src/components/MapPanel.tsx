import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAnalysis } from '@/context/AnalysisContext';
import { Droplet, Leaf } from 'lucide-react';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon using standard Leaflet DivIcon with Tailwind classes
const customMarkerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white ring-4 ring-primary/20 transform -translate-y-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22S7 16 7 11A5 5 0 0 1 17 11c0 5-5 11-5 11Z"/><circle cx="12" cy="11" r="2"/></svg>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapEvents() {
  const { setCoordinates } = useAnalysis();
  useMapEvents({
    click(e) {
      setCoordinates([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapPanel() {
  const { coordinates, area, treesNeeded, waterCaptured } = useAnalysis();

  // Calculate radius for the circle to represent the area visually
  // Area = pi * r^2 => r = sqrt(Area / pi)
  const radius = Math.sqrt(area / Math.PI);

  return (
    <div className="relative w-full h-full z-0 overflow-hidden bg-muted">
      <MapContainer 
        center={coordinates} 
        zoom={15} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles grayscale-[30%] contrast-[90%] sepia-[110%] hue-rotate-[10deg] opacity-90" // Stylized tiles
        />
        <MapEvents />
        <MapUpdater center={coordinates} />
        
        <Circle 
          center={coordinates} 
          radius={radius} 
          pathOptions={{ 
            color: 'hsl(var(--primary))', 
            fillColor: 'hsl(var(--primary))', 
            fillOpacity: 0.2,
            weight: 2,
            dashArray: '4 4'
          }} 
        />
        
        <Marker position={coordinates} icon={customMarkerIcon} />
      </MapContainer>

      {/* Floating Info Card */}
      <div className="absolute top-6 right-6 z-[400] bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 max-w-[250px]">
        <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Zona Seleccionada
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-leaf/10 rounded-lg text-leaf shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Árboles Sugeridos</p>
              <p className="text-sm font-bold text-foreground">{treesNeeded} unidades</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-water/10 rounded-lg text-water shrink-0">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Captación de Agua</p>
              <p className="text-sm font-bold text-foreground">{waterCaptured.toLocaleString()} L/año</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
