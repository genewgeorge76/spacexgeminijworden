import { createFileRoute } from '@tanstack/react-router';
import { Download, FileText, Shield, ClipboardList } from 'lucide-react';

export const Route = createFileRoute('/portal')({
  component: DeveloperPortal,
});

const documents = [
  {
    icon: Shield,
    title: 'Insurance Certificate',
    description: 'Current Certificate of Insurance — General Liability & Workers Compensation.',
    href: 'https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co',
    badge: 'COI 2026',
  },
  {
    icon: FileText,
    title: 'W-9 Tax Form',
    description: 'Signed W-9 for vendor onboarding and accounts payable processing.',
    href: 'https://www.irs.gov/pub/irs-pdf/fw9.pdf',
    badge: 'IRS Form',
  },
  {
    icon: ClipboardList,
    title: 'KFC Responsibility Matrix',
    description: 'Official GC responsibility matrix used for the Big Chicken landmark remodel.',
    href: 'https://www.dropbox.com/scl/fi/698i3dtphbwfr6egjcppd/KFC-Responsibility-Matrix-GC-2.13.2018.xlsx?rlkey=byqlj2dnggo10zsjnllvau8co',
    badge: 'GC Verified',
  },
  {
    icon: FileText,
    title: 'Phase I Environmental Assessment',
    description: 'Phase I Environmental Site Assessment for the Jennings, LA QSR project.',
    href: 'https://www.dropbox.com/scl/fi/qifo13kbofo8tda0oooqb/3380.17-Phase-I-Vacant-land-1424-Elton-Street-Jennings-LA.PDF?rlkey=if2imh89dy4983nwzu5220yo0',
    badge: 'Phase I',
  },
];

function DeveloperPortal() {
  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-white selection:bg-[#ffcc00] selection:text-black pt-36 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* PORTAL HEADER */}
        <div className="border-b-2 border-zinc-900 pb-16 mb-16">
          <span className="inline-block text-[#ffcc00] font-black uppercase tracking-[0.3em] text-sm mb-4 bg-white/5 px-4 py-2 rounded-sm border border-[#ffcc00]/20">
            Developer-Only Access
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-6 speakable">
            GC <span className="text-[#ffcc00]">Developer Portal</span>
          </h1>
          <p className="text-2xl text-zinc-400 font-bold italic border-l-8 border-[#ffcc00] pl-8 max-w-3xl">
            One-click access to "Project Ready" documents. Designed for General Contractors, developers, and commercial project managers.
          </p>
        </div>

        {/* DOCUMENT DOWNLOADS */}
        <section className="mb-24">
          <h2 className="text-3xl font-black uppercase text-white mb-10 tracking-tight">
            Project Ready <span className="text-[#ffcc00]">Documents</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div key={doc.title} className="group bg-zinc-900 border-2 border-zinc-800 hover:border-[#ffcc00]/60 rounded-2xl p-8 transition-all duration-300 flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-xl p-3 group-hover:bg-[#ffcc00]/20 transition-colors">
                        <Icon className="w-6 h-6 text-[#ffcc00]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase text-white tracking-tight">{doc.title}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{doc.badge}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{doc.description}</p>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-black text-[#ffcc00] border-2 border-[#ffcc00] py-4 font-black uppercase tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all mt-auto"
                  >
                    <Download className="w-4 h-4" />
                    Download / View
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* DEVELOPER-ONLY EXPEDITED DISPATCH FORM */}
        <section className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-10 md:p-14">
          <div className="mb-10">
            <h2 className="text-4xl font-black uppercase text-white tracking-tight mb-3">
              Expedited <span className="text-[#ffcc00]">Dispatch Request</span>
            </h2>
            <p className="text-zinc-400 font-medium text-lg">
              Commercial developers and GCs receive priority scheduling. Use this form to fast-track your project.
            </p>
          </div>

          <form
            action="https://formspree.io/f/xjwordensonspaving"
            method="POST"
            className="space-y-8"
          >
            <input type="hidden" name="_subject" value="GC Portal — Expedited Commercial Dispatch Request" />
            <input type="hidden" name="source" value="GC Developer Portal - Kickserv Priority" />
            <input type="hidden" name="priority" value="COMMERCIAL-EXPEDITED" />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="gc-name" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Company / GC Name</label>
                <input type="text" id="gc-name" name="company" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" placeholder="ABC General Contractors" required />
              </div>
              <div>
                <label htmlFor="gc-contact" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Contact Name</label>
                <input type="text" id="gc-contact" name="contact" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" placeholder="Project Manager Name" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="gc-phone" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Direct Phone</label>
                <input type="tel" id="gc-phone" name="phone" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" placeholder="(804) 000-0000" required />
              </div>
              <div>
                <label htmlFor="gc-email" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Business Email</label>
                <input type="email" id="gc-email" name="email" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" placeholder="pm@yourcompany.com" required />
              </div>
            </div>

            <div>
              <label htmlFor="gc-address" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Site Address</label>
              <input type="text" id="gc-address" name="address" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" placeholder="123 Commercial Blvd, Richmond, VA" required />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="gc-scope" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Scope of Work</label>
                <select id="gc-scope" name="scope" className="w-full bg-black border border-zinc-800 text-[#ffcc00] p-4 focus:border-[#ffcc00] outline-none transition-colors appearance-none font-black uppercase text-sm">
                  <option>Full Lot Repave (Commercial)</option>
                  <option>QSR Fast-Track Site Prep</option>
                  <option>ADA Compliance & Striping</option>
                  <option>Industrial Heavy-Duty Paving</option>
                  <option>Emergency Patch & Repair</option>
                </select>
              </div>
              <div>
                <label htmlFor="gc-deadline" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Deadline</label>
                <input type="date" id="gc-deadline" name="deadline" className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-bold" />
              </div>
            </div>

            <div>
              <label htmlFor="gc-notes" className="block text-xs font-black uppercase tracking-widest text-[#ffcc00] mb-3">Project Notes / Special Requirements</label>
              <textarea id="gc-notes" name="notes" rows={4} className="w-full bg-black border border-zinc-800 text-white p-4 focus:border-[#ffcc00] outline-none transition-colors font-medium" placeholder="Scope details, franchise requirements, ADA specs, timeline constraints..."></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="flex-1 bg-[#ffcc00] text-black font-black uppercase tracking-tighter text-xl py-5 hover:bg-white transition-all border-b-8 border-black/20 shadow-[0_10px_40px_rgba(255,204,0,0.3)]">
                Submit Priority Dispatch
              </button>
              <a
                href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-transparent text-[#ffcc00] border-2 border-[#ffcc00] font-black uppercase tracking-tighter text-xl py-5 hover:bg-[#ffcc00] hover:text-black transition-all"
              >
                Direct Kickserv Portal →
              </a>
            </div>

            <p className="text-xs text-zinc-600 text-center font-bold uppercase tracking-widest">
              Commercial projects receive response within 2 business hours • Authorized Kickserv® Dispatch
            </p>
          </form>
        </section>

      </div>
    </main>
  );
}
