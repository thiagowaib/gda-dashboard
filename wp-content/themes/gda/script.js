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

const map = L.map('map', {
    center: [-19.72806, -50.19556],
    zoom: 15,
    layers: [Esri_WorldImagery, osm]
});

const layerControl = L.control.layers({
    "Visão de Satélite": Esri_WorldImagery,
    "Visão de Mapa": osm,
}).addTo(map);

const obj = document.getElementsByClassName('leaflet-control-layers-selector')[0];
obj.parentElement.click();