let formSignIn = document.getElementById("signin-form")

formSignIn.addEventListener("submit", function(event){
    event.preventDefault()
    
    // let username = document.getElementById("UserName").value;
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let users = JSON.parse(localStorage.getItem("users"))  || [];
    let auth = users.some(users => users.email === email && users.password === password)

        if (auth){
            let currentUser = users.find((users) => users.email === email  && users.password === password)
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            alert("Sign in successfully")
            window.location.href = '/index.html'
        }
        else{
            alert("False email or password!Please try again")
        }
})
