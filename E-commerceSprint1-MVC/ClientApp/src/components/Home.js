import React, { useState, useEffect } from 'react';
import {
    Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, CardTitle, CardText
} from 'reactstrap';
import axios from 'axios';

export function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productUrl, setProductUrl] = useState("");
    const [price, setProductPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [newProductName, setNewProductName] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");
    const [newProductUrl, setNewProductUrl] = useState("");
    const [newPrice, setNewProductPrice] = useState("");
    const [newSelectedCategory, setNewSelectedCategory] = useState(1);

    const [addModalOpen, setAddModalOpen] = useState(false);

    const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({ id: null, name: '', description: '' });

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");
    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [categoryEditDropdownOpen, setCategoryEditDropdownOpen] = useState(false);
    const [dropdownMenuOpen, setMenuDropdownOpen] = useState(false);

    const toggleMenuDropdown = () => setMenuDropdownOpen(prevOpen => !prevOpen);

    const toggleCategoryEditDropdown = () => {
        setCategoryEditDropdownOpen(prevState => !prevState);
    };


    const toggleCategoryModal = () => {
        setCategoryModalOpen(!categoryModalOpen);
    }

    const toggleAddCategoryModal = () => {
        setAddCategoryModalOpen(!addCategoryModalOpen);
    }
   
    const handleCategorySave = async () => {
        const updatedCategory = {
            name: selectedCategoryDetails.name,
            description: selectedCategoryDetails.description
        };
        console.log("category id: ", selectedCategoryDetails)
        try {
            await axios.put(`http://localhost:5135/categories/${selectedCategoryDetails.id}`, updatedCategory);
            toggleCategoryModal();
            
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }

    const handleAddCategory = async () => {
        const newCategory = {
            name: newCategoryName,
            description: newCategoryDescription
        };

        try {
            const response = await axios.post(`http://localhost:5135/categories?name=${newCategory.name}&description=${newCategory.description}`);
            console.log("Added category: ", response.data);
            fetchCategories();
            //setCategories([...categories, response.data]);
            toggleAddCategoryModal();
            
        } catch (error) {
            console.error("Could not add category:", error);
        }
    }

  


    

    const handleDeleteCategoryClick = async (categoryToDelete) => {
        if (!categoryToDelete) return;

        try {
            await axios.delete(`http://localhost:5135/categories/${categoryToDelete.id}`);
            const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete.id);
            setCategories(updatedCategories);
            toggleCategoryModal();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    const fetchProducts = async (categoryId) => {
        try {
            console.log("Fetching category with ID:", categoryId);
            const response = await axios.get(`http://localhost:5135/categories/${categoryId}`);
            console.log("Fetched products:", response.data);
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

   

    const handleProductClick = (product) => { //getting details for products 
        setSelectedProduct(product);
        setProductName(product.productName);
        setProductDescription(product.description);
        setProductUrl(product.imgUrl);
        setProductPrice(product.price);
        setSelectedCategory(product.categoryId);
        toggleModal();
    }

    const handleSave = async () => { //saving products
        const updatedProduct = {
            productName,
            description: productDescription,
            imgUrl: productUrl,
            price,
            categoryId: selectedCategory
        };
        

        try {
            await axios.put(`http://localhost:5135/api/products/${selectedProduct.id}`, updatedProduct);
            toggleModal();
        } catch (error) {
            console.error("Error updating product:", error);
        }

    }

    const deleteProducts = async () => {
        try {
            await axios.delete(`http://localhost:5135/api/products/${selectedProduct.id}`);
            console.log("Deleted product:", selectedProduct.id);
            const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
            setProducts(updatedProducts);
            toggleModal();
        } catch (error) {
            console.error("Could not delete product", error);
        }
    }

    const handleAdd = async () => {
        const newProduct = {
            productName: newProductName,
            description: newProductDescription,
            imgUrl: newProductUrl,
            price: newPrice,
            categoryId: parseInt(newSelectedCategory, 10)
        };
        
        try {
            console.log("New Product: ", newProduct);

            const response = await axios.post('http://localhost:5135/api/products', newProduct, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Added product:", response.data);
            setProducts([...products, response.data]);
            toggleAddModal();
        } catch (error) {
            // handle error
        }
    }

        async function fetchCategories() {
            try {
                const response = await axios.get('http://localhost:5135/categories');
                // Use the $values key from the response data
                console.log(response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
    useEffect(() => {
       fetchCategories();
       
        

        
      //  fetchProducts();
    }, []);


    

    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    }

    return (
        <div>

            <Button color="primary" onClick={toggleAddCategoryModal}>Add Category</Button>
            <Button color="secondary" onClick={toggleCategoryModal}>Edit Categories</Button>
            <Button color="primary" onClick={toggleAddModal}>Add Product</Button>

            {/* Add new category */}

            <Modal isOpen={addCategoryModalOpen} toggle={toggleAddCategoryModal}>
                <ModalHeader>New Category</ModalHeader>
                <ModalBody>
                    {
                        <div>
                            <div>
                                <label>Name</label>
                                <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value )} />
                            </div>
                            <div>
                                <label>Description</label>
                                <input type="text" value={newCategoryDescription} onChange={e => setNewCategoryDescription(e.target.value )} />
                            </div>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddCategory}>Add</Button>
                    <Button color="primary" onClick={handleCategorySave}>Save</Button>
                    <Button color="secondary" onClick={toggleAddCategoryModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Edit Categories and Delete Categories */}
            <Modal isOpen={categoryModalOpen} toggle={toggleCategoryModal}>
                <ModalHeader toggle={toggleCategoryModal}>Edit Category</ModalHeader>
                <ModalBody>
                    <Dropdown isOpen={dropdownMenuOpen} toggle={toggleMenuDropdown}>
                        <DropdownToggle caret>
                            Category
                        </DropdownToggle>
                        <DropdownMenu>
                            {categories.map(category => (
                                <DropdownItem
                                    key={category.id}
                                    onClick={() => {
                                        console.log(category);
                                        setSelectedCategoryDetails(category);
                                    }}
                                >
                                    {category.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={selectedCategoryDetails.name}
                            onChange={e => setSelectedCategoryDetails(prevState => ({ ...prevState, name: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <input
                            type="text"
                            value={selectedCategoryDetails.description}
                            onChange={e => setSelectedCategoryDetails(prevState => ({ ...prevState, description: e.target.value }))}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCategorySave}>Save Category</Button>
                    <Button color="danger" onClick={() => handleDeleteCategoryClick(selectedCategoryDetails)}>Delete</Button>
                    <Button color="secondary" onClick={toggleCategoryModal}>Cancel</Button>
                </ModalFooter>
            </Modal>


            {/* Add new products */}

            <Modal isOpen={addModalOpen} toggle={toggleAddModal}>
                <ModalHeader toggle={toggleAddModal}>Add Product</ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <label>Name</label>
                            <input type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" value={newProductDescription} onChange={e => setNewProductDescription(e.target.value)} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="text" value={newPrice} onChange={e => setNewProductPrice(e.target.value)} />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input type="text" value={newProductUrl} onChange={e => setNewProductUrl(e.target.value)} />
                        </div>
                        <div>
                            <label>Category</label>
                            <select value={newSelectedCategory} onChange={e => setNewSelectedCategory(e.target.value)}>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAdd}>Add</Button>
                    <Button color="danger" onClick={toggleAddModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Category Drop down/ product cards */}
            <Dropdown nav isOpen={categoryEditDropdownOpen} toggle={toggleCategoryEditDropdown}>
                <DropdownToggle nav caret>
                    Categories
                </DropdownToggle>
                <DropdownMenu>
                    {categories.map((category) => (
                        <DropdownItem key={category.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span onClick={() => fetchProducts(category.id)}>
                                    {category.name}
                                </span>
                            </div>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <div>
                {products.map((product) => (
                    <Card
                        style={{
                            width: '18rem'
                        }}
                        key={product.id}>
                        <img
                            alt={product.name}
                            src={product.imgUrl}
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {product.productName}
                            </CardTitle>

                            <CardText>
                                {product.description}
                            </CardText>
                            <Button onClick={() => handleProductClick(product)}>
                                Details
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Edit products */}
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Product</ModalHeader>
                <ModalBody>
                    {selectedProduct && (
                        <div>
                            <div>
                                <label>Name</label>
                                <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
                            </div>
                            <div>
                                <label>Description</label>
                                <input type="text" value={productDescription} onChange={e => setProductDescription(e.target.value)} />
                            </div>
                            <div>
                                <label>Price</label>
                                <input type="text" value={price} onChange={e => setProductPrice(e.target.value)} />
                            </div>
                            <div>
                                <label>Image URL</label>
                                <input type="text" value={productUrl} onChange={e => setProductUrl(e.target.value)} />
                            </div>
                            <div>
                                <label>Category</label>
                                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                    <Button color="danger" onClick={deleteProducts}>Delete</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}