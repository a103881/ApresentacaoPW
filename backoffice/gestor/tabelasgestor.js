$(document).ready(function () {
			$('#peritos').DataTable({
				language: {
					decimal: ",",
					emptyTable: "Sem dados disponíveis na tabela",
					info: "A mostrar _START_ a _END_ de _TOTAL_ entradas",
					infoEmpty: "A mostrar 0 a 0 de 0 entradas",
					infoFiltered: "(filtrado de _MAX_ entradas totais)",
					lengthMenu: "Mostrar _MENU_ entradas",
					loadingRecords: "A carregar...",
					processing: "A processar...",
					search: "Procurar:",
					zeroRecords: "Não foram encontrados resultados",
					paginate: {
						first: "Primeiro",
						last: "Último",
						next: "Seguinte",
						previous: "Anterior"
					},
					aria: {
						sortAscending: ": ativar para ordenar a coluna em ordem crescente",
						sortDescending: ": ativar para ordenar a coluna em ordem decrescente"
					}
				},
				pageLength: 5
			});
		});

$(document).ready(function () {
			$('#materiais').DataTable({
				language: {
					decimal: ",",
					emptyTable: "Sem dados disponíveis na tabela",
					info: "A mostrar _START_ a _END_ de _TOTAL_ entradas",
					infoEmpty: "A mostrar 0 a 0 de 0 entradas",
					infoFiltered: "(filtrado de _MAX_ entradas totais)",
					lengthMenu: "Mostrar _MENU_ entradas",
					loadingRecords: "A carregar...",
					processing: "A processar...",
					search: "Procurar:",
					zeroRecords: "Não foram encontrados resultados",
					paginate: {
						first: "Primeiro",
						last: "Último",
						next: "Seguinte",
						previous: "Anterior"
					},
					aria: {
						sortAscending: ": ativar para ordenar a coluna em ordem crescente",
						sortDescending: ": ativar para ordenar a coluna em ordem decrescente"
					}
				},
				pageLength: 5
			});
		});

