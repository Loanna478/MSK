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
    product_quantity : number;
    product_image: string;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]); // Utilisez le type Product ici

    useEffect(() => {
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

        fetchProducts();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col bg-slate-900 overflow-hidden font-inter antialiased">
            <Navbar/>
            <Particles className="absolute inset-0 pointer-events-none" quantity={100} />
            <div className="flex flex-col items-center justify-center text-white flex-grow mt-36">
                <h1 className="font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">ALL PRODUCT</h1>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-6 mt-36">
                {products.length > 0 ? (
                    products.map(product => (
                        <a href={`/pages/product/${product.product_id}`} className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 bg-slate-800" key={product.product_id}>
                            <div className="rounded-lg p-6">
                                <img src={product.product_image} alt={product.product_name} className="h-48 w-full object-cover rounded-md mb-4" />
                                <h2 className="text-xl text-white-800 font-bold">{product.product_name}</h2>
                                <p className="text-lg font-bold mt-2">€{product.product_price.toFixed(2)}</p>
                                <p className="text-gray-500 text-sm" >Quantity: {product.product_quantity}</p>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="text-white">Loading products...</p>
                )}
            </div>

            <div className="absolute top-0 left-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-70 pointer-events-none" aria-hidden="true">
                <Image  src="https://cruip-tutorials.vercel.app/particle-animation/shape.svg" className="max-w-none" width="852" height="582" alt="Illustration" />
            </div>

            <div
                className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70 pointer-events-none "
                aria-hidden="true"
            >
                <Image 
                src="https://cruip-tutorials.vercel.app/particle-animation/shape.svg"
                className="max-w-none w-full h-auto"
                alt="Illustration"
                />
            </div>

        </div>
    );
}
