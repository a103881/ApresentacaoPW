window.onload = function () {
  google.accounts.id.initialize({
    client_id: "882068332743-69orjit7lkcs9b2jlfbbo3obvqdbn2rv.apps.googleusercontent.com",
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
  const credential = response.credential;

  // Decodifica o JWT manualmente (sem backend)
  const payload = JSON.parse(atob(credential.split('.')[1]));

  // Guarda o sub (ID do utilizador) no localStorage
  localStorage.setItem('googleUserId', payload.sub);

  console.log("Utilizador autenticado. ID:", payload.sub);

  // Redireciona para a página principal
  window.location.href = "aberto.html";
}
