'use client'

import { useEffect, useRef } from "react"
import { Map } from "ol";
import "ol/ol.css";

import {setupMap } from "./helpers";

type MapProps = {
  setMap: (map: Map | null) => void
}

const MapComponent = ({ setMap}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    setupMap(mapRef, setMap);
  }, [])

  return (
    <div ref={mapRef} className="h-full w-full shadow shadow-gray-400"></div>
  )
}

export default MapComponent;