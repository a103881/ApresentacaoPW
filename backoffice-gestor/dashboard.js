const ctx = document.getElementById('statisticsChart').getContext('2d');

const myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Ocorrências a decorrer',
				data: [160, 190, 180, 200, 210, 230, 240, 280, 260, 310, 320, 370],
				backgroundColor: 'rgba(208, 91, 91, 0.3)',
				borderColor: 'rgba(208, 91, 91, 0.8)',
				fill: true,
				tension: 0.4,
				stack: 'combined',
				order: 1
			},
			{
				label: 'Ocorrências resolvidas',
				data: [100, 60, 80, 90, 40, 30, 10, 30, 70, 120, 130, 140],
				backgroundColor: 'rgba(240, 176, 76, 0.3)',
				borderColor: 'rgba(240, 176, 76, 0.8)',
				fill: true,
				tension: 0.4,
				stack: 'combined',
				order: 1
			},
			{
				label: 'Ocorrências aceites',
				data: [270, 220, 180, 250, 280, 190, 130, 140, 240, 170, 230, 370],
				backgroundColor: 'rgba(99, 165, 242, 0.3)',
				borderColor: 'rgba(99, 165, 242, 0.8)',
				fill: true,
				tension: 0.4,
				stack: 'combined',
				order: 1
			}
		]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					usePointStyle: true,
					boxWidth: 10
				}
			}
		},
		scales: {
			y: {
				stacked: true,
				beginAtZero: true,
				max: 1000
			},
			x: {
				stacked: true
			}
		}
	}
});

const boundsPortugal = [[36.8, -9.6], [42.2, -6.0]];

const map = L.map('map', {
	center: [39.5, -8.0],
	zoom: 6,
	minZoom: 6,
	maxZoom: 8,
	maxBounds: boundsPortugal,
	maxBoundsViscosity: 1.0
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
	const auditoriasPorCidade = JSON.parse(localStorage.getItem('auditoriasPorCidade'));
	const custoPorAuditoria = 22.5;
	
	cidades.forEach(cidade =>{
		const auditorias = auditoriasPorCidade[cidade.nome] || 0;
		const custo = auditorias * custoPorAuditoria;

		L.circleMarker(cidade.coords, {
			radius: 8,
			color: "#2c3e50",
			fillColor: "#4CAF50",
			fillOpacity: 0.6
		})
			.bindPopup(`
					<strong>${cidade.nome}</strong><br>
					Auditorias: ${auditorias}<br>
					Custo: €${custo.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
				`)
			.addTo(map);
	});
	const userData = JSON.parse(localStorage.getItem('googleUser'));
      if (userData) {
        document.getElementById('nomePerfil').textContent = userData.nome;
        document.getElementById('emailPerfil').textContent = userData.email;
        document.getElementById('fotoPerfil').src = userData.foto;

        document.getElementById('userFoto').src = userData.foto;
        document.getElementById('userFotoBig').src = userData.foto;
        document.getElementById('userNome').textContent = userData.nome;
        document.getElementById('userNomeBig').textContent = userData.nome;
        document.getElementById('userEmail').textContent = userData.email;
      } else {
        document.querySelector('body').innerHTML = '<div class="text-center text-red-600 mt-20">Utilizador não autenticado. <a href="login.html" class="underline text-[#037171]">Voltar ao login</a></div>';
      }
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
	};

	//Para teste manual do localstorage
	//localStorage.setItem('auditorias', '2758457584');

	document.addEventListener('DOMContentLoaded', () => {
		const Auditorias = localStorage.getItem('auditorias');
		if (Auditorias && document.getElementById('IDAuditorias')) {
			document.getElementById('IDAuditorias').textContent = Auditorias;
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		const Profissionais = localStorage.getItem('peritosAtivos');
		if (Profissionais && document.getElementById('IDprofissionaisServico')) {
			document.getElementById('IDprofissionaisServico').textContent = Profissionais;
		}
	});

	//Para teste manual do localstorage
	//localStorage.setItem('profissionais', '2758457584');

	document.addEventListener('DOMContentLoaded', () => {
		const Profissionais = localStorage.getItem('profissionais');
		if (Profissionais && document.getElementById('IDprofissionais')) {
			document.getElementById('IDprofissionais').textContent = Profissionais;
		}
	});

	//Para teste manual do localstorage
	//localStorage.setItem('auditorias processadas', '2758457584');

	document.addEventListener('DOMContentLoaded', () => {
		const Auditorias = localStorage.getItem('auditorias processadas');
		if (Auditorias && document.getElementById('IDProcessadas')) {
			document.getElementById('IDProcessadas').textContent = Auditorias;
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		const auditoriasPorCidade = JSON.parse(localStorage.getItem('auditoriasPorCidade')) || {};
		const corpoTabela = document.getElementById('tabelaAuditoriasPorCidade');

		if (corpoTabela) {
			corpoTabela.innerHTML = ''; // limpar conteúdo atual

			for (const cidade in auditoriasPorCidade) {
				const auditorias = auditoriasPorCidade[cidade];
				const custoEstimado = auditorias * 22.5; // valor fictício por auditoria (ajuste como quiser)
				alert("Hello, World!"); 
				const row = document.createElement('tr');
				row.innerHTML = `
		  <td>${cidade}</td>
		  <td class="text-end">${auditorias.toLocaleString('pt-PT')}</td>
		  <td class="text-end">€${custoEstimado.toFixed(2).toLocaleString('pt-PT')}</td> `;
				corpoTabela.appendChild(row);
			}
		}
	});
