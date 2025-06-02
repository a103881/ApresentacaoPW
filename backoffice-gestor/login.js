// login.js atualizado com Google Sign-In

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "266416139565-pofpcet446jg9a7nhafofhloturttbfj.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: false
  });

  google.accounts.id.renderButton(
    document.getElementById("google_login_btn"),
    {
      theme: "outline",
      size: "large"
    }
  );

  google.accounts.id.prompt();
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

  // Redirecionar para a página de ocorrências
  window.location.href = "tabelaOcorrencias.html";
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  /*const jsonPayload = decodeURIComponent(
    window.atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );*/
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}