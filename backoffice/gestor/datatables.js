$(document).ready(function () {
 	 $('#ocorrencias').DataTable({
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

function verOcorrencia(id) {
	localStorage.setItem("ocorrenciaSelecionada", id);
	window.location.href = "forms-OpR.html";
}


// Porfile

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