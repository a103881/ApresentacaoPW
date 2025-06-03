// Simulação de ocorrências iniciais (executado só uma vez)
/*if (!localStorage.getItem("ocorrencias")) {
  const ocorrenciasIniciais = [
    { titulo: "Incêndia", local: "Faro", problema: "Danos", descricao: "Houve um incêndio nesta quarta-feira. Durante a tarde cheirava um pouco a diluente.", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Sala fechada", local: "Porto", problema: "Conteúdo", descricao: "Paguei para vir a este museu apenas por...", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Queda de obra", local: "Coimbra", problema: "Danos", descricao: "Um rapaz foi contra esta estátua e derrubou-a esta tarde.", comentarios: "Parecia cara :p", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Ativistas no Museu Interativo de Lisboa", local: "Lisboa", problema: "Danos", descricao: "Os ativistas esta manha atiraram tinta preta para o quadro da sala de reis do Museu de Lisboa", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Epilepsia", local: "Faro", problema: "Acessibilidade", descricao: "Esta sala tem luzes muito fortes para pessoas epiléticas, podia pelo menos ter um aviso à porta da sala.", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" }
  ];
  localStorage.setItem("ocorrencias", JSON.stringify(ocorrenciasIniciais));
}
*/
function contarOcorrencias() {
  const dadosRaw = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};
  const ocorrencias = Array.isArray(dadosRaw) ? dadosRaw : Object.values(dadosRaw);
  const dadosRaw2 = JSON.parse(localStorage.getItem("dadosOcorrencias")) || {};
  const ocorrencias2 = Array.isArray(dadosRaw2) ? dadosRaw2 : Object.values(dadosRaw2);

  // 1. Total de ocorrências
  const total = ocorrencias.length;
  localStorage.setItem("auditorias", total);

  // 2. Ocorrências não pendentes (estado diferente de "Pendente")
  const naoPendentes = ocorrencias.filter(o => String(o.estado || "Por analisar").toLowerCase() !== "por analisar").length;
  localStorage.setItem("auditorias processadas", naoPendentes);

  //3. Ocorrências por cidade
  const auditoriasPorCidade = {};
  ocorrencias2.forEach(ocorrencia => {
    const distrito = ocorrencia.cidade;
    console.log(distrito);
    if (distrito) {
      auditoriasPorCidade[distrito] = (auditoriasPorCidade[distrito] || 0) + 1;
    }
  });
  localStorage.setItem("auditoriasPorCidade", JSON.stringify(auditoriasPorCidade));

  // 4. Auditorias aceites por cidade
const auditoriasAceitesPorCidade = {};

for (let i = 0; i < ocorrencias.length; i++) {
  const estado = (ocorrencias[i].estado || "").toLowerCase();
  const cidade = ocorrencias2[i]?.cidade;

  if (estado === "aceite" && cidade) {
    auditoriasAceitesPorCidade[cidade] = (auditoriasAceitesPorCidade[cidade] || 0) + 1;
  }
}

localStorage.setItem("auditoriasAceitesPorCidade", JSON.stringify(auditoriasAceitesPorCidade));

    // 5. Número de peritos diferentes (únicos) atribuídos
    const nomesPeritos = new Set();

    ocorrencias.forEach(ocorrencia => {
      const perito = ocorrencia.perito;
      if (perito && perito !== "--" && perito !== "Pendente") {
        nomesPeritos.add(perito);
      }
    });
  
    localStorage.setItem("peritosAtivos", nomesPeritos.size);  
};

// Renderiza a tabela
function renderTabela() {
  const dadosOcorrencias = JSON.parse(localStorage.getItem("dadosOcorrencias")) || {};
  const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};

  console.log(dadosOcorrencias);

  const corpoTabela = document.querySelector("#tabelaOcorrencias tbody");
  //if (!corpoTabela) return;

  corpoTabela.innerHTML = "";

  Object.keys(dadosOcorrencias).forEach((id, index) => {
    const ocorrencia = dadosOcorrencias[id];
    const tabela = dadosTabela[id] || {};

    corpoTabela.innerHTML += `
      <tr>
        <td>${ocorrencia.local || ""}</td>
        <td>${ocorrencia.cidade || ""}</td>
        <td>${ocorrencia.titulo || ""}</td>
        <td>${ocorrencia.tipo || ""}</td>
        <td>${ocorrencia.descricao || ""}</td>
        <td>${ocorrencia.comentarios || ""}</td>
        <td>${ocorrencia.anexo ? '📎' : '—'}</td>
        <td>${tabela.estado || "Pendente"}</td>
        <td>${tabela.perito || "Pendente"}</td>
        <td>
          <button class="btn btn-sm btn-eyes editar-ocorrencia" id="botaoRever" data-index="${index}" data-id="${id}" data-bs-toggle="offcanvas" data-bs-target="#reverOcorrencia">
            Rever
          </button>
        </td>
      </tr>
    `;
  });

  //contar ocorrências e guardar no localstorage
  contarOcorrencias();
}

// Carregar peritos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  // Inicialização
  renderTabela();

  const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
  const selectPerito = document.getElementById('atribuirPerito');

  // Evita adicionar opções duplicadas
  selectPerito.innerHTML = '<option value="">Selecione um perito</option>';

  peritos.forEach(p => {
    const option = document.createElement('option');
    option.value = p.nome;
    option.textContent = p.nome;
    selectPerito.appendChild(option);
  });

  // Dados do utilizador
  const userData = JSON.parse(localStorage.getItem('googleUser'));
  if (!userData) return;

  const foto = document.getElementById('userFoto');
  const fotoBig = document.getElementById('userFotoBig');
  const nome = document.getElementById('userNome');
  const nomeBig = document.getElementById('userNomeBig');
  const email = document.getElementById('userEmail');

  if (foto) foto.src = userData.foto;
  if (fotoBig) fotoBig.src = userData.foto;
  if (nome) nome.textContent = userData.nome;
  if (nomeBig) nomeBig.textContent = userData.nome;
  if (email) email.textContent = userData.email;
});

// Ao clicar em rever
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("editar-ocorrencia")) {
    const id = e.target.getAttribute("data-id");

    const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};
    const tabela = dadosTabela[id] || {};

    document.getElementById("estadoOcorrencia").value = tabela.estado || "";
    document.getElementById("atribuirPerito").value = tabela.perito || "";
    document.getElementById("formReverOcorrencia").setAttribute("data-id", id);
  }
});


// Salvar alterações
document.getElementById("formReverOcorrencia").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = this.getAttribute("data-id");
  const estado = document.getElementById("estadoOcorrencia").value;
  const peritoSelecionado = document.getElementById("atribuirPerito").value;

  const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};

  dadosTabela[id] = {
    ...dadosTabela[id],
    estado: estado,
    perito: estado === "Aceite" ? peritoSelecionado : (estado === "Recusada" ? "--" : "Pendente")
  };

  localStorage.setItem("dadosTabelaOcorrencias", JSON.stringify(dadosTabela));
  renderTabela();

  const offcanvasElement = document.getElementById("reverOcorrencia");
  const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
  offcanvasInstance.hide();
});

function logoutGoogle() {
    localStorage.removeItem('googleUser');
    window.location.href = 'login.html';
  }

