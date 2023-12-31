const login = document.querySelector('.login'),
signup = document.querySelector('.signup'),
loginPage = document.querySelector('.login_page'),
signupPage = document.querySelector('.signup_page'),
register_bg = document.querySelector('.register_bg'),
close_register = register_bg.querySelector('img'),
toLogin = document.querySelector('.switch-to-login'),
toSignup = document.querySelector('.switch-to-signup');

login.addEventListener('click', ()=>{
  register_bg.classList.add('active');
  loginPage.classList.add('active');
})

signup.addEventListener('click', ()=>{
  register_bg.classList.add('active');
  signupPage.classList.add('active');
})

close_register.addEventListener('click', ()=>{
  register_bg.classList.remove('active');
  loginPage.classList.remove('active');
  signupPage.classList.remove('active');
})

toLogin.addEventListener('click', ()=>{
  signupPage.classList.remove('active');
  loginPage.classList.add('active');
})

toSignup.addEventListener('click', ()=>{
  loginPage.classList.remove('active'); 
  signupPage.classList.add('active');
})
