import { Map } from "./scripts/map.js";
import { Medida } from "./scripts/medida.js";

const map = new Map();

map.initLayers();

const medidas = Medida.groupByLocation(Medida.getMedidasFromDOM());

console.log(medidas);

medidas.forEach(m => {
    map.addMarker(
        m.latitude,
        m.longitude,
        `<b>${m.ponto}</b>`
    )
})