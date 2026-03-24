import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, ShieldAlert, Trophy, HardHat, TrendingUp, MapPin, PhoneCall } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-stone-50 text-stone-900 selection:bg-orange-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-2xl tracking-tighter uppercase">
                J. Worden <span className="text-orange-500">& Sons Asphalt Paving</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white font-medium transition-colors">Services</a>
              <a href="#authority" className="text-gray-300 hover:text-white font-medium transition-colors">The Standard</a>
              <a href="#contact" className="text-gray-300 hover:text-white font-medium transition-colors">Contact</a>
              <a href="tel:8044461296" className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-md font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30">
                804-446-1296
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero-video-container pt-20">
        <div className="hero-content px-4 w-full max-w-5xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/50 backdrop-blur-sm">
            <span className="text-orange-400 font-bold tracking-wider text-sm md:text-base uppercase">Richmond's Premier Paving Contractors</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-2xl uppercase leading-tight">
            J. Worden & Sons <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Asphalt Paving</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium mb-10 text-gray-200 drop-shadow-xl max-w-3xl mx-auto border-l-4 border-orange-500 pl-4 py-2 bg-black/20 backdrop-blur-sm text-left">
            The 6-Inch Compacted Stone Standard | Richmond & Beyond
          </p>
          <div className="cta-buttons flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <a href="tel:8044461296" className="btn-911 flex items-center text-xl px-10 py-5 shadow-2xl hover:shadow-orange-500/50 uppercase tracking-wide border border-orange-400">
              <ShieldAlert className="w-6 h-6 mr-3" />
              911 DISPATCH
            </a>
            <a href="#contact" className="btn-outline flex items-center text-xl px-10 py-5 bg-black/60 backdrop-blur-md uppercase tracking-wide hover:shadow-xl hover:shadow-orange-500/20">
              REQUEST AUDIT
            </a>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-4 text-center text-black font-bold text-lg md:text-xl uppercase tracking-widest shadow-inner">
        <div className="flex items-center justify-center space-x-3 max-w-7xl mx-auto px-4">
          <Trophy className="w-6 h-6" />
          <span>4-Time Best of Houzz Winner | Top Contractor Award for Paving Excellence</span>
          <Trophy className="w-6 h-6" />
        </div>
      </div>

      <section id="authority" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-stone-900 mb-6 uppercase tracking-tight">The Structural Standard</h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto mb-8"></div>
            <p className="text-2xl text-stone-600 leading-relaxed font-light">
              We build foundations that outlast the competition. While others cut corners, we demand the <strong className="text-stone-900 font-bold border-b-2 border-orange-500">6-Inch Compacted Stone Base</strong> for structural integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-16">
            <div className="bg-stone-50 border border-stone-200 p-10 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-orange-600 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">Corporate Vetted</h3>
              <p className="text-stone-600 text-lg leading-relaxed">
                Trusted by national brands including <strong>KFC (The Big Chicken), Arby's, Taco Bell, and Winn-Dixie</strong>. Our commercial structural standards are tested daily by heavy traffic.
              </p>
            </div>
            <div className="bg-stone-50 border border-stone-200 p-10 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-black font-bold text-xs py-1 px-3 rounded-bl-lg uppercase tracking-wider">
                Elite Area
              </div>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-orange-600 shadow-inner">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">Grid Dominance</h3>
              <p className="text-stone-600 text-lg leading-relaxed">
                Serving the complete <strong>41-City VA Grid</strong>, including exclusive long-term infrastructure partnerships with Maidstone Village.
              </p>
            </div>
            <div className="bg-stone-50 border border-stone-200 p-10 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-orange-600 shadow-inner">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900">ROI Focused</h3>
              <p className="text-stone-600 text-lg leading-relaxed">
                Our 6-inch standard prevents early structural failure, saving property managers and HOAs tens of thousands in premature replacement costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-stone-900 text-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-orange-500 font-bold tracking-widest uppercase">Our Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6">Full-Spectrum Paving Solutions</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-black border border-stone-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors duration-300">
              <div className="h-48 bg-stone-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-black text-white drop-shadow-md">Commercial Paving</h3>
                  <HardHat className="w-8 h-8 text-orange-500 drop-shadow-md" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-stone-400 text-lg leading-relaxed mb-6">Heavy-duty milling, precision striping, and expansive parking lot construction designed for high traffic volume and maximum durability.</p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Phase Milling & Overlay</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> ADA Compliance Striping</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Heavy Duty Stone Base</li>
                </ul>
              </div>
            </div>

            <div className="group bg-black border border-stone-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors duration-300 relative transform md:-translate-y-4 shadow-2xl shadow-orange-900/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-500 z-10"></div>
              <div className="h-48 bg-stone-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-black text-white drop-shadow-md">Luxury Residential</h3>
                  <div className="bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded uppercase">Houzz #1</div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-stone-400 text-lg leading-relaxed mb-6">Custom driveways, flawless jewelry finish, and professional sealcoating to protect and elevate your estate property value.</p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Belgian Block Borders</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Precision Drainage</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Estate Sealcoating</li>
                </ul>
              </div>
            </div>

            <div className="group bg-black border border-stone-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors duration-300">
              <div className="h-48 bg-stone-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-black text-white drop-shadow-md">Industrial Repair</h3>
                  <ShieldAlert className="w-8 h-8 text-orange-500 drop-shadow-md" />
                </div>
              </div>
              <div className="p-8">
                <p className="text-stone-400 text-lg leading-relaxed mb-6">Advanced hot pour crack filling, pothole patching, and comprehensive long-term industrial maintenance programs.</p>
                <ul className="space-y-3 text-stone-300">
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Hot Pour Crack Fill</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Deep Patching</li>
                  <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0"/> Sinkhole Remediation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-orange-500 text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }}></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">Command Action Today</h2>
          <p className="text-2xl md:text-3xl font-medium mb-12 max-w-3xl mx-auto">
            Upgrade your infrastructure. Secure the 4th-Generation Authority for your next paving project.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="tel:8044461296" className="w-full sm:w-auto flex items-center justify-center bg-black text-white text-2xl px-12 py-6 rounded-md font-black uppercase tracking-wider hover:bg-stone-900 transition-all transform hover:scale-105 shadow-2xl group">
              <PhoneCall className="w-8 h-8 mr-4 group-hover:animate-bounce" />
              CALL 804-446-1296
            </a>
            <a href="https://www.houzz.com/pro/jwordenandsonspaving" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center bg-transparent border-4 border-black text-black text-xl px-12 py-5 rounded-md font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-xl">
              Verify on Houzz
            </a>
          </div>
          <p className="mt-8 font-bold text-lg">Fully Licensed & Insured | Free On-Site Audits</p>
        </div>
      </section>

      <footer className="bg-black py-12 border-t border-stone-800 text-stone-500 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 flex justify-center items-center">
            <span className="text-white font-bold text-2xl tracking-tighter uppercase">
              J. Worden <span className="text-orange-500">& Sons Asphalt Paving</span>
            </span>
          </div>
          <p className="text-lg">&copy; {new Date().getFullYear()} J. Worden & Sons Asphalt Paving. All Rights Reserved.</p>
          <p className="text-sm mt-2 font-medium">Independent 4th-Gen Legacy Since 1984.</p>
          <div className="mt-8 pt-8 border-t border-stone-800/50 flex flex-col md:flex-row justify-center items-center gap-6 text-sm">
            <span>Richmond, VA</span>
            <span className="hidden md:inline">•</span>
            <span>Commercial & Residential</span>
            <span className="hidden md:inline">•</span>
            <span>The 6-Inch Standard</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
