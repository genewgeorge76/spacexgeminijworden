import React from 'react';

export const ResidentialHub = () => {
  return (
    <div className="bg-industrial-black text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black text-gold mb-6 tracking-widest uppercase">Premium Driveway Asphalt Paving</h1>
        <p className="text-xl text-gray-300 mb-8">Serving Virginia, North Carolina, South Carolina, Georgia, and Florida.</p>
        <p className="text-md text-gray-400 mb-12">We use the exact same VDOT-grade 96% Marshall Density asphalt on your home that we use on corporate parking lots. Built to outlast.</p>

        <div className="bg-black border-2 border-gold p-8 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.2)]">
          <h2 className="text-2xl font-bold mb-4">Request a Satellite Measurement</h2>
          <p className="mb-6 text-gray-400">Enter your address. Our AI will measure your driveway via satellite and text you a precise estimate within 60 seconds.</p>
          <input type="text" placeholder="Enter your home address..." className="w-full p-4 mb-4 bg-zinc-900 border border-gray-700 text-white rounded focus:border-gold outline-none" />
          <button className="w-full bg-gold text-black font-extrabold py-4 text-xl hover:bg-yellow-500 transition-all">GET MY INSTANT QUOTE</button>
        </div>
      </div>
    </div>
  );
};
