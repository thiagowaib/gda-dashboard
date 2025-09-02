export class Medida {
    ponto;
    latitude;
    longitude;
    data;
    odor;
    oleosGraxas;
    materiaisFlutuantes;

    constructor() { }

    /**
     * @returns {Medida}
     */
    static newFromDTO(dto) {
        const m = new Medida();
        m.ponto = dto.getAttribute('ponto'),
        m.latitude = dto.getAttribute('latitude'),
        m.longitude = dto.getAttribute('longitude'),
        m.data = dto.getAttribute('data'),
        m.odor = dto.getAttribute('odor'),
        m.oleosGraxas = dto.getAttribute('oleosGraxas'),
        m.materiaisFlutuantes = dto.getAttribute('materiaisFlutuantes')
        return m;
    }

    /**
     * @returns {Medida[]}
     */
    static getMedidasFromDOM() {
        const medidas = [];
        const items = document.getElementsByClassName('medida-item');
        for(let i = 0; i < items.length; i++) {
            medidas.push(Medida.newFromDTO(items[i]));
        }
        if(items != null && items.length > 0) {
            items[0].parentElement.remove();
        }
        return medidas;
    }

    /**
     * @param {Medida[]} arr
     * @return {[{latitude: string, longitude: string, ponto: string, medidas: Medida[]}]}
     */
    static normalizeData(arr) {
        const medidas = {};
        arr.forEach(m => {
            if(m.ponto in medidas) {
                medidas[m.ponto].medidas.push(m);
            } else {
                medidas[m.ponto] = {
                    ponto: m.ponto,
                    latitude: m.latitude,
                    longitude: m.longitude,
                    medidas: [m]
                };
            }
        });

        const medArray = [];
        for(const [ponto, dados] of Object.entries(medidas)) {
            dados.medidas.sort((a, b) => {
                const dateA = a.data.split('/').reverse().join('-'); // Convert to "YYYY-MM-DD"
                const dateB = b.data.split('/').reverse().join('-'); // Convert to "YYYY-MM-DD"
                // return new Date(dateA) - new Date(dateB); // Asc
                return new Date(dateB) - new Date(dateA); // Desc
            })
            medArray.push({
                ponto: dados.ponto,
                latitude: dados.latitude,
                longitude: dados.longitude,
                medidas: dados.medidas
            })
        }
        return medArray;
    }

    toHTMLTable() {
        const headers = `
            <tr class="table-header-row">
                <th>Parâmetro</th>
                <th>Padrão Legal</th>
                <th>Valor</th>
            </tr>
        `

        const data = `
            <tr class="data-table-row">
                <td class="data-table-label">Odor</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement">${this.odor}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Óleos e Graxas</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement">${this.oleosGraxas}</td>
            </tr>
            <tr class="data-table-row">
                <td class="data-table-label">Materiais Flutuantes</td>
                <td class="data-table-standard">Ausência</td>
                <td class="data-table-measurement">${this.materiaisFlutuantes}</td>
            </tr>
        `

        const table = document.createElement("table");
        table.innerHTML = `${headers}${data}`;

        return table;
    }
}