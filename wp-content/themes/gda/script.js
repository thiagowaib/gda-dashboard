import { Map } from "./scripts/map.js";
import { Medida } from "./scripts/medida.js";

const map = new Map();

map.initLayers();

const medidas = Medida.getMedidasFromDOM();
map.addMarker(
    medidas[0].latitude,
    medidas[0].longitude,
    `<b>${medidas[0].ponto}</b>`
);