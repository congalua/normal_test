let editingIndex = -1;

function toggleImageInput() {
    var imageType = document.getElementById("imageType").value;
    var uploadInput = document.getElementById("imageUpload");
    var LinkLabel = document.getElementById("imageLinklabel");
    var LinkInput = document.getElementById("imageLink");

    if (imageType === "upload"){
        uploadInput.style.display = "block";
        LinkLabel.style.display = "none";
        LinkInput.style.display = "none";
    }
    else{
        uploadInput.style.display = "none";
        LinkLabel.style.display = "block";
        LinkInput.style.display = "block";
    }
}
imageType.addEventListener("onchange", toggleImageInput)

function addProduct() {
    var productName = document.getElementById("productName").value;
    var productPrice = document.getElementById("productPrice").value;
    
    var imageType = document.getElementById("imageType").value;
    var imagePath = "";

    if(imageType === "upload"){
        var imageUpload = document.getElementById("imageUpLoad");
        var file = imageUpload.files[0];

        if(file){
            var reader = new FileReader();
            reader.onload = function(e){
                imagePath = e.target.result;
                saveProduct(productName, productPrice, imagePath);
            };
            reader.readAsDataURL(file);
        }
        else{
            alert("Please select image file")
        }
    }
    else{
        imagePath = document.getElementById("imageLink").value;
        saveProduct(productName, productPrice, imagePath) ; 
    }
    window.location.href = "./index.html";
}
button_add.addEventListener("click", addProduct)
function saveProduct(name, price, image){
    if (typeof Storage !== "undefined"){
        var storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        let infoProduct = {
            name: name,
            price: price,
            image: image,
            deleted: false,
        };
        
        storedProducts.push(infoProduct);
        localStorage.setItem("products", JSON.stringify(storedProducts));

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productUpLoad").value = "";
        document.getElementById("productLink").value = "";

        alert("Product added successfully");
        window.location.href = "./index.html";
    }
    else{
        alert("Sorry, can not add this product! Please try again")
    }
}
8