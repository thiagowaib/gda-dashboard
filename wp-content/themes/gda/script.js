import { Map } from "./scripts/map.js";
import { Medida } from "./scripts/medida.js";
import { initBasicDOM, displayDataTables } from "./scripts/dom.js";

const map = new Map();

map.initLayers();

initBasicDOM(map);

const medidas = Medida.normalizeData(Medida.getMedidasFromDOM());

medidas.forEach(m => {
    const marker = map.addMarker(
        m.latitude,
        m.longitude,
        `<b>${m.ponto}</b>`
    )
    marker.on('click', () => {
        const mapDOMObject = document.getElementById('map');

        const heightBefore = mapDOMObject.offsetHeight;
        const widthBefore  = mapDOMObject.offsetWidth;
        displayDataTables(m, map);

        setTimeout(() => {
            const heightAfter = mapDOMObject.offsetHeight;
            const widthAfter  = mapDOMObject.offsetWidth;
            if(heightBefore !== heightAfter || widthBefore !== widthAfter) {
                map.getMap().setView([m.latitude, m.longitude], map.getMap().getZoom(), {animate: true, duration: .5});
                setTimeout(() => { 
                    map.getMap().invalidateSize();
                    map.getMap().setView([m.latitude, m.longitude], map.getMap().getZoom(), {animate: true});
                }, 151); // If Transition has occured, awaits its end 
            } else {
                map.getMap().setView([m.latitude, m.longitude], map.getMap().getZoom(), {animate: true});
            }
        }, 50); // Time to calculate any changes to Map size due to CSS Transition
    });
})