import { Map } from "./scripts/map.js";
import { Medida } from "./scripts/medida.js";
import { initBasicDOM, displayDataTables } from "./scripts/dom.js";

const map = new Map();

map.initLayers();

initBasicDOM();

const medidas = Medida.normalizeData(Medida.getMedidasFromDOM());

medidas.forEach(m => {
    const marker = map.addMarker(
        m.latitude,
        m.longitude,
        `<b>${m.ponto}</b>`
    )
    marker.on('click', () => {
        displayDataTables(m)
        // setTimeout(() => {
            // map.getMap().invalidateSize();
            map.getMap().panTo([m.latitude, m.longitude])
        // }, 200);
    });
})