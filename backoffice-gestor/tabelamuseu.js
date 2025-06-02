$(document).ready(function () {
 	 $('#tabelaMuseus').DataTable({
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

document.querySelectorAll('.btn-arrow').forEach(button => {
	  button.addEventListener('click', function() {
		const row = button.closest('tr');
		const museu = row.cells[0].textContent;  // Museu
		const data = row.cells[1].textContent;   // Data
		const id = row.getAttribute('data-id');  // ID da ocorrência
		
		const url = `criar-ocorrencia.html?id=${id}&museu=${encodeURIComponent(museu)}&data=${encodeURIComponent(data)}`;
    	console.log("Redirecionando para: ", url);
    
    	// Redirecionar para o formulário
    	window.location.href = url;
  	});
    });

const MUSEUS_KEY = 'museus';
  
	// Função para carregar museus do localStorage
	function carregarMuseus() {
	  const museus = JSON.parse(localStorage.getItem(MUSEUS_KEY)) || [];
	  const tbody = document.querySelector('#tabelaMuseus tbody');
	  tbody.innerHTML = '';
  
	  museus.forEach(museu => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
		  <td>${museu.nome}</td>
		  <td>${museu.localizacao}</td>
		  <td>${museu.tipo}</td>
		  <td>${museu.ano_fundacao}</td>
		  <td><a href="${museu.website}" target="_blank">${museu.website}</a></td>
		  <td><span class="badge ${museu.ativo ? 'bg-success' : 'bg-danger'}">${museu.ativo ? 'Ativo' : 'Inativo'}</span></td>
		`;
		tbody.appendChild(tr);
	  });
	}
  
	// Função para adicionar novo museu
	function adicionarMuseu(event) {
	  event.preventDefault();
  
	  const nome = document.getElementById('nome').value.trim();
	  const localizacao = document.getElementById('localizacao').value;
	  const tipo = document.getElementById('tipo').value.trim();
	  const ano_fundacao = document.getElementById('ano_fundacao').value.trim();
	  const website = document.getElementById('website').value.trim();
  
	  if (!nome || !localizacao || !tipo || !ano_fundacao || !website) return;
  
	  const novoMuseu = {
		nome,
		localizacao,
		tipo,
		ano_fundacao,
		website,
		ativo: false // Adiciona a informação de status inativo
	  };
  
	  const museus = JSON.parse(localStorage.getItem(MUSEUS_KEY)) || [];
	  museus.push(novoMuseu);
	  localStorage.setItem(MUSEUS_KEY, JSON.stringify(museus));
  
	  // Limpa o formulário e fecha o offcanvas
	  document.getElementById('nome').value = '';
	  document.getElementById('localizacao').value = '';
	  document.getElementById('tipo').value = '';
	  document.getElementById('ano_fundacao').value = '';
	  document.getElementById('website').value = '';
	  bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasAddMuseu')).hide();
  
	  // Recarrega os museus
	  carregarMuseus();
	}
  
	// Ao carregar a página
	document.addEventListener('DOMContentLoaded', () => {
	  carregarMuseus();
	  document.querySelector('#offcanvasAddMuseu form').addEventListener('submit', adicionarMuseu);

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
  }