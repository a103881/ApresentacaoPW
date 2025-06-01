// Simulação de ocorrências iniciais (executado só uma vez)
if (!localStorage.getItem("ocorrencias")) {
  const ocorrenciasIniciais = [
    { titulo: "Incêndia", local: "Faro", problema: "Danos", descricao: "Houve um incêndio nesta quarta-feira. Durante a tarde cheirava um pouco a diluente.", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Sala fechada", local: "Porto", problema: "Conteúdo", descricao: "Paguei para vir a este museu apenas por...", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Queda de obra", local: "Coimbra", problema: "Danos", descricao: "Um rapaz foi contra esta estátua e derrubou-a esta tarde.", comentarios: "Parecia cara :p", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Ativistas no Museu Interativo de Lisboa", local: "Lisboa", problema: "Danos", descricao: "Os ativistas esta manha atiraram tinta preta para o quadro da sala de reis do Museu de Lisboa", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" },
    { titulo: "Epilepsia", local: "Faro", problema: "Acessibilidade", descricao: "Esta sala tem luzes muito fortes para pessoas epiléticas, podia pelo menos ter um aviso à porta da sala.", comentarios: "", ficheiro: "data:image/png;base64,iVBORw0KgoA.jpg" }
  ];
  localStorage.setItem("ocorrencias", JSON.stringify(ocorrenciasIniciais));
}

function contarOcorrencias() {
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];

  // 1. Total de ocorrências
  const total = ocorrencias.length;
  localStorage.setItem("auditorias", total);

  // 2. Ocorrências não pendentes (estado diferente de "Por Rever")
  const naoPendentes = ocorrencias.filter(o => (o.estado || "Pendente").toLowerCase() !== "pendente").length;
  localStorage.setItem("auditorias processadas", naoPendentes);

  //3. Ocorrências por cidade
  const ocorrenciasCidade = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  const auditoriasPorCidade = {};

  ocorrenciasCidade.forEach(ocorrencia => {
    const cidade = ocorrencia.local;
    if (cidade) {
      auditoriasPorCidade[cidade] = (auditoriasPorCidade[cidade] || 0) + 1;
    }
  });
  localStorage.setItem("auditoriasPorCidade", JSON.stringify(auditoriasPorCidade));

  // 4. Auditorias aceites por cidade
  const ocorrenciasAceitesPorCidade = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  const auditoriasAceitesPorCidade = {};

  ocorrenciasAceitesPorCidade.forEach(ocorrencia => {
    const cidade = ocorrencia.local;
    const estado = (ocorrencia.estado || "");
    if (estado === "Aceite") {
      auditoriasAceitesPorCidade[cidade] = (auditoriasAceitesPorCidade[cidade] || 0) + 1;
    }
  });
  localStorage.setItem("auditoriasAceitesPorCidade", JSON.stringify(auditoriasAceitesPorCidade));

    // 5. Número de peritos diferentes (únicos) atribuídos
    const nomesPeritos = new Set();

    ocorrencias.forEach(ocorrencia => {
      const perito = ocorrencia.perito;
      if (perito && perito !== "Pendente") {
        nomesPeritos.add(perito);
      }
    });
  
    localStorage.setItem("peritosAtivos", nomesPeritos.size);  
};

// Renderiza a tabela
function renderTabela() {
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  const corpoTabela = document.querySelector("#tabelaOcorrencias tbody");
  corpoTabela.innerHTML = "";

  ocorrencias.forEach((ocorrencia, index) => {
    corpoTabela.innerHTML += `
      <tr>
        <td>${ocorrencia.titulo}</td>
        <td>${ocorrencia.local}</td>
        <td>${ocorrencia.problema}</td>
        <td>${ocorrencia.descricao}</td>
        <td>${ocorrencia.comentarios}</td>
        <td>${ocorrencia.ficheiro}</td>
        <td>${ocorrencia.estado || "Pendente"}</td>
        <td>${ocorrencia.perito || "Pendente"}</td>
        <td>
          <button class="btn btn-sm btn-eyes editar-material" data-index="${index}" data-bs-toggle="offcanvas" data-bs-target="#reverOcorrencia">
            Rever
          </button>
        </td>
      </tr>
    `;
  });

  //contar ocorrências e guardar no localstorage
  contarOcorrencias();
}

// Ao clicar em Rever
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("editar-material")) {
    const index = e.target.getAttribute("data-index");
    const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
    const ocorrencia = ocorrencias[index];

    document.getElementById("estadoOcorrencia").value = ocorrencia.estado || "";
    document.getElementById("atribuirPerito").value = ocorrencia.perito || "";
    document.getElementById("formReverOcorrencia").setAttribute("data-index", index);
  }
})
const peritos = JSON.parse(localStorage.getItem('peritos')) || [];
const selectPerito = document.getElementById('atribuirPerito');
peritos.forEach(p => {
  const option = document.createElement('option');
  option.value = p.nome;
  option.textContent = p.nome;
  selectPerito.appendChild(option);
});
;

// Salvar alterações
document.getElementById("formReverOcorrencia").addEventListener("submit", function (e) {
  e.preventDefault();

  const index = this.getAttribute("data-index");
  const estado = document.getElementById("estadoOcorrencia").value;
  const perito = document.getElementById("atribuirPerito").value;

  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
  ocorrencias[index].estado = estado;
  ocorrencias[index].perito = estado === "Aceite" ? perito : peritos;

  localStorage.setItem("ocorrencias", JSON.stringify(ocorrencias));
  renderTabela();

  // Fechar offcanvas
  const offcanvasElement = document.getElementById("reverOcorrencia");
  const offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
  offcanvasInstance.hide();
});

// Inicialização
renderTabela();

