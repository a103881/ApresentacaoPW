
 function mostrarOcorrencias() {
  const container = document.getElementById('ocorrencias-container');

  if (!googleUserId) {
    container.innerHTML = '<p style="text-align:center;">Utilizador não autenticado.</p>';
    return;
  }

  const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};
  const dadosIniciais = JSON.parse(localStorage.getItem("dadosOcorrencias")) || {};

  container.innerHTML = '';

  const entradas = Object.entries(dadosIniciais).filter(([id, ocorrencia]) => {
    const dadosTabelaItem = dadosTabela[id];

    return (
      dadosTabelaItem &&
      dadosTabelaItem.estado === "Concluido"
    );
  });

  if (entradas.length === 0) {
    container.innerHTML = '<p style="text-align:center;">Sem ocorrências por analisar registadas por este utilizador.</p>';
    return;
  }

  entradas.forEach(([id, ocorrencia]) => {
    const dados = dadosTabela[id];

    const div = document.createElement('div');
    div.classList.add('ocorrencia');

    const titulo = document.createElement('h3');
    titulo.textContent = ocorrencia.titulo || 'Sem título';
    titulo.classList.add('titulo');
    div.appendChild(titulo);

    const wrapper = document.createElement('div');
    wrapper.classList.add('meta-wrap');

    const local = document.createElement('h2');
    local.textContent = ocorrencia.morada || dados.museu || 'Local não especificado';
    wrapper.appendChild(local);
    div.appendChild(wrapper);

    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhes');

    const itemData = document.createElement('div');
    itemData.classList.add('item');
    itemData.innerHTML = `<i class="fa-regular fa-calendar"></i> ${dados.data || 'Data desconhecida'}`;
    detalhes.appendChild(itemData);

    const itemTipo = document.createElement('div');
    itemTipo.classList.add('item');
    itemTipo.innerHTML = `<i class="fa-regular fa-folder"></i> ${ocorrencia.tipo || 'Tipo não especificado'}`;
    detalhes.appendChild(itemTipo);

    div.appendChild(detalhes);

    const descricao = document.createElement('p');
    descricao.textContent = ocorrencia.descricao || 'Sem descrição';
    descricao.classList.add('mb-4');
    div.appendChild(descricao);

    if (ocorrencia.anexo) {
      const img = document.createElement('img');
      img.style.maxWidth = '100%';
      img.style.marginTop = '10px';
      img.alt = 'Anexo da ocorrência';
      img.src = ocorrencia.anexo.startsWith('data:image')
        ? ocorrencia.anexo
        : 'data:image/jpeg;base64,' + ocorrencia.anexo;
      div.appendChild(img);
    }

    const btnVerMais = document.createElement('p');
    btnVerMais.innerHTML = `<a href="detalhes.html?id=${id}" class="btn-custom">Ver Mais</a>`;
    div.appendChild(btnVerMais);

    container.appendChild(div);
  });

}