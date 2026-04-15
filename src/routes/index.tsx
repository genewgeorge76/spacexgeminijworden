import { createFileRoute } from '@tanstack/react-router'
import HeaderNav from '@/components/HeaderNav'
import { PremiumLocationView } from '@/components/public/PremiumLocationView'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      <HeaderNav isOpen={false} onClose={() => {}} />
      <main className="flex-grow">
        <PremiumLocationView />
      </main>
    </div>
  )
}
