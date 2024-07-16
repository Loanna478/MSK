"use client";

import Particles from "@/components/particles";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import Image from 'next/image';

// Définir l'interface pour le produit
interface Product {
    product_id: string;  // Assurez-vous que ce type correspond à votre structure de données
    product_name: string;
    product_price: number;
    product_image: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_price: '',
        product_image: '',
        product_description: '',
        product_quantity: ''
    });

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://92.158.105.84:8081/getproduct');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://92.158.105.84:8081/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            const result = await response.json();
            if (result.success) {
                alert('Product added successfully!');
                setNewProduct({
                    product_name: '',
                    product_price: '',
                    product_image: '',
                    product_description: '',
                    product_quantity: ''
                });
                // Optionally, refetch products to update the list
                fetchProducts();
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-slate-900 overflow-hidden font-inter antialiased">
            <Navbar />
            <Particles className="absolute inset-0 pointer-events-none" quantity={100} />

            <div className="flex flex-col items-center justify-center text-white flex-grow mt-36">
                <h1 className="font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">ALL PRODUCTS</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6 mt-36">
                {products.length > 0 ? (
                    products.map(product => (
                        <a href={`/pages/product/${product.product_id}`} className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800" key={product.product_id}>
                            <div className="rounded-lg p-6">
                                <Image src={product.product_image} alt={product.product_name} className="h-48 w-full object-cover rounded-md mb-4" />
                                <h2 className="text-xl text-white-800 font-bold">{product.product_name}</h2>
                                <p className="text-lg font-bold mt-2">€{product.product_price.toFixed(2)}</p>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="text-white">Loading products...</p>
                )}
            </div>

            <div className="flex flex-col items-center p-6">
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={newProduct.product_name}
                    onChange={handleInputChange}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800 mb-2"
                />
                <input
                    type="text"
                    name="product_price"
                    placeholder="Product Price"
                    value={newProduct.product_price}
                    onChange={handleInputChange}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800 mb-2"
                />
                <input
                    type="text"
                    name="product_image"
                    placeholder="Product Image"
                    value={newProduct.product_image}
                    onChange={handleInputChange}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800 mb-2"
                />
                <input
                    type="text"
                    name="product_description"
                    placeholder="Product Description"
                    value={newProduct.product_description}
                    onChange={handleInputChange}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800 mb-2"
                />
                <input
                    type="text"
                    name="product_quantity"
                    placeholder="Product Quantity"
                    value={newProduct.product_quantity}
                    onChange={handleInputChange}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800 mb-2"
                />
                <button
                    onClick={handleAddProduct}
                    className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}
