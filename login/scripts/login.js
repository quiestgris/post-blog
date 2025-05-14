let emailField = document.getElementById('email'),
    passwordField = document.getElementById("password");

let users;

function getUsers(data) {
    users = data;
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => getUsers(json));


document.querySelector(".login-form").addEventListener('submit', function (e) {
    e.preventDefault();
    for (let i = 0; i < users.length; i++) {
        if (emailField.value == users[i].email) {
            window.location.href = '../profil/index.html';
            window.localStorage.setItem("user",JSON.stringify(users[i]))
            return undefined;
        }
    }
    passwordField = document.querySelector('input[type="password"');
    let errorMessage = document.createElement("p");

    errorMessage.classList.add("login-error-message")
    errorMessage.textContent = "Email ou le mot de passe sont incorrects"
    passwordField.outerHTML += errorMessage.outerHTML;

})