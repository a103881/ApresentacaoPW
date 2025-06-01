const map = L.map('map', {
    center: [39.5, -8.0],
    zoom: 6,
    minZoom: 6,
    maxZoom: 8,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const cidades = [
    { nome: "Lisboa", coords: [38.7169, -9.1399]},
	{ nome: "Porto", coords: [41.1496, -8.6109] },
	{ nome: "Coimbra", coords: [40.2111, -8.4291] },
	{ nome: "Braga", coords: [41.5454, -8.4265] },
	{ nome: "Faro", coords: [37.0179, -7.9308] },
	{ nome: "Évora", coords: [38.5667, -7.9000] },
	{ nome: "Aveiro", coords: [40.6405, -8.6538] },
	{ nome: "Setúbal", coords: [38.5244, -8.8882] },
	{ nome: "Viseu", coords: [40.6566, -7.9125] },
	{ nome: "Leiria", coords: [39.7436, -8.8070] },
	{ nome: "Beja", coords: [38.0151, -7.8632] },
	{ nome: "Guarda", coords: [40.5373, -7.2675] },
	{ nome: "Castelo Branco", coords: [39.8222, -7.4918] },
	{ nome: "Viana do Castelo", coords: [41.6946, -8.8345] },
	{ nome: "Vila Real", coords: [41.3006, -7.7461] },
	{ nome: "Santarém", coords: [39.2362, -8.6859] },
	{ nome: "Bragança", coords: [41.8066, -6.7567] },
	{ nome: "Funchal", coords: [32.6669, -16.9241] }
];

document.addEventListener('DOMContentLoaded', () => {
    const auditoriasAceitesPorCidade = JSON.parse(localStorage.getItem('auditoriasAceitesPorCidade')) || {};

cidades.forEach(cidade => {
    const ocorrenciasAtivas = auditoriasAceitesPorCidade[cidade.nome] || 0;
    
    L.circleMarker(cidade.coords, {
        radius: 8,
        color: "#2c3e50",
        fillColor: "#4CAF50",
        fillOpacity: 0.6
    }).bindPopup(`
        <strong>${cidade.nome}</strong><br>
        Ocorrências Ativas: ${ocorrenciasAtivas}
    `).addTo(map);
});
});
//Profile
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('googleUser'));
    if (userData) {
        const nome = userData.nome;
        const email = userData.email;
        const foto = userData.foto;

        if (document.getElementById('userFoto')) document.getElementById('userFoto').src = foto;
        if (document.getElementById('userFotoBig')) document.getElementById('userFotoBig').src = foto;
        if (document.getElementById('userNome')) document.getElementById('userNome').textContent = nome;
        if (document.getElementById('userNomeBig')) document.getElementById('userNomeBig').textContent = nome;
        if (document.getElementById('userEmail')) document.getElementById('userEmail').textContent = email;
    }
});

function logoutGoogle() {
    localStorage.removeItem('googleUser');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const auditoriasAceitesPorCidade = JSON.parse(localStorage.getItem('auditoriasAceitesPorCidade')) || {};
    const corpoTabela = document.getElementById('tabelaAuditoriasAceitesPorCidade');

    if (corpoTabela) {
        corpoTabela.innerHTML = ''; // limpar conteúdo atual

        for (const cidade in auditoriasAceitesPorCidade) {
            const auditorias = auditoriasAceitesPorCidade[cidade];

            const row = document.createElement('tr');
            row.innerHTML = `
		  <td>${cidade}</td>
		  <td class="text-end">${auditorias.toLocaleString('pt-PT')}</td>`;
            corpoTabela.appendChild(row);
        }
    }
});