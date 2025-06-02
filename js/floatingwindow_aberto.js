document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalOcorrencia');
  const fecharModalBtn = document.getElementById('fecharModal');
  const abrirModalBtns = document.querySelectorAll('.btn-criar-ocorrencia');
  const form = document.getElementById('formOcorrencia');

  function fecharModal() {
    if (modal) modal.style.display = "none";
  }

  function getCheckboxValues(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
  }

  function getRadioValue(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : null;
  }

  abrirModalBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (modal) modal.style.display = 'block';
    });
  });

  fecharModalBtn?.addEventListener('click', fecharModal);
  window.addEventListener('click', function (e) {
    if (e.target === modal) fecharModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && modal?.style.display === 'block') {
      fecharModal();
    }
  });

  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    const local = getRadioValue("local");
    const cidade = getRadioValue("cidade");
    const tipoProblema = getCheckboxValues("tipo_problema");
    const titulo = document.getElementById("titulo_ocorrencia").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const comentarios = document.getElementById("comentarios").value.trim();
    const consentimentoBox = document.querySelector('input[name="consentimento"]');
    const fotoInput = document.getElementById('foto');
    const file = fotoInput?.files[0];

    if (!local || !cidade || !tipoProblema.length || !titulo || !descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!consentimentoBox?.checked) {
      alert("Por favor, aceite o consentimento de dados.");
      return;
    }

    function salvarOcorrencia(fotoBase64) {
      const userId = localStorage.getItem('googleUserId');
      if (!userId) {
        alert("Utilizador não autenticado.");
        return;
      }

      const dadosIniciais = JSON.parse(localStorage.getItem("dadosIniciais")) || {};
      const dadosTabela = JSON.parse(localStorage.getItem("dadosTabela")) || {};

      // Gerar novo ID incremental
      const novoId = (Math.max(0, ...Object.keys(dadosIniciais).map(Number)) + 1).toString();

      // Guardar parte da ocorrência principal
      dadosIniciais[novoId] = {
        titulo,
        cidade,
        tipo: Array.isArray(tipoProblema) ? tipoProblema.join(', ') : tipoProblema,
        morada: local,
        descricao,
        relatorio: "",
        comentarios,
        materiais: "", // pode ser atualizado mais tarde
        anexo: fotoBase64 || "",
        idUtilizador: userId
      };

      // Guardar parte da tabela
      dadosTabela[novoId] = {
        museu: local,
        data: new Date().toLocaleDateString('pt-PT'),
        estado: "Por analisar"
      };

      // Atualizar localStorage
      localStorage.setItem("dadosOcorrencias", JSON.stringify(dadosIniciais));
      localStorage.setItem("dadosTabelaOcorrencias", JSON.stringify(dadosTabela));

      alert("Ocorrência guardada com sucesso!");
      form.reset();
      fecharModal();
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const fotoBase64 = event.target.result;
        salvarOcorrencia(fotoBase64);
      };
      reader.readAsDataURL(file);
    } else {
      salvarOcorrencia(null);
    }
  });
});
