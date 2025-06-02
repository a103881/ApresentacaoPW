// // Floating Window Fale Connosco
// document.querySelector('.btn-fale-connosco').addEventListener('click', function (e) {
//   e.preventDefault();
//   const existingWindow = document.querySelector('.floating-window');
//   if (existingWindow) {
//     existingWindow.remove();
//     return;
//   }
//   const template = document.getElementById('floating-template');
//   const clone = template.content.cloneNode(true);
//   clone.querySelector('.close-btn').addEventListener('click', function () {
//     this.closest('.floating-window').remove();
//   });
//   document.body.appendChild(clone);
// });

// Criar Ocorrência
// =================== GOOGLE MAPS =================== //
window.addEventListener("load", function () {
  const mapDiv = document.getElementById("map");

  if (mapDiv) {
    const map = new google.maps.Map(mapDiv, {
      center: { lat: 41.15, lng: -8.61 },
      zoom: 8
    });
  } else {
    console.error("Elemento com ID 'map' não encontrado.");
  }
});
 
function initMap() {
  const mapDiv = document.getElementById("map");

  if (mapDiv) {
    const map = new google.maps.Map(mapDiv, {
      center: { lat: 41.15, lng: -8.61 },
      zoom: 8
    });
  } else {
    console.error("Elemento com ID 'map' não encontrado.");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const abrirModalBtn = document.getElementById('abrirModal');
  const modal = document.getElementById('modalOcorrencia');
  const fecharModalBtn = document.getElementById('fecharModal');

  if (abrirModalBtn && modal && fecharModalBtn) {
    abrirModalBtn.addEventListener('click', function (e) {
      e.preventDefault(); // evita comportamento padrão do link
      modal.style.display = 'block';
    });

    fecharModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    // Clica fora do modal fecha-o
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});


// =================== FUNÇÕES AUXILIARES =================== //
// Fecha o modal de registo de ocorrência
function fecharModal() {
  const modal = document.getElementById("modalOcorrencia");
  if (modal) {
    modal.style.display = "none";
  }
}
document.querySelectorAll('.portfolio-filters li').forEach(li => {
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => {
    const href = li.getAttribute('data-href');
    if (href && href !== window.location.pathname.split('/').pop()) {
      window.location.href = href;
    } else if (href === window.location.pathname.split('/').pop()) {
      // Se clicar na página atual, força reload para atualizar UI
      window.location.reload();
    }
  });
});

// Obtém o valor do selecionado por nome
function getCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value);
}

function getRadioValue(name) {
  const radio = document.querySelector(`input[name="${name}"]:checked`);
  return radio ? radio.value : null;
}
        document.getElementById('ficheiro').addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = function(e) {
            const base64Image = e.target.result;

            // Guardar no localStorage
            localStorage.setItem('fotoOcorrencia', base64Image);
            console.log('Imagem guardada no localStorage!');
          };
          reader.readAsDataURL(file);
        });


    document.getElementById('abrirModal').addEventListener('click', function() {
      alert('clicado');
    });


