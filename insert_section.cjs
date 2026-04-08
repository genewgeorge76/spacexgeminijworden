const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/routes/index.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const insertionPoint = "      {/* Location Focus Section */}";
const newSection = `
      {/* Expertise & Recognition Section */}
      <section className="py-24 px-6 lg:px-12 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              National-Grade Excellence <span className="text-[#ffcc00]">in Every Category</span>
            </h2>
            <div className="w-24 h-1 bg-[#ffcc00] mx-auto mt-6 mb-12"></div>
            
            {/* The Voted Best Callout */}
            <div className="inline-block bg-[#ffcc00] text-black px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(255,204,0,0.3)] border-2 border-white transform hover:scale-105 transition-transform">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider">
                🏆 Voted Best Asphalt Paving Company — Richmond, VA
              </span>
            </div>
          </div>
          
          {/* The Big 4 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { title: 'PAVING', icon: '🛣️' },
              { title: 'SEALCOATING', icon: '🛡️' },
              { title: 'STRIPING', icon: '📏' },
              { title: 'REPAIR', icon: '🔧' }
            ].map((service, index) => (
              <div key={index} className="flex flex-col items-center group bg-zinc-900 border border-zinc-800 p-8 rounded-xl hover:border-[#ffcc00]/50 transition-all shadow-xl hover:shadow-[#ffcc00]/10">
                <div className="w-20 h-20 bg-black border-2 border-[#ffcc00] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,204,0,0.2)] text-3xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-wide">{service.title}</h3>
                <div className="bg-black/60 border border-zinc-800 px-4 py-3 rounded-lg w-full text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-[#ffcc00] text-lg">★</span>
                    <span className="text-[#ffcc00] text-lg">★</span>
                    <span className="text-[#ffcc00] text-lg">★</span>
                    <span className="text-[#ffcc00] text-lg">★</span>
                    <span className="text-[#ffcc00] text-lg">★</span>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-tight block">
                    Pavement Top 75<br />National Excellence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

`;

if (!content.includes('Expertise & Recognition Section')) {
  content = content.replace(insertionPoint, newSection + insertionPoint);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Section inserted');
} else {
  console.log('Section already exists');
}
