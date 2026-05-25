import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/investor-roi')({
  component: InvestorRoiPage,
})

function InvestorRoiPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#c8a84b] uppercase tracking-widest">InvestorRoi</h1>
        <p className="mt-4 text-zinc-400">Coming soon.</p>
      </div>
    </main>
  )
}
