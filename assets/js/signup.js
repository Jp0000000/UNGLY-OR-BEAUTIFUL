let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')


let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

email.addEventListener('keyup', () => {
  if(validateEmail(email.value)) {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'Email';
    email.setAttribute('style', 'border-color: green');
    validEmail = true;
  } else {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'Email *Insira um endereço de email válido do Google';
    email.setAttribute('style', 'border-color: red');
    validEmail = false;
  }
});

// Função para validar o formato do e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase()) && email.endsWith('@gmail.com');
}

usuario.addEventListener('keyup', () => {
  if(usuario.value.length < 3 || usuario.value.length > 12){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira entre 3 e 12 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

function cadastrar() {
  if(validEmail && validUsuario && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    // Verificar se o endereço de e-mail já está em uso
    let emailExistente = listaUser.find(user => user.userCad === email.value);
    if(emailExistente) {
      email.classList.add('input-error'); // Adiciona classe de erro ao campo de e-mail
      let errorMessage = document.createElement('div');
      errorMessage.textContent = 'Endereço de e-mail já está em uso. Por favor, escolha outro.';
      errorMessage.classList.add('error-message');
      email.parentNode.appendChild(errorMessage); // Adiciona a mensagem de erro após o campo de e-mail
      return; // Aborta o cadastro se o endereço de e-mail já está em uso
    }

    // Limpa os estilos e mensagens de erro anteriores,
    email.classList.remove('input-error');
    let previousErrorMessage = email.parentNode.querySelector('.error-message');
    if(previousErrorMessage) {
      previousErrorMessage.remove();
    }


    // Continua com o processo de cadastro
    listaUser.push({
      nomeCad: usuario.value,
      userCad: email.value,
      senhaCad: senha.value
    });

    
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
   
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    setTimeout(()=>{
      window.location.href = "../html/signin.html";
    }, 2000)
  
    
  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})