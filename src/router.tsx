import { createBrowserRouter, Outlet } from 'react-router-dom';

// 1. Global Components
import Header from './components/Header';
import Footer from './components/Footer';

// 2. Main Pages 


// 3. Premium Location Imports 
// Core & High-Value
import ChesterLocation from './routes/locations/chester';
import RichmondLocation from './routes/locations/richmond';
import MidlothianLocation from './routes/locations/midlothian';
import TuckahoeLocation from './routes/locations/tuckahoe';
import ShortPumpLocation from './routes/locations/short-pump';
import HenricoLocation from './routes/locations/henrico';
import ChesterfieldLocation from './routes/locations/chesterfield';

// Tri-Cities

import HopewellLocation from './routes/locations/hopewell';
import ColonialHeightsLocation from './routes/locations/colonial-heights';

// Expansion & Coastal
import VirginiaBeachLocation from './routes/locations/virginia-beach';
import NorfolkLocation from './routes/locations/norfolk';
import ChesapeakeLocation from './routes/locations/chesapeake';
import SuffolkLocation from './routes/locations/suffolk';
import PortsmouthLocation from './routes/locations/portsmouth';
import HamptonLocation from './routes/locations/hampton';
import NewportNewsLocation from './routes/locations/newport-news';
import WilliamsburgLocation from './routes/locations/williamsburg';
import NewKentLocation from './routes/locations/new-kent';

// I-95 North Corridor
import StaffordLocation from './routes/locations/stafford';
import SpotsylvaniaLocation from './routes/locations/spotsylvania';
import FredericksburgLocation from './routes/locations/fredericksburg';

// 4. The Master Layout (Forces Header & Footer on every page)
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

// 5. The Router Configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      { index: true, element: <HomePage /> }, 

      // --- LOCATION ROUTES ---
      
      // Core & High-Value
      { path: 'locations/chester', element: <ChesterLocation /> },
      { path: 'locations/richmond', element: <RichmondLocation /> },
      { path: 'locations/midlothian', element: <MidlothianLocation /> },
      { path: 'locations/tuckahoe', element: <TuckahoeLocation /> },
      { path: 'locations/short-pump', element: <ShortPumpLocation /> },
      { path: 'locations/henrico', element: <HenricoLocation /> },
      { path: 'locations/chesterfield', element: <ChesterfieldLocation /> },

      // Tri-Cities
      { path: 'locations/petersburg', element: <PetersburgLocation /> },
      { path: 'locations/hopewell', element: <HopewellLocation /> },
      { path: 'locations/colonial-heights', element: <ColonialHeightsLocation /> },

      // Expansion & Coastal
      { path: 'locations/virginia-beach', element: <VirginiaBeachLocation /> },
      { path: 'locations/norfolk', element: <NorfolkLocation /> },
      { path: 'locations/chesapeake', element: <ChesapeakeLocation /> },
      { path: 'locations/suffolk', element: <SuffolkLocation /> },
      { path: 'locations/portsmouth', element: <PortsmouthLocation /> },
      { path: 'locations/hampton', element: <HamptonLocation /> },
      { path: 'locations/newport-news', element: <NewportNewsLocation /> },
      { path: 'locations/williamsburg', element: <WilliamsburgLocation /> },
      { path: 'locations/new-kent', element: <NewKentLocation /> },

      // I-95 North Corridor
      { path: 'locations/stafford', element: <StaffordLocation /> },
      { path: 'locations/spotsylvania', element: <SpotsylvaniaLocation /> },
      { path: 'locations/fredericksburg', element: <FredericksburgLocation /> },
    ]
  }
]);
