import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
})
