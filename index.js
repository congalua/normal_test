// Thêm thư viện
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// thêm thư viện xong

// cấu hình firebase
const firebaseConfig = {
    apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
    authDomain: "my-blog-lol.firebaseapp.com",
    projectId: "my-blog-lol",
    storageBucket: "my-blog-lol.appspot.com",
    messagingSenderId: "503051123538",
    appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
  };

// lấy trong firebase fr
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

let Welcome = document.getElementById("Welcome")
const SignIn = document.getElementById("SignIn")
const SignOutGoogle = document.getElementById('SignOutGoogle')
let signinICON = document.getElementById('SignIn_icon')

const SignInSite = () => {
    window.location.href = 'signin.html'
}

SignIn.addEventListener('click', SignInSite )

document.addEventListener("DOMContentLoaded", () =>{
    const SighOutnormal = () => {
        signOut(auth);
        localStorage.removeItem("displayName")
        alert("sign out successfully")
    }
    const buttonSignOut = document.getElementById("SignOut")  
    onAuthStateChanged(auth, (user) =>{
        const displayName = document.getElementById("displayName")

        if(user){
            const displayName = user.displayName || "User";

            Welcome.innerHTML = `Hello , ${displayName}`

            SignIn.style.display = 'none'
            buttonSignOut.style.display = 'true'    
            SignOutGoogle.style.display = 'none' 
            signinICON.style.display = 'none'

            buttonSignOut.addEventListener('click', SighOutnormal)
        } else if(displayName){
            Welcome.innerHTML = `Hello , ${displayName}`

            SignIn.style.display = 'none'
            buttonSignOut.style.display = 'true'  
            SignOutGoogle.style.display = 'none' 
            signinICON.style.display = 'none'


            buttonSignOut.addEventListener('click', SighOutnormal)
        }else{
            SignIn.style.display = 'inline'
            SignOutGoogle.style.display = 'none' 
            buttonSignOut.style.display = 'none'
            Welcome.innerHTML = 'No account yet'
            signinICON.style.display = 'inline'
        }

    })
})

const productAppear = document.getElementById('product_appear')
const querySnapshot = await getDocs (collection (db, "product_main_test"))
querySnapshot.forEach((doc) => {
    let div = document.createElement('div')
    div.innerHTML = `
        <img src="${doc.data().product_Pic}">    
        <h1>Tên ${doc.data().product_Name}</h1>   
        <h2>Giá ${doc.data().product_Price}</h2> 
        <h2>Loại sản phẩm: ${doc.data().product_Caterlog}</h2>  
        <h2>Mô tả: ${doc.data().product_Desc}</h2>
    `
    productAppear.appendChild(div)
});


// let auth1 = JSON.parse(localStorage.getItem("currentUser"))
// console.log(auth);



// // SignIn.addEventListener('click', window.location.href = 'signin.html')
// SignOut.style.display = 'none'
// SignOutGoogle.style.display = 'none'

// if (auth1) {
//     SignOut.style.display = 'block'
//     SignIn.style.display = 'none'
//     Welcome.innerText = "Hello, " + auth.username
//     avatar.src = auth.avatar
// }

// function SignOut_control (){
//     localStorage.removeItem("currentUser")
//     window.location.href = '/signin.html'
// }

// SignOut.addEventListener("click", SignOut_control)

// function Signin_control (){
//     window.location.href = '/signin.html'
// }
// SignIn.addEventListener("click", Signin_control )


// const UserSignOut = async => {
//     signOut(auth)
//     .then(() => {
//         alert("You have sign out successfully")
//         window.location.reload()
//       })
//     .catch((error) => {});
// }

// onAuthStateChanged(auth, (user)=>{
//     if(user){
//         SignOutGoogle.style.display = 'block'
//         SignOut.style.display = 'none'
//         SignIn.style.display = 'none'
//         Welcome.innerText = "Hello, " + auth.username
//     }
//     else{
//         SignIn.style.display = 'block';
//         SignOut.style.display = 'none';
//         SignOutGoogle.style.display = 'none'
//     }
// })

// SignOutGoogle.addEventListener("click", UserSignOut);
