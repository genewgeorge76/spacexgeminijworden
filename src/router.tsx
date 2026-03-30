import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // 1. Import the Footer
// ... your other imports

// 2. Create a Layout component
const RootLayout = () => (
  <>
    <Header />
    <main>
      <Outlet /> {/* This is where all your 41+ city pages show up */}
    </main>
    <Footer /> {/* 3. This forces the footer onto every page */}
  </>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // 4. Use the Layout here
    children: [
      { index: true, element: <HomePage /> },
      { path: 'locations/richmond', element: <Richmond /> },
      { path: 'locations/chester', element: <Chester /> },
      // ... all your other city routes
    ]
  }
]);
