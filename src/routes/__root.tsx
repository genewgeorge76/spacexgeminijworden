import { Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import '../styles.css' // <--- THIS LINE MUST BE HERE

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Scripts />
    </>
  )
}
