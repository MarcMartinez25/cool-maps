import { Map } from "ol";
import { handleGetLocation, resetMap } from "../MapContainer/helpers";

type sidebarProps = {
  map: Map | null
}
const Sidebar = ({ map }: sidebarProps) => {
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
        className="py-1 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Reset
      </button>
    </div>
  )
}

export default Sidebar;