// =================== Mostrar Ocorrências =================== //
function mostrarOcorrencias() {
  const container = document.getElementById('ocorrencias-container');
  const dadosIniciais = JSON.parse(localStorage.getItem("dadosOcorrencias")) || {};
  const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};
  const userId = localStorage.getItem('googleUserId');


  container.innerHTML = ''; // Limpa conteúdo anterior

  if (!userId) {
    // Caso não haja userId, limpa a lista e termina
    return;
  }

  // Ordenar IDs para mostrar na ordem crescente
  const ids = Object.keys(dadosIniciais)
    .filter(id => dadosIniciais[id].googleUserId === userId)
    .sort((a, b) => Number(a) - Number(b));

  ids.forEach(id => {
    const ocorrencia = dadosIniciais[id];
    const tabela = dadosTabela[id] || {};

    const div = document.createElement('div');
    div.classList.add('ocorrencia');

    const titulo = document.createElement('h3');
    titulo.textContent = ocorrencia.titulo;
    titulo.classList.add('titulo');
    div.appendChild(titulo);


    const wrapper = document.createElement('div');
    wrapper.classList.add('meta-wrap');

    const local = document.createElement('h2');
    local.textContent = ocorrencia.morada || "";
    wrapper.appendChild(local);
    div.appendChild(wrapper);

    const cidade = document.createElement('h2');
    cidade.textContent = ocorrencia.cidade || "Cidade não espeficida";
    wrapper.appendChild(cidade);
    div.appendChild(wrapper);

    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhes');

    const itemData = document.createElement('div');
    itemData.classList.add('item');
    itemData.innerHTML = `<i class="fa-regular fa-calendar"></i> ${tabela.data || ""}`;
    detalhes.appendChild(itemData);

    const itemTipo = document.createElement('div');
    itemTipo.classList.add('item');
    itemTipo.innerHTML = `<i class="fa-regular fa-folder"></i> ${ocorrencia.tipo || ""}`;
    detalhes.appendChild(itemTipo);

    const itemEstado = document.createElement('div');
    itemEstado.classList.add('item');
    itemEstado.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${tabela.estado || ""}`;
    detalhes.appendChild(itemEstado);

    div.appendChild(detalhes);

    const descricao = document.createElement('p');
    descricao.textContent = `Descrição: ${ocorrencia.descricao || ""}`;
    descricao.classList.add('mb-4');
    div.appendChild(descricao);

    if (ocorrencia.anexo) {
      const img = document.createElement('img');
      img.style.maxWidth = '100%';
      img.style.marginTop = '10px';
      img.alt = 'Foto da ocorrência';
      img.src = ocorrencia.anexo.startsWith('data:image') ? ocorrencia.anexo : 'data:image/jpeg;base64,' + ocorrencia.anexo;
      div.appendChild(img);
    }

    const btnVerMais = document.createElement('p');
    btnVerMais.innerHTML = `<a href="detalhes.html?id=${id}" class="btn-custom">Ver Mais</a>`;
    div.appendChild(btnVerMais);

    container.appendChild(div);
  });
}

// =================== EVENTO DE SUBMISSÃO =================== //
document.addEventListener("DOMContentLoaded", function () {
  mostrarOcorrencias();

  const botaoSubmeter = document.querySelector(".botao-submeter");
  if (!botaoSubmeter) {
    console.warn("Botão .botao-submeter não encontrado no DOM.");
    return;
  }

  botaoSubmeter.addEventListener("click", function (e) {
    e.preventDefault();

    const local = getRadioValue("local");
    const cidade = getRadioValue("cidade");
    const tipoProblema = getCheckboxValues("tipo_problema");
    const titulo = document.getElementById("titulo_ocorrencia").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const comentarios = document.getElementById("comentarios").value.trim();
    const consentimentoBox = document.querySelector('input[name="consentimento"]');
    const ficheiroInput = document.getElementById('ficheiro');

    if (!local || !cidade || !tipoProblema.length || !titulo || !descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!consentimentoBox || !consentimentoBox.checked) {
      alert("Por favor, aceite o consentimento de dados.");
      return;
    }

    const ficheiro = ficheiroInput.files[0];
    const userId = localStorage.getItem('googleUserId');
    if (!userId) {
      alert("Utilizador não autenticado.");
      return;
    }

    const dadosIniciais = JSON.parse(localStorage.getItem("dadosOcorrencias")) || {};
    const dadosTabela = JSON.parse(localStorage.getItem("dadosTabelaOcorrencias")) || {};

    // Gera ID incremental
    const novoId = (Math.max(0, ...Object.keys(dadosIniciais).map(Number)) + 1).toString();

    function guardarOcorrencia(base64Anexo) {
      dadosIniciais[novoId] = {
        googleUserId: userId,
        titulo,
        cidade,
        tipo: Array.isArray(tipoProblema) ? tipoProblema.join(', ') : tipoProblema,
        morada: local,
        descricao,
        relatorio: "",
        comentarios,
        anexo: base64Anexo || ""
      };

      dadosTabela[novoId] = {
        museu: local,
        data: new Date().toLocaleDateString('pt-PT'),
        estado: "Por analisar"
      };

      try {
        localStorage.setItem("dadosOcorrencias", JSON.stringify(dadosIniciais));
        localStorage.setItem("dadosTabelaOcorrencias", JSON.stringify(dadosTabela));
        alert("Ocorrência guardada com sucesso!");
        fecharModal();
        const form = document.getElementById("formOcorrencia");
        if (form) form.reset();
        mostrarOcorrencias();
      } catch (e) {
        console.error("Erro ao guardar no localStorage:", e);
        alert("Erro ao guardar a ocorrência.");
      }
    }

    if (ficheiro) {
      const maxSizeMB = 3;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (ficheiro.size > maxSizeBytes) {
        alert(`O ficheiro é demasiado grande. Máximo permitido: ${maxSizeMB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        guardarOcorrencia(event.target.result);
      };
      reader.readAsDataURL(ficheiro);
    } else {
      guardarOcorrencia("");
    }
  });
});
