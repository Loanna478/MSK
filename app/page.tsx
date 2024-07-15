"use client";
import Particles from "../components/particles";
import Button from "../components/button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from 'next/image';


export default function Home() {

  

  return (

    <div className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden relative font-inter antialiased">

      <Navbar/>

      <center className="text-white">
      <h1 className="inline-flex font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">MSHOP</h1>
      <div className="max-w-3xl mx-auto mb-8">
       <p className="text-lg text-slate-400">Welcome to MSHOP, the best place to shop for all your needs. We have a wide range of products to choose from. We have the best prices and the best quality.</p>
      </div>



      <Button href="/pages/product">Shop Now</Button>

      </center>
      
      <Particles className="absolute inset-0 pointer-events-none" quantity={100} />

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
