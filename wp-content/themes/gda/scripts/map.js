export class Map {
    constructor() {
        this.map = L.map('map', {
            center: [-19.72806, -50.19556],
            zoom: 14
        });
        this.redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [21, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        this.blueIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [21, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        this.orangeIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [21, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        this.violetIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [21, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    /**
     * Initializes Map Layers
     */
    initLayers() {
        const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 17,
            minZoom: 10,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })

        const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            minZoom: 10,
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

    /**
     * @param {number} latitude 
     * @param {number} longitude 
     * @param {string} description
     * @return {marker} 
     */
    addMarker(latitude, longitude, description) {
        const marker = L.marker([latitude, longitude], {icon: this.getIcon(description)});
        this.map.addLayer(marker);
        marker.bindPopup(`<b>${description}</b>`);
        return marker;
    }

    /**
     * @param {string} description
     */
    getIcon(description) {
        if(description.toUpperCase().trim().includes("QUATI")) {
            return this.redIcon;
        } else if (description.toUpperCase().trim().includes("ROSA")) {
            return this.violetIcon;
        } else if (description.toUpperCase().trim().includes("ALTO")) {
            return this.orangeIcon;
        } else {
            return this.blueIcon;
        }
    }
}