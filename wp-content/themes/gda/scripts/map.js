export class Map {
    constructor() {
        this.map = L.map('map', {
            center: [-19.72806, -50.19556],
            zoom: 15
        });
    }

    /**
     * Initializes Map Layers
     */
    initLayers() {
        const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 17,
            minZoom: 14,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })

        const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            minZoom: 14,
            attribution: '© OpenStreetMap'
        });

        L.control.layers({
            "Visão de Satélite": Esri_WorldImagery,
            "Visão de Mapa": osm,
        }).addTo(this.map);

        document.getElementsByClassName('leaflet-control-layers-selector')[0].parentElement.click();
    }

    /**
     * @returns Leaftlet Map Object
     */
    getMap() {
        return this.map;
    }

    addMarker(latitude, longitude, description) {
        const marker = L.marker([latitude, longitude]);
        this.map.addLayer(marker);
        marker.bindPopup(`<b>${description}</b>`);
    }
}