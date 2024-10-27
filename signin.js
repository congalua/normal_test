// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
//     authDomain: "my-blog-lol.firebaseapp.com",
//     projectId: "my-blog-lol",
//     storageBucket: "my-blog-lol.appspot.com",
//     messagingSenderId: "503051123538",
//     appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
//   };

// // lấy trong firebase fr
// const app = initializeApp(firebaseConfig);
// const provider = new GoogleAuthProvider();
// const auth = getAuth(app);

// let formSignIn = document.getElementById("signin-form")

// formSignIn.addEventListener("submit", function(event){
//     event.preventDefault()
    
//     // let username = document.getElementById("UserName").value;
//     let email = document.getElementById("Email").value;
//     let password = document.getElementById("Password").value;
//     let users = JSON.parse(localStorage.getItem("users"))  || [];
//     let auth = users.some(users => users.email === email && users.password === password)

//         if (auth){
//             let currentUser = users.find((users) => users.email === email  && users.password === password)
//             localStorage.setItem("currentUser", JSON.stringify(currentUser))
//             alert("Sign in successfully")
//             window.location.href = '/index.html'
//         }
//         else{
//             alert("False email or password!Please try again")
//         }
// })

// const SignInButton = document.getElementById('SignInButton')

// const UserSignIn = async => {
//     signInWithPopup(auth, provider)
//     .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
    
//     console.log(user);
//     window.location.href = 'index.html'
//     }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.customData.email;
//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });
// }

// SignInButton.addEventListener("click", UserSignIn);


import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
    authDomain: "my-blog-lol.firebaseapp.com",
    projectId: "my-blog-lol",
    storageBucket: "my-blog-lol.appspot.com",
    messagingSenderId: "503051123538",
    appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Gọi biến FormSignIn và submitbuttons từ id bên index
const FormSignIn = document.getElementById("signin-form");
const submitbuttons = document.getElementById("submit-btn")

// cho Form lắng nghe sự kiện
FormSignIn.addEventListener("submit", async (e) =>{
    e.preventDefault();

    submitbuttons.disabled = true;

    const loadingToast = Toastify({
        class:"toast",
        text: "Registering...",
        duration: -1,
        close: true,
        gravity: "top",
        position: 'right',
        backgroundColor: '#1952d7',
        stopOnFocus: true,
      }).showToast();

    let Email = document.getElementById('Email').value
    let Password = document.getElementById('Password').value

    try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          Email,
          Password
        )
        const user = userCredential.user;

        // lưu vào để xem người dùng đã đăng nhập chưa(thông tin ở sign up)
        // display name: first and last name ở sign up
        localStorage.setItem("displayName", user.displayName)


        loadingToast.hideToast();

        Toastify({
            text: "Register succesfully",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: '#1e1e2001',
            stopOnFocus: true,
          }).showToast();

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 3000)
    
    } catch (error) {
        loadingToast.hideToast();

        Toastify({
            text: "Error:" + error.message,
            duration: -1,
            close: true,
            gravity: "top",
            position: 'right',
            backgroundColor: '#ef1515e6',
            stopOnFocus: true,
          }).showToast();
    }
    finally{
        submitbuttons.disabled = false;
    };
})