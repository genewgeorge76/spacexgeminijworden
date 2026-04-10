export default function ContactForm() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* AUTHORITY HEADER */}
      <div className="bg-[#ffcc00] text-black p-6 rounded-t-2xl text-center border-x-4 border-t-4 border-white shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
          Stop Waiting for "No-Show" Paving Companies
        </h3>
        <p className="font-bold uppercase text-xs mt-1 tracking-widest opacity-80">
          Dispatch a 4th-Generation Estimator Immediately
        </p>
      </div>

      <form
        className="bg-[#1a1a1a] p-10 border-x-4 border-b-8 border-zinc-800 text-left shadow-2xl font-sans rounded-b-2xl relative"
        action="https://formspree.io/f/j.wordenandsonspaving@gmail.com"
        method="POST"
      >
        {/* KICKSERV INTEGRATION TAGS (Hidden) */}
        <input type="hidden" name="_subject" value="New J. Worden & Sons Dispatch Request" />
        <input type="hidden" name="source" value="Website - Kickserv Sync" />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Full Name</label>
            <input type="text" id="name" name="name" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold" placeholder="John Doe" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Dispatch Phone</label>
            <input type="tel" id="phone" name="phone" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold" placeholder="(804) 000-0000" required />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="address" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Site Address</label>
          <input type="text" id="address" name="address" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-bold" placeholder="123 Main St, Richmond, VA" required />
        </div>

        <div className="mb-8">
          <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Structural Scope</label>
          <select id="service" name="service" className="w-full bg-black border border-zinc-800 text-[#ffcc00] p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none shadow-inner font-black uppercase text-sm">
            <option>Residential Driveway (6" Base Standard)</option>
            <option>Commercial Parking Lot (Industrial Grade)</option>
            <option>Premium Tar & Chip (Macadam)</option>
            <option>Municipal-Grade Sealcoating</option>
          </select>
        </div>

        <div className="mb-10">
          <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Details / Deadlines</label>
          <textarea id="message" name="message" rows={4} className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner font-medium" placeholder="Tell us about your project..."></textarea>
        </div>

        {/* THE "STOP WAITING" BUTTON */}
        <button type="submit" className="group relative w-full bg-[#ffcc00] text-black font-black uppercase tracking-tighter text-2xl md:text-3xl py-6 hover:bg-white transition-all duration-300 shadow-[0_10px_40px_rgba(255,204,0,0.3)] border-b-8 border-black/20 hover:border-black/10 active:border-b-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          Get Your Estimate Now
        </button>

        <p className="mt-8 text-xs text-zinc-500 text-center italic font-bold uppercase tracking-widest">
          Authorized Kickserv® Dispatch Point • 4th-Gen Integrity Guaranteed
        </p>
      </form>
    </div>
  )
}