import { RefObject } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { CENTER_US } from "../../constants/MapConstants";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export const setupMap = (mapRef: RefObject<HTMLDivElement | null>, setMap: (map: Map | null) => void) => {
  if (mapRef.current) {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat(CENTER_US),
        zoom: 5
      })
    });

    setMap(initialMap);
    return () => initialMap.setTarget(undefined);

  } else {
    return;
  }
}

export const handleGetLocation = (map: Map | null) => {
  if (map) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = fromLonLat([longitude, latitude]);
  
        map.getView().animate({
          center: newCenter,
          duration: 1000,
          zoom: 17
        });
      },
      (error) => {
        console.log("Error getting location: ", error);
      }
    );
  } else {
    return;
  }
};

export const resetMap = (map: Map | null) => {
  if (map) {
    map.getView().animate({
      center: fromLonLat(CENTER_US),
      duration: 1000,
      zoom: 5
    });
  } else {
    return;
  }
}