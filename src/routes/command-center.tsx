import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/command-center')({
  component: CommandCenterPage,
})

function CommandCenterPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#c8a84b] uppercase tracking-widest">CommandCenter</h1>
        <p className="mt-4 text-zinc-400">Coming soon.</p>
      </div>
    </main>
  )
}
