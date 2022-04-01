// Event to create a new product
window.onload = function () {
    document.getElementById("product-form").addEventListener("submit", saveProduct);
    document.getElementById("product-form").reset();
    getProductsTable();
};

const getProductsJSON = () => {
    return JSON.parse(localStorage.getItem("Products"));
};

const setProductsToLocalStorage = (products) => {
    localStorage.setItem("Products", JSON.stringify(products));
};

const addProductToLocalStorage = (product) => {
    let products = [];
    if (localStorage.getItem("Products") === null) {
        products.push(product);
        setProductsToLocalStorage(products);
    } else {
        products = getProductsJSON();
        products.push(product);
        setProductsToLocalStorage(products);
    }
};

const getFormProduct = () => {
    let productName = document.getElementById("name").value;
    let productDescription = document.getElementById("description").value;
    let productQuantity = document.getElementById("quantity").value;

    return {
        productName,
        productDescription,
        productQuantity,
    };
};

// Create
const saveProduct = (e) => {
    addProductToLocalStorage(getFormProduct());
    getProductsTable();
    document.getElementById("product-form").reset();
    e.preventDefault();
};

const createTableProduct = (quantity, productName, productDescription, productQuantity) => {
    document.getElementById("product-list").innerHTML += `
    <tr>
        <td>${quantity}</td>  
        <td>${productName}</td>
        <td>${productDescription}</td>
        <td>${productQuantity}</td>
        <td><button onclick="deleteProduct('${productName}')" class="btn btn-danger">Eliminar</button></td>
        <td><button onclick="updateProduct('${productName}')" class="btn btn-secondary">Editar</button></td>
    </tr>
    `;
};

const getLocalStorageProducts = (products) => {
    for (let i = 0; i < products.length; i++) {
        let productName = products[i].productName;
        let productDescription = products[i].productDescription;
        let productQuantity = products[i].productQuantity;

        createTableProduct(i + 1, productName, productDescription, productQuantity);
    }
};

// Read
const getProductsTable = () => {
    document.getElementById("product-list").innerHTML = "";
    getLocalStorageProducts(getProductsJSON());
};

const goToPreviousPage = () => {
    document.location.reload();
};

const validateEmptyData = (products, singleProduct) => {
    let newName = document.getElementById("new-name").value;
    let newDescription = document.getElementById("new-description").value;
    let newQuantity = document.getElementById("new-quantity").value;

    if (newName !== "") {
        products[singleProduct].productName = newName;
    }
    if (newDescription !== "") {
        products[singleProduct].productDescription = newDescription;
    }
    if (newQuantity !== "") {
        products[singleProduct].productQuantity = newQuantity;
    }
};

const updateProductData = (product) => {
    let products = getProductsJSON();
    validateEmptyData(products, product);
    setProductsToLocalStorage(products);
    goToPreviousPage();
};

// Update
const updateProduct = (name) => {
    let products = getProductsJSON();
    for (let i = 0; i < products.length; i++) {
        if (products[i].productName === name) {
            document.getElementById("content-container").innerHTML = `
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-md-5">
                <!-- Add product card -->
                    <div class="card">
                        <div class="card-header text-center">
                            <h3>Editar producto</h3>
                        </div>
                        <div class="card-body">
                            <!-- Form -->
                            <form>
                                <!-- Name input -->
                                <div class="form-group">
                                    <input
                                        type="text"
                                        id="new-name"
                                        placeholder="${products[i].productName}"
                                        class="form-control"
                                    />
                                </div>
                                <!-- Description input -->
                                <div class="form-group mt-3">
                                    <input
                                        type="text"
                                        id="new-description"
                                        placeholder="${products[i].productDescription}"
                                        class="form-control"
                                    />
                                </div>
                                <!-- Quantity input -->
                                <div class="form-group mt-3">
                                    <input
                                        type="number"
                                        id="new-quantity"
                                        class="form-control"
                                        placeholder="${products[i].productQuantity}"
                                        min="1"
                                    />
                                </div>
                            </form>

                            <div class="text-center">
                            <button class="btn btn-primary mt-4" onclick="updateProductData('${i}')">Aceptar</button>
                            <button class="btn btn-primary mt-4" onclick="goToPreviousPage()">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
};

// Delete
const deleteProduct = (name) => {
    let product = getProductsJSON();
    for (let i = 0; i < product.length; i++) {
        if (product[i].productName === name) {
            product.splice(i, 1);
        }
    }
    setProductsToLocalStorage(product);
    getProductsTable();
};
