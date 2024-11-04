document.addEventListener('DOMContentLoaded', function() {
  const btnName = document.getElementById('btnName');
  btnName.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
  const UserName = prompt('Digite seu nome: ');
  showAlert(UserName);
}

function showAlert(message) {
  if(message) {
    Swal.fire({
      title: "Olá",
      text: `Bem-vindo, ${message}!`,
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "Erro",
      text: "Você não inseriu um nome",
      icon: "error"
    });
  }
}