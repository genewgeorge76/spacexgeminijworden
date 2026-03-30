import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white">
      {/* Premium Hero */}
      <section className="py-32 px-6 border-b-[12px] border-[#ffcc00] bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#ffcc00] font-black uppercase tracking-widest text-sm">4th Generation Legacy</span>
          <h1 className="text-8xl font-black uppercase text-white leading-none mt-4">
            J. Worden & Sons <br/>
            <span className="text-[#ffcc00]">Asphalt Paving</span>
          </h1>
          <p className="text-2xl text-gray-400 mt-8 max-w-2xl font-bold italic">
            Dominating Richmond and 41 surrounding cities with VDOT-grade structural integrity and premium stone bases.
          </p>
        </div>
      </section>
    </main>
  ),
});
