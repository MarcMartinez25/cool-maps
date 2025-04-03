import { Map } from "ol";
import Feature, { FeatureLike } from "ol/Feature";
import VectorSource from "ol/source/Vector";
import {Fill, Circle, Stroke, Style} from "ol/style";
import { Draw } from "ol/interaction"
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";

export const buildStyle = (feature: FeatureLike) => {

  if (feature.getGeometry()?.getType() === "Point") {
    return new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: feature.get("color") || "#ff0000"}),
        stroke: new Stroke({ color: "#000", width: 2})
      })
    });
  }

  return new Style({
    stroke: new Stroke({
      color: "blue",
      width: 3
    })
  });
};

export const handleStartDrawing = (
  map: Map | null,
  drawType: "LineString" | "Point",
  draw: Draw | null,
  setDraw: (draw: Draw | null) => void,
  setDrawingType: (type: "LineString" | "Point" | null) => void,
  selectedColor: string
) => {
  if (map) {
    if (draw) {
      map.removeInteraction(draw);
      setDraw(null);
      setDrawingType(null);
      return;
    }

    const vectorLayer = map.getLayers().item(1) as VectorLayer<VectorSource>;
    const vectorSource =  vectorLayer.getSource();

    if (drawType === 'Point') {
      map.on("click", (event) => {
        const pointFeature = new Feature({
          geometry: new Point(event.coordinate),
          color: selectedColor
        });

        if (vectorSource) {
          vectorSource.addFeature(pointFeature);
        }
      });
    } else {
      const drawInteraction = new Draw({
        source: vectorSource as VectorSource,
        type: drawType
      });
      
      map.addInteraction(drawInteraction);
      setDraw(drawInteraction);
    }

    setDrawingType(drawType);
  }
}