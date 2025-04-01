'use client'

import { useState } from "react";
import MapComponent from "./sharedComponents/MapContainer/MapContainer"
import Sidebar from "./sharedComponents/Sidebar/sidebar";
import { Map } from "ol";

const Home = () => {
  const [map, setMap] = useState<Map | null>(null);

  return (
  <div className="flex h-screen">
    <Sidebar map={map} />
    <MapComponent setMap={setMap} />
  </div>
  );
};

export default Home;
