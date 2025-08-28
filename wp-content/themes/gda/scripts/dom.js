import { Medida } from "./medida";

const tableAnchor   = document.getElementById('table-anchor');
const mapSection    = document.getElementById('map-section');
const dataSection   = document.getElementById('data-section');
const dataPointDesc = document.getElementById('data-point-description');
const dataDateDesc  = document.getElementById('data-date-description');

/**
 * @param {Medida} medida 
 */
function showData(medida) {
    mapSection.classList.add("data-shown");
    dataSection.classList.add("data-shown");

    dataPointDesc.innerHTML = medida.ponto;
    dataDateDesc.innerHTML  = medida.data;
}

function hideData() {
    mapSection.classList.remove("data-shown");
    dataSection.classList.remove("data-shown");

    dataPointDesc.innerHTML = '';
    dataDateDesc.innerHTML  = '';
}

/**
 * @param {Medida} medida 
 */
export function toggleData(medida) {
    const shownPoint = dataPointDesc.innerHTML;
    if(shownPoint === '') {
        showData(medida);
    } else if (shownPoint === medida.ponto) {
        hideData();
    } else if (shownPoint !== medida.ponto) {
        showData(medida);
    }
}

export function isDataShown() {
    return dataSection.classList.contains("data-shown");
}