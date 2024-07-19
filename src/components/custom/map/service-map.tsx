"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { FaMapMarkerAlt } from "react-icons/fa";
import { divIcon, LatLngTuple } from "leaflet";

import * as ReactDomServer from "react-dom/server";
import { useCallback, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "./style.css";

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  position: Position;
  popUpMessage?: string;
};

const ServiceMap = ({ position, popUpMessage }: Props) => {
  return (
    <MapContainer
      className="aspect-[11/8] w-full rounded-lg md:aspect-[11/6]"
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      doubleClickZoom={true}
      fadeAnimation={true}
      zoomAnimation={true}
      zoomControl={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController position={position} />
      <Marker
        riseOnHover={true}
        position={position}
        icon={divIcon({
          html: ReactDomServer.renderToString(
            <FaMapMarkerAlt size={30} className="text-primary" />,
          ),
        })}
      >
        <Popup>{popUpMessage}</Popup>
      </Marker>
    </MapContainer>
  );
};

type MapControllerProps = {
  position: Position;
};
const MapController = ({ position }: MapControllerProps) => {
  const map = useMap();
  const flyToDuration = 1.5;

  const flyTo = useCallback(
    (position: Position) => {
      map.flyTo(position, 15, {
        animate: true,
        duration: flyToDuration,
      });
    },
    [map],
  );

  const flyToCenter = useCallback(() => {
    map.flyTo([59.914, 10.734], 15, {
      animate: true,
      duration: flyToDuration,
    });
  }, [map]);

  useEffect(() => {
    if (position) {
      flyTo(position);
    } else {
      flyToCenter();
    }
  }, [flyTo, flyToCenter, position]);

  return null;
};

export default ServiceMap;
