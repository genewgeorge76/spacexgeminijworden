import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <main className="font-['Helvetica_Neue',_Arial,_sans-serif] text-[#333] leading-[1.6]">
      <header 
        className="bg-cover bg-center text-white py-[100px] px-[5%] text-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517646272486-a2c993c5d5bf?q=80&w=1200')` }}
      >
        <h1 className="text-[3rem] m-0 mb-4 font-bold">Professional Paving & Sealcoating</h1>
        <p className="text-xl">Quality Workmanship in Richmond Since 1980</p>
      </header>

      <section className="py-[80px] px-[5%] bg-[#f8f9fa] text-center">
        <div className="bg-white p-[40px] rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-w-[700px] mx-auto border-t-[6px] border-[#f0ad4e]">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-6 text-lg">We've partnered with <strong>Kickserv</strong> to provide you with fast, digital estimates. Click below to fill out your project details.</p>
          <a 
            href="https://app.kickserv.com/request_estimate/j-worden-sons" 
            className="bg-[#f0ad4e] text-[#1a1a1a] py-[18px] px-[35px] no-underline rounded-[5px] font-bold text-[1.2rem] inline-block mt-[20px] transition-all hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(240,173,78,0.4)]"
          >
            Request Your Free Estimate
          </a>
        </div>
      </section>
    </main>
  ),
})
