export class Medida {
    ponto;
    latitude;
    longitude;
    data;
    odor;
    oleosGraxas;
    materiaisFlutuantes;

    constructor() { }

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

    static getMedidasFromDOM() {
        const medidas = [];
        const items = document.getElementsByClassName('medida-item');
        for(let i = 0; i < items.length; i++) {
            medidas.push(Medida.newFromDTO(items[i]));
        }
        return medidas;
    }
}