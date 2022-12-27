import { Overlay as OLOverlay } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useContext, useEffect } from "react";
import {  renderToString } from "react-dom/server";
import MapContext from "../Map/MapContext";
const Overlay = ({ children, coor, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map || !children || !coor) return;

    const element = document.createElement("overlay");
    element.innerHTML = renderToString(children);
    let overlay = new OLOverlay({
      position: fromLonLat(coor),
      element,
      zIndex,
    });

    map.addOverlay(overlay);

    return () => {
      if (map) {
        map.removeOverlay(overlay);
      }
    };
  }, [map, children, coor, zIndex]);

  return null;
};

export default Overlay