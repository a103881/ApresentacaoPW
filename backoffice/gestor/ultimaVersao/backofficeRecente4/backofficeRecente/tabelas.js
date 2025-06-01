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