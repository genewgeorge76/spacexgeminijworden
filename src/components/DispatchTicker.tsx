import { useState, useEffect } from 'react';

const cities = [
  'Midlothian', 'Glen Allen', 'Chesterfield', 'Richmond', 'Mechanicsville',
  'Powhatan', 'Chester', 'Henrico', 'Short Pump', 'Bon Air',
  'Moseley', 'Goochland', 'Hanover', 'Ashland', 'Lakeside',
  'Tuckahoe', 'Sandston', 'Petersburg', 'Colonial Heights', 'Hopewell',
  'Prince George', 'Dinwiddie', 'Sussex', 'Amelia', 'Cumberland',
  'Fluvanna', 'Louisa', 'Orange', 'Culpeper', 'Warrenton',
  'Stafford', 'Spotsylvania', 'Fredericksburg', 'King George', 'Caroline',
  'King William', 'New Kent', 'Charles City', 'Prince William', 'Williamsburg',
  'Norfolk',
];

function getSlots() {
  return (Math.floor(Date.now() / 60000) % 3) + 1;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function DispatchTicker() {
  const [cityIndex, setCityIndex] = useState(0);
  const [slots, setSlots] = useState(getSlots());
  const today = formatDate(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((i) => (i + 1) % cities.length);
      setSlots(getSlots());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#ffcc00] text-black py-2 px-4 text-center z-[60] relative">
      <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.15em] leading-tight">
        <span className="inline-block animate-pulse mr-2">●</span>
        Now dispatching estimators to{' '}
        <span className="underline underline-offset-2">{cities[cityIndex]}</span>
        {' '}—{' '}
        <span className="font-black">{slots} Priority Slot{slots > 1 ? 's' : ''}</span>
        {' '}remaining for {today}
        <a
          href="https://app.kickserv.com/jwordenandsonspaving/self_service/requests/new"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 inline-block bg-black text-[#ffcc00] px-3 py-0.5 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          Claim Slot →
        </a>
      </p>
    </div>
  );
}
