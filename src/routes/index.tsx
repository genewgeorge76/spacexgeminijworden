import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '../components/ContactForm'
import { Shield, Award, HardHat, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-[#0a0a0a] text-white font-sans pt-20">
      {/* HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070')] bg-cover bg-center opacity-20 grayscale" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c8a84b]/30 bg-[#c8a84b]/10 mb-8">
            <Award size={14} className="text-[#c8a84b]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a84b]">2026 Houzz Service Award Winner</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            The Standard <br />
            <span className="text-[#c8a84b]">Of Richmond</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#888] mb-12 leading-relaxed">
            J. Worden & Sons doesn't just pave; we build infrastructure. Every commercial and residential project begins with our signature 6-inch compacted structural stone base.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <a href="tel:8044461296" className="bg-[#c8a84b] text-[#111] px-8 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-white transition-all">
               911 Dispatch: 804-446-1296
             </a>
          </div>
        </div>
      </section>

      {/* AUTHORITY MOAT - THE 6-INCH STANDARD */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
                Our 6-Inch <br />Structural Base.
              </h2>
              <p className="text-xl text-[#444] leading-relaxed mb-8 font-medium">
                Most pavers use 2-3 inches of stone. We use 6 inches of compacted Grade-A stone for every job. This prevents the "spider-web" cracking and sinking common in Richmond's clay soil.
              </p>
              <ul className="space-y-4">
                {[
                  "Industrial Grade Compaction",
                  "Precision Grading for Drainage",
                  "Quiet, Commercial-Spec Crews",
                  "2026 Houzz Excellence Standards"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs">
                    <CheckCircle2 size={16} className="text-[#c8a84b]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#f5f5f0] p-12 border border-[#e8e8e0]">
               <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-[#c8a84b] inline-block">Request Estimate</h3>
               <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
