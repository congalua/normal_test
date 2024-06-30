let auth = JSON.parse(localStorage.getItem("currentUser"))
console.log(auth);

let SignOut = document.getElementById("SignOut")
let avatar = document.getElementById("avatar")
let Welcome = document.getElementById("Welcome")
let SignIn = document.getElementById("SignIn")
let Signin = document.getElementById("Signin")

SignOut.style.display = 'none'

if (auth) {
    SignOut.style.display = 'block'
    SignIn.style.display = 'none'
    Signin.style.display = 'none'
    Welcome.innerText = "Hello, " + auth.username
    avatar.src = auth.avatar
}

function SignOut_control (){
    localStorage.removeItem("currentUser")
    window.location.href = '/signin.html'
}

SignOut.addEventListener("click", SignOut_control)

function Signin_control (){
    window.location.href = '/signin.html'
}
SignIn.addEventListener("click", Signin_control )