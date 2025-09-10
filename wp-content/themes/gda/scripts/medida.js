export class Medida {
    /** @property {string} */
    ponto;
    /** @property {number} */
    latitude;
    /** @property {number} */
    longitude;
    /** @property {string} */
    data;
    /** @property {string} */
    odor;
    /** @property {string} */
    oleosGraxas;
    /** @property {string} */
    materiaisFlutuantes;
    /** @property {string} */
    residuosSolidos;
    /** @property {string} */
    turbidez;
    /** @property {number} */
    ph;
    /** @property {number} */
    oxigenio;
    /** @property {number} */
    amonia;
    /** @property {number} */
    nitrito;
    /** @property {number} */
    nitrato;
    /** @property {number} */
    fosfato;
    /** @property {number} */
    coliformes;
    /** @property {number} */
    eColi;

    constructor() { }

    /**
     * @returns {Medida}
     */
    static newFromDTO(dto) {
        const m = new Medida();
        m.ponto = dto.getAttribute('ponto'),
        m.latitude = Number.parseFloat(dto.getAttribute('latitude')),
        m.longitude = Number.parseFloat(dto.getAttribute('longitude')),
        m.data = dto.getAttribute('data'),
        m.odor = dto.getAttribute('odor'),
        m.oleosGraxas = dto.getAttribute('oleosGraxas'),
        m.materiaisFlutuantes = dto.getAttribute('materiaisFlutuantes')
        m.residuosSolidos = dto.getAttribute('residuosSolidos');
        m.turbidez = dto.getAttribute('turbidez');
        m.ph = Number.parseFloat(dto.getAttribute('ph'));
        m.oxigenio = Number.parseFloat(dto.getAttribute('oxigenio'));
        m.amonia = Number.parseFloat(dto.getAttribute('amonia'));
        m.nitrito = Number.parseFloat(dto.getAttribute('nitrito'));
        m.nitrato = Number.parseFloat(dto.getAttribute('nitrato'));
        m.fosfato = Number.parseFloat(dto.getAttribute('fosfato'));
        m.coliformes = Number.parseFloat(dto.getAttribute('coliformes'));
        m.eColi = Number.parseFloat(dto.getAttribute('eColi'));
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

    /**
     * @param {string|null} str 
     * @param {string} validSubstring 
     * @return {'valid'|'invalid'|''} 
     */
    #getClassificationStringIncludes(str, validSubstring) {
        if(str != null && str.trim().length > 0) {
            return str.trim().toUpperCase().includes(validSubstring.toUpperCase()) ? 'valid' : 'invalid';
        } else {
            return '';
        }
    }

    /**
     * @param {number|null} number 
     * @param {number|null} lowerLimit 
     * @param {number|null} upperLimit
     * @return {'valid'|'invalid'|''} 
     */
    #getClassificationNumberLimit(number, lowerLimit = null, upperLimit = null) {
        if(number == null ||  !(typeof number === 'number')) {
            return '';
        }

        if(lowerLimit != null && upperLimit != null) {
            return number >= lowerLimit && number <= upperLimit ? 'valid' : 'invalid';
        } else if (lowerLimit != null) {
            return number >= lowerLimit ? 'valid' : 'invalid';
        } else if (upperLimit != null) {
            return number <= upperLimit ? 'valid' : 'invalid';
        } else {
            return '';
        }
    }

    getClassificationOdor() {
        return this.#getClassificationStringIncludes(this.odor, 'AUS');
    }

    getClassificationOleosGraxas() {
        return this.#getClassificationStringIncludes(this.oleosGraxas, 'AUS');
    }

    getClassificationMateriaisFlutuantes() {
        return this.#getClassificationStringIncludes(this.materiaisFlutuantes, 'AUS');
    }

    getClassificationResiduosSolidos() {
        return this.#getClassificationStringIncludes(this.residuosSolidos, 'AUS');
    }

    getClassificationTurbidez() {
        return this.#getClassificationNumberLimit(this.turbidez, null, 100);
    }

    getClassificationPh() {
        return this.#getClassificationNumberLimit(this.ph, 6, 9);
    }

    getClassificationOxigenio() {
        return this.#getClassificationNumberLimit(this.oxigenio, 5, null);
    }

    getClassificationAmonia() {
        return this.#getClassificationNumberLimit(this.amonia, null, 3.7);
    }

    getClassificationNitrito() {
        return this.#getClassificationNumberLimit(this.nitrato, null, 1);
    }

    getClassificationNitrato() {
        return this.#getClassificationNumberLimit(this.nitrato, null, 10);
    }

    getClassificationFosfato() {
        return this.#getClassificationNumberLimit(this.fosfato, null, 0.1);
    }

    getClassificationColiformes() {
        return this.#getClassificationNumberLimit(this.coliformes, null, 1000);
    }

    getClassificationEColi() {
        return this.#getClassificationNumberLimit(this.eColi, null, 2000);
    }

    getOdor() {
        return this.odor;
    }

    getOleosGraxas() {
        return this.oleosGraxas;
    }

    getMateriaisFlutuantes() {
        return this.materiaisFlutuantes;
    }

    getResiduosSolidos() {
        return this.residuosSolidos;
    }

    getTurbidez() {
        if(this.turbidez == null) {
            return '-';
        } else if (!(typeof this.turbidez === 'number')) {
            return this.turbidez.trim().length > 0 ? this.turbidez.trim() : '-';
        } else {
            return this.turbidez;
        }
    }

    getPh() {
        if(this.ph == null) {
            return '-';
        } else if (!(typeof this.ph === 'number')) {
            return this.ph.trim().length > 0 ? this.ph.trim() : '-';
        } else {
            return this.ph.toFixed(1).replace('.',',');
        }
    }

    getOxigenio() {
        if(this.oxigenio == null) {
            return '-';
        } else if (!(typeof this.oxigenio === 'number')) {
            return this.oxigenio.trim().length > 0 ? this.oxigenio.trim() : '-';
        } else {
            return this.oxigenio.toFixed(2).replace('.',',');
        }
    }

    getAmonia() {
        if(this.amonia == null) {
            return '-';
        } else if (!(typeof this.amonia === 'number')) {
            return this.amonia.trim().length > 0 ? this.amonia.trim() : '-';
        } else {
            return this.amonia.toFixed(2).replace('.',',');
        }
    }

    getNitrito() {
        if(this.nitrito == null) {
            return '-';
        } else if (!(typeof this.nitrito === 'number')) {
            return this.nitrito.trim().length > 0 ? this.nitrito.trim() : '-';
        } else {
            return this.nitrito.toFixed(2).replace('.',',');
        }
    }

    getNitrato() {
        if(this.nitrato == null) {
            return '-';
        } else if (!(typeof this.nitrato === 'number')) {
            return this.nitrato.trim().length > 0 ? this.nitrato.trim() : '-';
        } else {
            return this.nitrato.toFixed(2).replace('.',',');
        }
    }

    getFosfato() {
        if(this.fosfato == null) {
            return '-';
        } else if (!(typeof this.fosfato === 'number')) {
            return this.fosfato.trim().length > 0 ? this.fosfato.trim() : '-';
        } else {
            return this.fosfato.toFixed(2).replace('.',',');
        }
    }

    getColiformes() {
        if(this.coliformes == null) {
            return '-';
        } else if (!(typeof this.coliformes === 'number')) {
            return this.coliformes.trim().length > 0 ? this.coliformes.trim() : '-';
        } else {
            return this.coliformes.toFixed(0).replace('.',',');
        }
    }

    getEColi() {
        if(this.eColi == null) {
            return '-';
        } else if (!(typeof this.eColi === 'number')) {
            return this.eColi.trim().length > 0 ? this.eColi.trim() : '-';
        } else {
            return this.eColi.toFixed(0).replace('.',',');
        }
    }

}