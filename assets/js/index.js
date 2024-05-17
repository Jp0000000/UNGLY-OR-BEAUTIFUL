if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "./assets/html/signin.html";
  }
  
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
  document.addEventListener('DOMContentLoaded', function() {
    var sairLinks = document.querySelectorAll('.Sair');

    sairLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            setTimeout(()=>{
          localStorage.removeItem("token");
          localStorage.removeItem("userLogado");
          window.location.href = "./assets/html/signin.html";
            }, 1000)
          
        });
    });
});