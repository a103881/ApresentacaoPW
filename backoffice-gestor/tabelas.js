$(document).ready(function () {
      $('#tabelaConcluidos').DataTable({
        language: {
          decimal: ',',
          emptyTable: 'Sem dados disponíveis na tabela',
          info: 'A mostrar _START_ a _END_ de _TOTAL_ entradas',
          infoEmpty: 'A mostrar 0 a 0 de 0 entradas',
          infoFiltered: '(filtrado de _MAX_ entradas totais)',
          lengthMenu: 'Mostrar _MENU_ entradas',
          loadingRecords: 'A carregar...',
          processing: 'A processar...',
          search: 'Procurar:',
          zeroRecords: 'Não foram encontrados resultados',
          paginate: {
            first: 'Primeiro',
            last: 'Último',
            next: 'Seguinte',
            previous: 'Anterior',
          },
          aria: {
            sortAscending: ': ativar para ordenar a coluna em ordem crescente',
            sortDescending: ': ativar para ordenar a coluna em ordem decrescente',
          },
        },
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
    const museus = JSON.parse(localStorage.getItem('museus')) || [];
    const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
    console.log('[DEBUG] museus:', museus);
    console.log('[DEBUG] ocorrencias:', ocorrencias);

    const contagem = ocorrencias.reduce((acc, o) => {
      if (o.estado === 'Concluída') {
        acc[o.museu] = (acc[o.museu] || 0) + 1;
      }
      return acc;
    }, {});

    console.log('[DEBUG] contagem por museu:', contagem);

    const tbody = document.querySelector('#tabelaConcluidos tbody');
    tbody.innerHTML = '';

    museus.forEach(m => {
      const c = contagem[m.nome] || 0;
      if (c > 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${m.nome}</td>
          <td>${m.localizacao}</td>
          <td>${c}</td>
        `;
        tbody.appendChild(tr);
      }
    });
  });

  //Profile

  document.addEventListener('DOMContentLoaded', () => {
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

  function logoutGoogle() {
    localStorage.removeItem('googleUser');
    window.location.href = 'login.html';
  }