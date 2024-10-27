import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot, 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
    authDomain: "my-blog-lol.firebaseapp.com",
    projectId: "my-blog-lol",
    storageBucket: "my-blog-lol.appspot.com",
    messagingSenderId: "503051123538",
    appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const addproduct = document.getElementById("addProductForm")

const dataList = document.getElementById("data_list")

const name = document.getElementById('name')
const price = document.getElementById('price')
const desc = document.getElementById('desc')
const pic = document.getElementById('pic')
const caterLog = document.getElementById('caterlog')

addproduct.addEventListener("submit", async function (e){
    e.preventDefault()

    const product_Name = name.value
    const product_Price = price.value
    const product_Desc = desc.value
    const product_Pic = pic.value
    const product_Caterlog = caterLog.value

    // khi id tồn tại thì edit thay vì add
    if(addproduct.dataset.id){
        const id = addproduct.dataset.id;
        try {
            const userf = doc(db, "product_main_test", id);
            await updateDoc(userf, {product_Name,product_Price, product_Desc, product_Pic, product_Caterlog })
            // trả giá trị về trống để không rối
            name.value = ""
            price.value = ""
            desc.value = ""
            pic.value = ""
            caterLog.value = ""
            addproduct.dataset.id = ""
            addproduct.querySelector("button").textContent = "Update product information"
            alert("Document succesfully update the product")
        } catch (error) {
            console.error("Error update document", error);
        }
    }
    else{
        try {
            alert("add product successfully")
            await addDoc (collection (db, "product_main_test"),{
                product_Name,
                product_Price,
                product_Desc,
                product_Pic,
                product_Caterlog,
            })
            addproduct.querySelector("button").textContent = "Confirm to add products"
            name.value = ""
            price.value = ""
            desc.value = ""
            pic.value = ""
            caterLog.value = ""
        } 
        catch (error) {
            alert("error")
        }
    }addproduct.querySelector("button").textContent = "Confirm to add products"
})

onSnapshot(collection(db, "product_main_test"), (snapshot)=>{
    // onSnapshot: lấy thông tin theo thời gian thực (không cần reload lại trang)
    dataList.innerHTML = ""
    snapshot.forEach((docId) =>{
        const div = document.createElement("div")
        div.setAttribute("data_id", docId.id)
        div.innerHTML = `
            <div class = idm>
                <div class = text>
                    <span>Name: ${docId.data().product_Name}</span>
                    <span>Price: ${docId.data().product_Price}</span>
                    <span>Desc: ${docId.data().product_Desc}</span>
                    <span>Catergory: ${docId.data().product_Caterlog}</span>
                </div>
                <div class = pic>
                    <img src="${docId.data().product_Pic}">     
                </div>
            </div>

            <button class="edit">Edit</button>
            <button class="delete" id ="delete">Delete</button>
        `
        dataList.appendChild(div)

        //Edit
        div.querySelector(".edit").addEventListener('click', ()=>{
            name.value = docId.data().product_Name;
            price.value = docId.data().product_Price;
            desc.value = docId.data().product_Desc;
            pic.value = docId.data().product_Pic;
            caterLog.value = docId.data().product_Caterlog;
            addproduct.dataset.id = docId.id;
            addproduct.querySelector("button").textContent = "update product information"
        })

        //delete
        div.querySelector(".delete").addEventListener('click', async () =>{
            const id = docId.id
            try{
                await deleteDoc(doc(db, "product_main_test", id))
                console.log(`Product with ID ${id} successfully deleted`);
            } 
            catch (error) {
                console.log("Error deleting product: ", error);
            }
            alert("delete successfully")
        })
    })
})