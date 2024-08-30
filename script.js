function Login() {
  // Schema của account data
  // this.accountData = [
  //   { userId: '1' ,username: 'admin', password: 'admin123' },
  //   { userId: '2' ,username: 'tunguyen123', password: '123123' },
  // ];

  this.usernameInput = document.getElementById('username');
  this.passwordInput = document.getElementById('password');
  this.loginButton = document.getElementById('login');
  this.rememberCheckbox = document.getElementById('remember')
  this.loginButton.addEventListener('click', this.login.bind(this));
  this.checkLogin();
};

function checkAccountOnLogin(accountData, username, password, checkedBox) {
  if (!accountData && !accountData.length) {
    alert('Account does not exist');
  }
  const user = accountData.find(account => account.username === username);
  if (user === undefined) {
    alert('Account does not exist');
  }
  if (user.password != password) {
    alert('Wrong password');
  }
  if (checkedBox.checked === true) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    sessionStorage.removeItem('loggedInUser');
  }
  if (checkedBox.checked === false) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.removeItem('loggedInUser');
  }
  alert('Login successful')
  window.location.href = './views/todoList/index.html';

}

Login.prototype.checkLogin = function () {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    if (storedUser.userId !== null) {
      window.location.href = './views/todoList/index.html';
      sessionStorage.removeItem('loggedInUser')
    }
  }
};
Login.prototype.login = function () {
  const accountData = JSON.parse(localStorage.getItem('accountData'))
  const username = this.usernameInput.value
  const password = this.passwordInput.value

  if (validateEmail(username)) {
    checkAccountOnLogin(accountData, username, password, this.rememberCheckbox)
  } else {
    alert('Invalid email format');
  }
};

const app = new Login();