document.addEventListener('DOMContentLoaded', () => {
			// -------- MATERIAIS --------
			const formAdicionar = document.getElementById('formAdicionarMaterial');
			const formEditar = document.getElementById('formEditarMaterial');
			const tableBody = document.querySelector('#materiais tbody');
			let materialEmEdicao = null;

			function inicializarMateriais() {
				if (!localStorage.getItem('materiais')) {
					const rows = tableBody.querySelectorAll('tr');
					const materiais = [];

					rows.forEach(row => {
						const cols = row.querySelectorAll('td');
						if (cols.length >= 5) {
							const nome = cols[0].textContent.trim();
							const localizacao = cols[1].textContent.trim();
							const referencia = cols[2].textContent.trim();
							const quantidade = cols[3].textContent.trim();
							const estado = cols[4].textContent.includes("Inativo") ? "inativo" : "ativo";
							materiais.push({ nome, localizacao, referencia, quantidade, estado });
						}
					});

					localStorage.setItem('materiais', JSON.stringify(materiais));
				}
			}

			function preencherMateriaisOcorrencia() {
				const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
				const select = document.getElementById('materiaisSelect');

				select.innerHTML = '<option value="">Selecione um material</option>';

				materiais.forEach((material, index) => {
					const option = document.createElement('option');
					option.value = index;
					option.textContent = `${material.nome} - ${material.tipo}`;
					select.appendChild(option);
				});
			}

			function renderizarMateriais() {
				const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
				const tabela = document.querySelector('#materiais tbody');
				tabela.innerHTML = '';

				materiais.forEach((material, index) => {
					const linha = document.createElement('tr');
					linha.innerHTML = `
            <td>${material.nome}</td>
            <td>${material.localizacao}</td>
            <td>${material.referencia}</td>
            <td>${material.quantidade}</td>
            <td>${material.estado}</td>
            <td>
                <button class="btn btn-sm btn-eyes editar-material" data-id="${index}" data-bs-toggle="offcanvas" data-bs-target="#editarMaterial">Editar</button>
            </td>
        `;
					tableBody.appendChild(linha);
				});

				// Certifique-se de que essa função está definida ANTES dessa linha
				preencherMateriaisOcorrencia();
			}

			function carregarMaterialParaEdicao(index) {
				const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
				const material = materiais[index];
				if (!material) return;

				document.getElementById('estadoMaterialEditar').value = material.estado;
				document.getElementById('quantidadeEditar').value = material.quantidade;
				materialEmEdicao = index;
			}

			tableBody.addEventListener('click', function (e) {
				if (e.target.classList.contains('editar-material')) {
					const index = e.target.getAttribute('data-id');
					carregarMaterialParaEdicao(index);
				}
			});

			formAdicionar.addEventListener('submit', function (e) {
				e.preventDefault();
				const nome = document.getElementById('nomeMaterial').value;
				const localizacao = document.getElementById('localizacao').value;
				const referencia = document.getElementById('referencia').value;
				const quantidade = document.getElementById('quantidade').value;

				const novoMaterial = { nome, localizacao, referencia, quantidade, estado: "ativo" };
				const materiais = JSON.parse(localStorage.getItem('materiais')) || [];

				materiais.push(novoMaterial);
				localStorage.setItem('materiais', JSON.stringify(materiais));

				formAdicionar.reset();
				renderizarMateriais();

				const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('adicionarMaterial'));
				if (offcanvas) offcanvas.hide();
			});

			formEditar.addEventListener('submit', function (e) {
				e.preventDefault();
				if (materialEmEdicao === null) return;

				const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
				materiais[materialEmEdicao].estado = document.getElementById('estadoMaterialEditar').value;
				materiais[materialEmEdicao].quantidade = document.getElementById('quantidadeEditar').value;

				localStorage.setItem('materiais', JSON.stringify(materiais));
				materialEmEdicao = null;
				renderizarMateriais();

				const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('editarMaterial'));
				if (offcanvas) offcanvas.hide();
			});
		


			inicializarMateriais();
			renderizarMateriais();

		});

		document.addEventListener('DOMContentLoaded', () => {
    const formPerito = document.getElementById('formAdicionarPerito');
    const tabelaPeritos = document.querySelector('#peritos tbody');
    let peritoEmEdicao = null;

    function soData(dateStr) {
        const [ano, mes, dia] = dateStr.split('-');
        return new Date(ano, mes - 1, dia);
    }

    function renderizarPeritos() {
        tabelaPeritos.innerHTML = '';

        const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        peritos.forEach((p, i) => {
            const dataLimite = soData(p.dataLimite);
            p.estado = dataLimite < hoje ? 'inativo' : 'ativo';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.morada}</td>
                <td>${p.dataNascimento}</td>
                <td>${p.area}</td>
                <td>${p.email}</td>
                <td>${p.telemovel}</td>
                <td><button class="btn btn-sm btn-eyes editar-perito" data-id="${i}" data-bs-toggle="offcanvas" data-bs-target="#editarPerito">Editar</button></td>
                <td>${p.dataLimite}</td>
                <td><span class="badge ${p.estado === 'ativo' ? 'bg-success' : 'bg-danger'}">${p.estado === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
            `;
            tabelaPeritos.appendChild(row);
        });

		localStorage.setItem('profissionais', peritos.length);
        localStorage.setItem('peritos', JSON.stringify(peritos));
    }

    document.querySelector('#peritos tbody').addEventListener('click', function (e) {
        if (e.target.classList.contains('editar-perito')) {
            const id = e.target.getAttribute('data-id');
            const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
            const p = peritos[id];

            peritoEmEdicao = id;

            // Preencher os campos de edição
            document.getElementById('nomePeritoEditar').value = p.nome;
            document.getElementById('moradaPeritoEditar').value = p.morada;
            document.getElementById('dataNascimentoPeritoEditar').value = p.dataNascimento;
            document.getElementById('areaPeritoEditar').value = p.area;
            document.getElementById('emailPeritoEditar').value = p.email;
            document.getElementById('telemovelPeritoEditar').value = p.telemovel;
            document.getElementById('dataLimiteEditar').value = p.dataLimite;
        }
    });

    document.getElementById('formEditarPerito').addEventListener('submit', function (e) {
        e.preventDefault();
        if (peritoEmEdicao === null) return;

        const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
        const p = peritos[peritoEmEdicao];

        p.nome = document.getElementById('nomePeritoEditar').value;
        p.morada = document.getElementById('moradaPeritoEditar').value;
        p.dataNascimento = document.getElementById('dataNascimentoPeritoEditar').value;
        p.area = document.getElementById('areaPeritoEditar').value;
        p.email = document.getElementById('emailPeritoEditar').value;
        p.telemovel = document.getElementById('telemovelPeritoEditar').value;
        p.dataLimite = document.getElementById('dataLimiteEditar').value;

        const hoje = new Date();
        const dataLimite = new Date(p.dataLimite);
        p.estado = dataLimite < hoje ? 'inativo' : 'ativo';

        localStorage.setItem('peritos', JSON.stringify(peritos));
        renderizarPeritos();

        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('editarPerito'));
        if (offcanvas) offcanvas.hide();
    });

    formPerito.addEventListener('submit', function (e) {
        e.preventDefault();

        const novoPerito = {
            nome: document.getElementById('nomePerito').value,
            morada: document.getElementById('moradaPerito').value,
            dataNascimento: document.getElementById('dataNascimentoPerito').value,
            area: document.getElementById('areaPerito').value,
            email: document.getElementById('emailPerito').value,
            telemovel: document.getElementById('telemovelPerito').value,
            dataLimite: document.getElementById('dataPerito').value,
            estado: 'ativo'
        };

        const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
        peritos.push(novoPerito);

        localStorage.setItem('peritos', JSON.stringify(peritos));
        formPerito.reset();
        renderizarPeritos();

        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('adicionarPerito'));
        if (offcanvas) offcanvas.hide();
    });

    renderizarPeritos();
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