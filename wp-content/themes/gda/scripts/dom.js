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
        const table = medidaAsHTMLTable(medida);
        table.classList.add("data-table")
        if(i === 0) {
            table.classList.add("visible")
        }
        table.setAttribute("date", medida.data);
        anchor.appendChild(table);
    });
}

/**
 * @param {Medida} m 
 * @returns string
 */
function medidaAsHTMLTable(m) {
        const headers = `
            <tr class="table-header-row">
                <th class="data-table-label">Parâmetro</th>
                <th class="data-table-standard">Padrão Legal</th>
                <th class="data-table-measurement">Valor</th>
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
                <td class="data-table-standard">≤ 3,7 mg/L N (pH ≤ 7,5)</td>
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
                <td class="data-table-standard">≤ 1000 UFC / 100ml água</td>
                <td class="data-table-measurement ${m.getClassificationColiformes()}">${m.getColiformes()}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">UFC E. coli / 100ml</td>
                <td class="data-table-standard">≤ 2000 UFC / 100ml água</td>
                <td class="data-table-measurement ${m.getClassificationEColi()}">${m.getEColi()}</td>
            </tr>
        `
        const table = document.createElement("table");
        table.innerHTML = `${headers}${data}`;
        return table;
}