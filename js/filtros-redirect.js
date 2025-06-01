document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.portfolio-filters li').forEach(item => {
      item.addEventListener('click', () => {
        const url = item.getAttribute('data-href');
        if (url) {
          window.location.href = url;
        }
      });
    });
  });
  