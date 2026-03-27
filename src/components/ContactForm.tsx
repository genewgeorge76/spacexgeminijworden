export default function ContactForm() {
  return (
    <form 
      className="max-w-2xl mx-auto bg-white p-8 rounded-sm border border-[#e8e8e0] text-left shadow-sm font-sans" 
      action="https://formspree.io/f/j.wordenandsonspaving@gmail.com" 
      method="POST"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-[#888] mb-2">Full Name</label>
          <input type="text" id="name" name="name" className="w-full border border-[#e8e8e0] p-3 rounded-sm focus:border-[#c8a84b] outline-none transition-colors" required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-[#888] mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="w-full border border-[#e8e8e0] p-3 rounded-sm focus:border-[#c8a84b] outline-none transition-colors" required />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#888] mb-2">Email Address</label>
        <input type="email" id="email" name="email" className="w-full border border-[#e8e8e0] p-3 rounded-sm focus:border-[#c8a84b] outline-none transition-colors" required />
      </div>
      <div className="mb-6">
        <label htmlFor="service" className="block text-xs font-bold uppercase tracking-widest text-[#888] mb-2">Service Needed</label>
        <select id="service" name="service" className="w-full border border-[#e8e8e0] p-3 rounded-sm focus:border-[#c8a84b] outline-none transition-colors appearance-none bg-white">
          <option>Commercial Paving</option>
          <option>Residential Driveway</option>
          <option>Sealcoating & Repair</option>
          <option>Other / Not Sure</option>
        </select>
      </div>
      <div className="mb-8">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-[#888] mb-2">Project Details</label>
        <textarea id="message" name="message" rows={4} className="w-full border border-[#e8e8e0] p-3 rounded-sm focus:border-[#c8a84b] outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
      </div>
      <button type="submit" className="w-full bg-[#111] text-[#c8a84b] font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#2b2b2b] transition-colors border-2 border-[#c8a84b]">
        Submit Request
      </button>
      <p className="mt-4 text-[0.7rem] text-[#888] text-center italic">
        We respect your privacy. Your information is only used to provide your estimate.
      </p>
    </form>
  )
}
