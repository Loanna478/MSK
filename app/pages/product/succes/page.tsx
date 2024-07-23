"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Particles from "@/components/particles";
import Navbar from "@/components/navbar";
import Button from "@/components/button";

// Dynamically import the l-quantum component to be used only on the client side
const QuantumLoader = dynamic(() => import('ldrs').then(mod => mod.quantum), { ssr: false });

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading period of 3 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) { 
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                {/* Loader from ldrs */}
                {QuantumLoader && (
                    <l-quantum
                        size="45"
                        speed="1.75" 
                        color="black" 
                    ></l-quantum>
                )}
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden relative font-inter antialiased">
            <Navbar />
            <Particles className="absolute inset-0 pointer-events-none" quantity={100} />
            <center className="text-white">
                <h1 className="inline-flex font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Thanks for your purchase!</h1>
                <div className="max-w-3xl mx-auto mb-8">
                    <p className="text-lg text-slate-400">Your order has been placed successfully. You will receive an email confirmation shortly.</p>
                </div>
            </center>

            <Button href="http://mshop.ovh/">Back to Home</Button>
        </div>
    );
}
