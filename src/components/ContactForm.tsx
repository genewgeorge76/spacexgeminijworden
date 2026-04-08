export default function ContactForm() {
  return (
    <form 
      className="max-w-2xl mx-auto bg-[#1a1a1a] p-10 border border-zinc-800 text-left shadow-2xl font-sans" 
      action="https://formspree.io/f/j.wordenandsonspaving@gmail.com" 
      method="POST"
    >
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Full Name</label>
          <input type="text" id="name" name="name" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
        </div>
      </div>
      <div className="mb-8">
        <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Email Address</label>
        <input type="email" id="email" name="email" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" required />
      </div>
      <div className="mb-8">
        <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Service Needed</label>
        <select id="service" name="service" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none shadow-inner">
          <option>Commercial Paving</option>
          <option>Residential Driveway</option>
          <option>Tar & Chip / Sealcoating</option>
          <option>Other / Not Sure</option>
        </select>
      </div>
      <div className="mb-10">
        <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Details</label>
        <textarea id="message" name="message" rows={4} className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors shadow-inner" placeholder="Tell us about your project..."></textarea>
      </div>
      <button type="submit" className="w-full bg-[#ffcc00] text-black font-black uppercase tracking-[0.2em] text-lg py-5 hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,204,0,0.2)]">
        Submit Dispatch Request
      </button>
      <p className="mt-6 text-xs text-zinc-500 text-center italic font-medium">
        We respect your privacy. Your information is strictly used for estimating purposes.
      </p>
    </form>
  )
}