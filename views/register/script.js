function Register() {
  this.usernameInput = document.getElementById('username');
  this.passwordInput = document.getElementById('password');
  this.repeatPasswordInput = document.getElementById('repeatPassword');

  this.registerButton = document.getElementById('register');
  this.registerButton.addEventListener('click', this.register.bind(this));
  this.checkLogin()
}

Register.prototype.checkLogin = function () {
  const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      if (storedUser.userId !== null) {
        window.location.href = '../todoList/index.html';
        sessionStorage.removeItem('loggedInUser')
      }
    }
};

function checkUserOnRegister(username, password, repeatPassword) {
  if (password !== repeatPassword) {
    alert('Passwords do not match')
  } else {
    const newUser = {
      username,
      password,
      userId: generateUID()
    }
    let accountData = localStorage.getItem('accountData');
    if (accountData && accountData.length) {
      accountData = JSON.parse(accountData);
    } else {
      accountData = [];
    }
    accountData.push(newUser);
    localStorage.setItem('accountData', JSON.stringify(accountData));

    alert('Registration successful! You can now log in.')
    window.location.href = '../../index.html';
  
    this.usernameInput.value = '';
    this.passwordInput.value = '';
    this.repeatPasswordInput.value = '';

  }
}

Register.prototype.register = function () { 
  const username = this.usernameInput.value
  const password = this.passwordInput.value
  const repeatPassword = this.repeatPasswordInput.value

  if (validateEmail(username)) {
    checkUserOnRegister(username, password, repeatPassword)
  } else {
    alert('Invalid email address')
  }
}

  const app = new Register();