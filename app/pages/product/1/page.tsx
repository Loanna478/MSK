// Route pour créer une session de paiement
"use client";

import Particles from "@/components/particles";
import Navbar from "@/components/navbar";
import Button from "@/components/button"; // If unused, consider removing it.
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";
import Image from 'next/image';

interface Product {
    id: string; // Assuming there's an ID for the product
    product_name: string;
    product_price: number; // Ensure this exists
    product_image: string; // Ensure this exists
    product_description: string; // Ensure this exists
    product_quantity: number; // Ensure this exists
}

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productsID, setProductsID] = useState<string | undefined>("");

    useEffect(() => {
        const id = window.location.pathname.split("/").pop();
        setProductsID(id);
    }, []);
    useEffect(() => {
        if (!productsID) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://92.158.105.84:8081/getproductbyid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ product_id: productsID }),
                });
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
    }, [productsID]);

    const handleCheckout = async (product: Product) => {
        try {
            const body = {
                id : productsID,
                name: product.product_name,
                quantity: 1,
                amount: Math.round(product.product_price * 100), // En centimes
                image: product.product_image
            };
            const response = await fetch('http://92.158.105.84:8081/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
    
            const session = await response.json();
    
            if (response.status !== 200) {
                throw new Error(session.error || 'Une erreur est survenue lors de la création de la session de paiement');
            }
    
            const stripe = await loadStripe('pk_test_51NPWG4BgKdjLeKvpQuAx66vPxzbRcbJaAReFn2XqEFSvozr8QP0TShnVrgQRrWEIlNnzepXGwxIC1LuD1m9Mglz30017tY1jhf');
    
            // Vérifiez que stripe n'est pas null
            if (!stripe) {
                throw new Error('Stripe failed to initialize.');
            }
    
            const result = await stripe.redirectToCheckout({
                sessionId: session.sessionId
            });
    
            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            alert('Error creating checkout session: ' + error);
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-slate-900 overflow-hidden font-inter antialiased">
            <Navbar />

            <div className="nav-shop">
                <nav className="woocommerce-breadcrumb" aria-label="Breadcrumb">
                    <a href="http://85.215.137.122/">Home</a>&nbsp;/&nbsp;
                    <a href="http://85.215.137.122/pages/product">Product</a>&nbsp;/&nbsp;
                    {products.map(product => (
                        <span key={product.id} className="breadcrumb_last" aria-current="page">{product.product_name}</span>
                    ))}
                </nav>
            </div>

            {products.map(product => (
                <div key={product.id} className="flex justify-between text-white p-6">
                    <img src={product.product_image} alt={product.product_name} className="h-97 w-1/3 object-cover rounded-md" width={500} height={300} />
                    <div className="flex flex-col text-white flex-grow" style={{ paddingLeft: "20px" }}>
                        <h1 className="font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">{product.product_name}</h1>
                        <p className="text-lg font-bold mt-2">${product.product_price.toFixed(2)}</p>
                        <div className="max-w-2xl mb-8">
                            <p className="text-lg text-slate-400">{product.product_description}</p>
                        </div>
                        {/* Quantity */}
                        <p className="text-gray-500 text-sm" style={{ marginTop: "300px" }}>Quantity: {product.product_quantity}</p>
                        <button
                            className={`rounded-lg px-4 py-2 ${product.product_quantity > 0 ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                            onClick={() => product.product_quantity > 0 && handleCheckout(product)}
                            disabled={product.product_quantity === 0}
                        >
                            {product.product_quantity > 0 ? 'Buy Now' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            ))}
            <Particles className="absolute inset-0 pointer-events-none" quantity={50} />
            <div className="absolute top-0 left-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-70 pointer-events-none" aria-hidden="true">
                <Image src="https://cruip-tutorials.vercel.app/particle-animation/shape.svg" className="max-w-none" width={852} height={582} alt="Illustration" />
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70 pointer-events-none" aria-hidden="true">
                <Image src="https://cruip-tutorials.vercel.app/particle-animation/shape.svg" className="max-w-none w-full h-auto" alt="Illustration" />
            </div>
        </div>
    );
}
