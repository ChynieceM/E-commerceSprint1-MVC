import React, { useState } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, CardTitle, CardText
} from 'reactstrap';
import axios from 'axios';

export function Product({ product, categories, fetchProducts }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [productName, setProductName] = useState(product.productName);
    const [productDescription, setProductDescription] = useState(product.description);
    const [productUrl, setProductUrl] = useState(product.imgUrl);
    const [price, setProductPrice] = useState(product.price);
    const [selectedCategory, setSelectedCategory] = useState(product.categoryId);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleProductClick = () => {
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
            await axios.put(`http://localhost:5135/api/products/${product.id}`, updatedProduct);
            toggleModal();
            fetchProducts(product.categoryId);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    const deleteProducts = async () => {
        try {
            await axios.delete(`http://localhost:5135/api/products/${product.id}`);
            toggleModal();
            fetchProducts(product.categoryId);
        } catch (error) {
            console.error("Could not delete product", error);
        }
    }

    return (
        <>
            <Card style={{ width: '18rem' }} key={product.id}>
                <img alt={product.name} src={product.imgUrl} />
                <CardBody>
                    <CardTitle tag="h5">{product.productName}</CardTitle>
                    <CardText>{product.description}</CardText>
                    <Button onClick={handleProductClick}>Details</Button>
                </CardBody>
            </Card>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Product</ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                    <Button color="danger" onClick={deleteProducts}>Delete</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}