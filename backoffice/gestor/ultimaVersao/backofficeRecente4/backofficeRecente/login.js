// login.js atualizado com Google Sign-In

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "849411639158-lqosih074s14md550rrtul8g7b7hijd3.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("google_login_btn"),
    {
      theme: "outline",
      size: "large"
    }
  );
};

function handleCredentialResponse(response) {
  const jwt = parseJwt(response.credential);

  const googleUser = {
    nome: jwt.name,
    email: jwt.email,
    foto: jwt.picture
  };

  console.log("Login Google OK:", googleUser);

  localStorage.setItem("googleUser", JSON.stringify(googleUser));

  // Redireciona para a página principal
  window.location.href = "tabelaOcorrencias.html";
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window.atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
  return JSON.parse(jsonPayload);
}