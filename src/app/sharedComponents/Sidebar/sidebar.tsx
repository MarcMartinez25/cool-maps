import { Map } from "ol";
import { Draw } from "ol/interaction"
import { handleGetLocation, resetMap } from "../MapContainer/helpers";
import { useEffect, useState } from "react";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { buildStyle, handleStartDrawing } from "./helpers";

type sidebarProps = {
  map: Map | null
}
const Sidebar = ({ map }: sidebarProps) => {
  const [drawingType, setDrawingType] = useState<"LineString" | "Point" | null>(null);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#ff0000");

  const LineTypeStyle = drawingType === "LineString" ? "bg-red-600" : "bg-green-600";
  const PointTypeStyle = drawingType === "Point" ? "bg-red-600" : "bg-green-600";

  useEffect(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        buildStyle(feature);
      }
    });
  }, []);
  
  return (
    <div className="flex flex-col items-baseline w-[20vw] p-2 bg-gray-800 ">
      <button
        onClick={() => handleGetLocation(map)}
        className="py-1 px-2 m-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Get My Location
      </button>
      <button
        onClick={() => resetMap(map)}
        className="py-1 px-2 m-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Reset
      </button>
      <button
        onClick={() => handleStartDrawing(map, "LineString", draw, setDraw, setDrawingType, selectedColor)}
        className={`py-1 px-2 m-1 ${LineTypeStyle} text-white rounded-md hover:bg-blue-700 transistion`}
      >
        {drawingType === "LineString" ? "Stop Drawing Line" : "Start Drawing Line"}
      </button>
      <button
        onClick={() => handleStartDrawing(map, "Point", draw, setDraw, setDrawingType, selectedColor)}
        className={`py-1 px-2 m-1 ${PointTypeStyle} text-white rounded-md hover:bg-blue-700 transistion`}
      >
        {drawingType === "Point" ? "Stop Adding Points" : "Start Adding Points"}
      </button>
      <div className="flex items-center m-1 pl-1">
        <label className="text-white ">Point Color:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-10 h-10 p-1 ml-2 border rounded-md cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Sidebar;