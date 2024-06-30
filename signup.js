let formSignUp = document.getElementById("signup-form")

formSignUp.addEventListener("submit", function(event){
    event.preventDefault()

    let yourname = document.getElementById("YourName").value;
    let username = document.getElementById("UserName").value;
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let users = JSON.parse(localStorage.getItem("users"))  || [];
    let isExisting = users.some(users => users.email === email) ;

    if((yourname.length>0 && username.length>0 && email.length>0 && password.length>0)){
        if (isExisting){
            alert("Accont Already Exist")
        }
        else{
            alert("Sign Up Successfully")
            users.push({yourname, username, email, password, avatar: "https://seeklogo.com/images/A/among-us-logo-315EB5A5DA-seeklogo.com.png"})
            localStorage.setItem("users", JSON.stringify(users))
            window.location.href = '/signin.html'
        }
    }else{
        alert("please write something")
    }
})
