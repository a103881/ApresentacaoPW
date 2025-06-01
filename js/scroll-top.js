// Mostrar ou esconder o botão
window.onscroll = function () {
    const btn = document.getElementById("btn-top");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
  
  // Função para voltar ao topo
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  