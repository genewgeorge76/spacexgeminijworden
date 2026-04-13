export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { address } = await req.json()

    return Response.json({
      target: address,
      status: 'ORBITAL_LOCK_ACQUIRED',
      simulatedSqFt: Math.floor(Math.random() * (80000 - 20000 + 1) + 20000),
      message: 'Ready for live Google API integration.',
    })
  } catch {
    return Response.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
