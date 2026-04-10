import { createFileRoute } from '@tanstack/react-router';
import ContactForm from '../components/ContactForm';

export const Route = createFileRoute('/contact')({
  component: () => (
    <main className="min-h-screen bg-[#111111] text-white font-sans">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-[#1a1a1a] border-b-[15px] border-[#ffcc00] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="bg-[#ffcc00] text-black px-6 py-1.5 font-black uppercase text-xs tracking-[0.4em] mb-8 inline-block shadow-2xl">
            Chester, VA Headquarters · Dispatching 50 States
          </span>
          <h1 className="text-8xl font-black uppercase text-[#ffcc00] leading-[0.9] tracking-tighter">
            GET IN <br /> <span className="text-white italic">TOUCH</span>
          </h1>
          <p className="text-3xl text-gray-400 italic font-bold mt-10 max-w-4xl leading-snug">
            From free estimates to active bid inquiries, our team responds fast. Call, text, or submit below.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-black uppercase text-white mb-8">Direct Lines</h2>
              <div className="space-y-6">
                <div className="border-l-[6px] border-[#ffcc00] pl-6">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Phone / Text</div>
                  <a href="tel:8044461296" className="text-4xl font-black text-[#ffcc00] hover:text-white transition-colors">(804) 446-1296</a>
                </div>
                <div className="border-l-[6px] border-[#ffcc00] pl-6">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Headquarters</div>
                  <address className="text-xl font-bold text-white not-italic">
                    7011 Wood Rd<br />Richmond, VA
                  </address>
                </div>
                <div className="border-l-[6px] border-[#ffcc00] pl-6">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">License</div>
                  <div className="text-xl font-bold text-white">Virginia Class A Contractor</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase text-[#ffcc00] mb-4">Service Area</h3>
              <p className="text-gray-400 leading-relaxed font-bold">
                Richmond Metro · Hampton Roads · Northern Virginia · Fredericksburg · Charlottesville · Roanoke · and 12 states nationwide for government and national brand projects.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black uppercase text-white mb-8">Request a Free Estimate</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  ),
});
