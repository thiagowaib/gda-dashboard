import { Medida } from "./medida.js";
import { Map } from "./map.js";

const mapSection    = document.getElementById('map-section');
const dataSection   = document.getElementById('data-section');
const dataAnchor    = document.getElementById('data-table-anchor');
const dataPointDesc = document.getElementById('data-point-description');
const dataDateDesc  = document.getElementById('data-date-description');
const btnCloseDataSection = document.getElementById('btn-close-data-section');
const btnDataPrevious     = document.getElementById('data-previous');
const btnDataNext         = document.getElementById('data-next');
const dataDotAnchor     = document.getElementById('data-dot-container');

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

/**
 * @param {Map} map 
 */
function hideData(map) {
    dataSection.classList.remove("data-shown");
    mapSection.classList.remove("data-shown");
    dataPointDesc.innerHTML = '';
    dataDateDesc.innerHTML  = '';
    dataAnchor.innerHTML = '';
    dataDotAnchor.innerHTML = '';
    map.getMap().invalidateSize();
}

function getActualIndex() {
    const tables = dataAnchor.children;
    let actualIndex;
    for(let i = 0; i < tables.length; i++) {
        if(tables[i].classList.contains("visible")) {
            actualIndex = i;
            break;
        }
    }
    return actualIndex;
}

function cycleDataPrevious() {
    const tables = dataAnchor.children;
    const actualIndex = getActualIndex();
    if(actualIndex == undefined || actualIndex >= tables.length - 1) return;

    const dots   = dataDotAnchor.children;
    for(let i = 0; i < tables.length; i++) {
        if(i === (actualIndex + 1)) {
            tables[i].classList.add("visible");
            dataDateDesc.innerHTML = "Medição feita em " + tables[i].getAttribute("date");
            dots[i].classList.add("selected");
        } else {
            tables[i].classList.remove("visible");
            dots[i].classList.remove("selected");
        }
    }
}

function cycleDataNext() {
    const tables = dataAnchor.children;
    const actualIndex = getActualIndex();
    if(actualIndex == undefined || actualIndex <= 0) return;

    const dots   = dataDotAnchor.children;
    for(let i = 0; i < tables.length; i++) {
        if(i === (actualIndex - 1)) {
            tables[i].classList.add("visible");
            dataDateDesc.innerHTML = "Medição feita em " + tables[i].getAttribute("date");
            dots[i].classList.add("selected");
        } else {
            tables[i].classList.remove("visible");
            dots[i].classList.remove("selected");
        }
    }
}

function cycleDataToIndex(index) {
    const tables = dataAnchor.children;
    const dots   = dataDotAnchor.children;
    for(let i = 0; i < tables.length; i++) {
        if(i === (index)) {
            tables[i].classList.add("visible");
            dataDateDesc.innerHTML = "Medição feita em " + tables[i].getAttribute("date");
            dots[i].classList.add("selected");
        } else {
            tables[i].classList.remove("visible");
            dots[i].classList.remove("selected");
        }
    }
}

/**
 * @param {Medida} medida 
 * @param {Map} map
 */
export function toggleData(medida, map) {
    const shownPoint = dataPointDesc.innerHTML;
    if(shownPoint === '') {
        showData(medida);
    } else if (shownPoint === medida.ponto) {
        hideData(map);
    } else if (shownPoint !== medida.ponto) {
        showData(medida);
    }
}

export function isDataShown() {
    return dataSection.classList.contains("data-shown");
}

/**
 * @param {Map} map 
 */
export function initBasicDOM(map) {
    btnCloseDataSection.addEventListener('click', () => hideData (map));
    btnDataPrevious.addEventListener('click', cycleDataPrevious);
    btnDataNext.addEventListener('click', cycleDataNext);
}

/**
 * @param {{latitude: string;longitude: string;ponto: string;medidas: Medida[]}} m 
 */
export function displayDataTables(m, map) {
    const anchor = document.getElementById('data-table-anchor');
    anchor.innerHTML = '';
    dataDotAnchor.innerHTML = '';
    
    toggleData(m.medidas[0], map);
    if(!isDataShown()) return; 

    m.medidas.forEach((medida, i) => {
        const table = medidaAsHTMLTable(medida);
        table.classList.add("data-table")
        if(i === 0) {
            table.classList.add("visible")
        }
        table.setAttribute("date", medida.data);
        anchor.appendChild(table);

        createDot(i);
    });
}

/**
 * Instantiates new dot below data-table container
 * @param {number} index 
 */
function createDot(index) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(index === 0) {
        dot.classList.add('selected');
    }
    dot.innerHTML = '&#9679;';
    dot.addEventListener('click', () => {console.log(index); cycleDataToIndex(index)});
    dataDotAnchor.appendChild(dot);
}

/**
 * @param {Medida} m 
 * @returns string
 */
function medidaAsHTMLTable(m) {
        const headers = `
            <tr class="table-header-row">
                <th class="data-table-label"><i>Parâmetro</i></th>
                <th class="data-table-standard"><i>Padrão</i> Legal</th>
                <th class="data-table-measurement"><i>Valor</i></th>
            </tr>
        `

        const data = `
            <tr class="data-table-row">
                <td class="data-table-label">Odor</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement ${m.getClassificationOdor()}">${m.getOdor()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Óleos e Graxas</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement ${m.getClassificationOleosGraxas()}">${m.getOleosGraxas()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Materiais Flutuantes</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement ${m.getClassificationMateriaisFlutuantes()}">${m.getMateriaisFlutuantes()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Residuos Sólidos Objetáveis</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement ${m.getClassificationResiduosSolidos()}">${m.getResiduosSolidos()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Turbidez</td>
                <td class="data-table-standard">≤ 100 UNT</td>
                <td class="data-table-measurement ${m.getClassificationTurbidez()}">${m.getTurbidez()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">pH</td>
                <td class="data-table-standard">Entre 6,0 e 9,0</td>
                <td class="data-table-measurement ${m.getClassificationPh()}">${m.getPh()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Oxigênio Dissolvido</td>
                <td class="data-table-standard">≥ 5,0 ppm mg/L O₂</td>
                <td class="data-table-measurement ${m.getClassificationOxigenio()}">${m.getOxigenio()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Amônia</td>
                <td class="data-table-standard">≤ 3,7 mg/L N<br/><span>(pH ≤ 7,5)</span></td>
                <td class="data-table-measurement ${m.getClassificationAmonia()}">${m.getAmonia()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Nitrito</td>
                <td class="data-table-standard">≤ 1,0 mg/L N</td>
                <td class="data-table-measurement ${m.getClassificationNitrito()}">${m.getNitrito()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Nitrato</td>
                <td class="data-table-standard">≤ 10,0 mg/L N</td>
                <td class="data-table-measurement ${m.getClassificationNitrato()}">${m.getNitrato()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Fosfato</td>
                <td class="data-table-standard">≤ 0,1 mg/L P</td>
                <td class="data-table-measurement ${m.getClassificationFosfato()}">${m.getFosfato()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">UFC coliformes totais / 100ml</td>
                <td class="data-table-standard">≤ 1000 UFC /<br/><span>100ml água</span></td>
                <td class="data-table-measurement ${m.getClassificationColiformes()}">${m.getColiformes()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">UFC <i>E. coli</i> / 100ml</td>
                <td class="data-table-standard">≤ 2000 UFC /<br/><span>100ml água</span></td>
                <td class="data-table-measurement ${m.getClassificationEColi()}">${m.getEColi()}</td>
            </tr>
        `
        const table = document.createElement("table");
        table.innerHTML = `${headers}${data}`;
        return table;
}