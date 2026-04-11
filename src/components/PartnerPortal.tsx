import { useState } from 'react';
import { pushToKickserv } from '@/utils/jwordenLogic';

export default function PartnerPortal() {
  const [dispatchMessage, setDispatchMessage] = useState<string | null>(null);

  function handleViewJobs() {
    const dummyLead = {
      zip: '21811',
      service: 'sealcoating',
      isCommercial: false,
    };
    const priority = pushToKickserv(dummyLead);
    setDispatchMessage(`Kickserv Dispatch Priority: ${priority}`);
  }

  return (
    <section className="bg-[#111111] p-8 rounded-lg mt-10 border border-gray-800">
      <h3 className="text-[#ffcc00] text-xl font-bold uppercase tracking-widest">
        Crew Command: Partner Portal
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Managing the Worden-Standard across 50 states.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black p-4 rounded border-l-4 border-[#ffcc00]">
          <h4 className="text-white font-semibold">Credential Vault</h4>
          <p className="text-xs text-gray-500 mb-2">
            Automated COI & Class A/B Verification
          </p>
          <button className="text-xs bg-gray-800 text-white p-2 rounded w-full">
            UPLOAD CURRENT DOCS
          </button>
        </div>

        <div className="bg-black p-4 rounded border-l-4 border-[#ffcc00]">
          <h4 className="text-white font-semibold">Active Dispatch</h4>
          <p className="text-xs text-gray-500 mb-2">
            Syncing with Kickserv Lead-Pipe
          </p>
          <button
            onClick={handleViewJobs}
            className="text-xs bg-[#ffcc00] text-black font-bold p-2 rounded w-full"
          >
            VIEW AVAILABLE JOBS
          </button>
          {dispatchMessage && (
            <p className="mt-2 text-xs text-[#ffcc00] font-semibold">{dispatchMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
