// let formSignUp = document.getElementById("signup-form")

// formSignUp.addEventListener("submit", function(event){
//     event.preventDefault()

//     let yourname = document.getElementById("YourName").value;
//     let username = document.getElementById("UserName").value;
//     let email = document.getElementById("Email").value;
//     let password = document.getElementById("Password").value;
//     let users = JSON.parse(localStorage.getItem("users"))  || [];
//     let isExisting = users.some(users => users.email === email) ;

//     if((yourname.length>0 && username.length>0 && email.length>0 && password.length>0)){
//         if (isExisting){
//             alert("Accont Already Exist")
//         }
//         else{
//             alert("Sign Up Successfully")
//             users.push({yourname, username, email, password, avatar: "https://seeklogo.com/images/A/among-us-logo-315EB5A5DA-seeklogo.com.png"})
//             localStorage.setItem("users", JSON.stringify(users))
//             window.location.href = '/signin.html'
//         }
//     }else{
//         alert("please write something")
//     }
// })

import Toastify from 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
    authDomain: "my-blog-lol.firebaseapp.com",
    projectId: "my-blog-lol",
    storageBucket: "my-blog-lol.appspot.com",
    messagingSenderId: "503051123538",
    appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const FormSignUp = document.getElementById("signup-form");
const submitbutton = document.getElementById("submit-bt")

FormSignUp.addEventListener("submit", async (e) =>{
    e.preventDefault();

    submitbutton.disabled = true;

    const loadingToast = Toastify({
        text: "Registering...",
        duration: -1,
        close: true,
        gravity: "top",
        position: 'right',
        backgroundColor: '#1952d7',
        stopOnFocus: true,
      }).showToast();

    let FirstName = document.getElementById('FirstName').value
    let LastName = document.getElementById('LastName').value
    let Email = document.getElementById('Email').value
    let Password = document.getElementById('Password').value

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, Email, Password)
        const user = userCredential.user;

        // cập nhật trường trong tin display name
        await updateProfile(user, {
            displayName: FirstName + " " + LastName
        })

        //lưu thông tin vào firestore của database với colletion
        await setDoc(doc(db, 'users', user.uid),{
            FirstName,
            LastName,
            Email,
        })

        loadingToast.hideToast();

        Toastify({
            text: "Register succesfully",
            duration: -1,
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
        submitbutton.disabled = false;
    };
})