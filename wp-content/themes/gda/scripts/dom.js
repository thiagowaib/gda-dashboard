import { Medida } from "./medida";

const mapSection    = document.getElementById('map-section');
const dataSection   = document.getElementById('data-section');
const dataAnchor    = document.getElementById('data-table-anchor');
const dataPointDesc = document.getElementById('data-point-description');
const dataDateDesc  = document.getElementById('data-date-description');
const btnCloseDataSection = document.getElementById('btn-close-data-section');
const btnDataPrevious     = document.getElementById('data-previous');
const btnDataNext         = document.getElementById('data-next');

/**
 * @param {Medida} medida 
 */
function showData(medida) {
    mapSection.classList.add("data-shown");
    dataSection.classList.add("data-shown");

    if(medida.ponto.toUpperCase().includes("PONTO")) {
        dataPointDesc.innerHTML = medida.ponto;
    } else {
        dataPointDesc.innerHTML = "Ponto de Coleta " + medida.ponto.toUpperCase();
    }
    dataDateDesc.innerHTML  = "Medição feita em " + medida.data;
}

function hideData() {
    mapSection.classList.remove("data-shown");
    dataSection.classList.remove("data-shown");

    dataPointDesc.innerHTML = '';
    dataDateDesc.innerHTML  = '';
    dataAnchor.innerHTML = '';
}

function cycleDataPrevious() {
    const tables = dataAnchor.children;
    let actualIndex;
    for(let i = 0; i < tables.length; i++) {
        if(tables[i].classList.contains("visible")) {
            actualIndex = i;
            break;
        }
    }

    if(actualIndex >= (tables.length - 1)) {
        return;
    }

    for(let i = 0; i < tables.length; i++) {
        if(i === (actualIndex + 1)) {
            tables[i].classList.add("visible");
            dataDateDesc.innerHTML = "Medição feita em " + tables[i].getAttribute("date");
        } else {
            tables[i].classList.remove("visible");
        }
    }
}

function cycleDataNext() {
    const tables = dataAnchor.children;
    let actualIndex;
    for(let i = 0; i < tables.length; i++) {
        if(tables[i].classList.contains("visible")) {
            actualIndex = i;
            break;
        }
    }

    if(actualIndex <= 0) {
        return;
    }

    for(let i = 0; i < tables.length; i++) {
        if(i === (actualIndex - 1)) {
            tables[i].classList.add("visible");
            dataDateDesc.innerHTML = "Medição feita em " + tables[i].getAttribute("date");
        } else {
            tables[i].classList.remove("visible");
        }
    }
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

export function initBasicDOM() {
    btnCloseDataSection.addEventListener('click', hideData);
    btnDataPrevious.addEventListener('click', cycleDataPrevious);
    btnDataNext.addEventListener('click', cycleDataNext);
}

/**
 * @param {{latitude: string;longitude: string;ponto: string;medidas: Medida[]}} m 
 */
export function displayDataTables(m) {
    const anchor = document.getElementById('data-table-anchor');
    anchor.innerHTML = '';
    
    toggleData(m.medidas[0]);
    if(!isDataShown()) return; 

    m.medidas.forEach((medida, i) => {
        const table = medida.toHTMLTable();
        table.classList.add("data-table")
        if(i === 0) {
            table.classList.add("visible")
        }
        table.setAttribute("date", medida.data);
        anchor.appendChild(table);
    });
}