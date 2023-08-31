import React, { useState, useEffect } from 'react';
import {
    Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, CardTitle, CardText
} from 'reactstrap';
import axios from 'axios';

export function Home() {
    const [categories, setCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
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

    const fetchProducts = async (categoryId) => {
        try {
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

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setProductName(product.productName);
        setProductDescription(product.description);
        setProductUrl(product.imgUrl);
        setProductPrice(product.price);
        setSelectedCategory(product.categoryId);
        toggleModal();
    }

    const handleSave = async () => {
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

    useEffect(() => {
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
        fetchCategories();

        
      //  fetchProducts();
    }, []);


    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    }

    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    }

    return (
        <div>
            <Button color="primary" onClick={toggleAddModal}>Add Product</Button>

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

            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret>
                    Categories
                </DropdownToggle>
                <DropdownMenu>
                    {categories.map((category) => (
                        <DropdownItem key={category.id} onClick={() => fetchProducts(category.id)}>
                            {category.name}
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
                            alt={product.description}
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