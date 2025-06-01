// criar-ocorrencia.js (com estrutura antiga literal + atualizações)

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

window.addEventListener('DOMContentLoaded', () => {
  const nome = localStorage.getItem('museuNome');
  const origem = localStorage.getItem('museuOrigem');
  const tipo = localStorage.getItem('museuTipo');
  const ficheiros = JSON.parse(localStorage.getItem('ficheirosAnexados')) || [];

  document.getElementById('nome').value = nome;
  document.getElementById('localizacao').value = origem;
  document.getElementById('tipo').value = tipo;

  const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
  const selectPerito = document.getElementById('perito');
  peritos.forEach(p => {
    const option = document.createElement('option');
    option.value = p.nome;
    option.textContent = p.nome;
    selectPerito.appendChild(option);
  });

  const materiais = JSON.parse(localStorage.getItem('materiais')) || [];
  const selectMaterial = document.getElementById('materialOcorrencia');
  selectMaterial.innerHTML = '<option value="">Selecione o material</option>';
  materiais.forEach(m => {
    const option = document.createElement('option');
    option.value = m.nome;
    option.textContent = m.nome;
    selectMaterial.appendChild(option);
  });
});

function criarOcorrencia(estado) {
  const materiaisSelecionados = Array.from(document.getElementById('materialOcorrencia').selectedOptions).map(o => o.value);
  const ocorrencia = {
    museu: localStorage.getItem('museuNome'),
    localizacao: localStorage.getItem('museuOrigem'),
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    perito: document.getElementById('perito').value,
    materiais: materiaisSelecionados,
    ficheiros: JSON.parse(localStorage.getItem('ficheirosAnexados')) || [],
    estado: estado,
    data: new Date().toISOString()
  };

  const ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || [];
  ocorrencias.push(ocorrencia);
  localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));

  // Redirecionar para tabela-museu.html com mensagem
  localStorage.setItem('mensagemTabelaMuseu', `Ocorrência ${estado.toLowerCase()}`);
  window.location.href = 'tabela-museu.html';
}

document.getElementById('btnAceitar').addEventListener('click', () => criarOcorrencia('Aceite'));
document.getElementById('btnRecusar').addEventListener('click', () => criarOcorrencia('Recusada'));


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