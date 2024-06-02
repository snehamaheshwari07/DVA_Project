import * as L from "leaflet";
import crimeExtent from "./../../crime/extent.json";
import crimeHeatmap from "./../../crime/heatmap.png";
import trafficExtent from "./../../traffic/extent.json";
import trafficHeatmap from "./../../traffic/heatmap.png";

export function loadTrafficHeatmap(map: L.Map) {
    const overlay = L.imageOverlay(trafficHeatmap, [
        [trafficExtent.latitude_min, trafficExtent.longitude_min],
        [trafficExtent.latitude_max, trafficExtent.longitude_max],
    ]).addTo(map);
    return () => map.removeLayer(overlay);
}

export function loadCrimeHeatmap(map: L.Map) {
    const overlay = L.imageOverlay(crimeHeatmap, [
        [crimeExtent.latitude_min, crimeExtent.longitude_min],
        [crimeExtent.latitude_max, crimeExtent.longitude_max],
    ]).addTo(map);
    return () => map.removeLayer(overlay);
}

export function loadNothing(map: L.Map) {
    return () => {};
}

interface Heatmap {
    name: string;
    load: (map: L.Map) => () => void;
}

export const heatmaps: Heatmap[] = [
    { name: "OFF", load: loadNothing },
    { name: "Traffic", load: loadTrafficHeatmap },
    { name: "Crime", load: loadCrimeHeatmap },
];
