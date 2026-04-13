import Anthropic from '@anthropic-ai/sdk'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { targetAddress, estimatedSqFt, systemPrompt } = await req.json()

    const apiKey = Netlify.env.get('ANTHROPIC_API_KEY')
    if (!apiKey) {
      return Response.json({ error: 'AI provider not configured.' }, { status: 500 })
    }

    const anthropic = new Anthropic({ apiKey })

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.1,
      system: 'You are the apex AI estimator for an elite national paving syndicate.',
      messages: [{ role: 'user', content: systemPrompt }],
    })

    const first = response.content?.[0]
    const aiProposal = first?.type === 'text' ? first.text : 'Error'

    return Response.json({
      success: true,
      targetAddress,
      estimatedSqFt,
      aiProposal,
    })
  } catch (error) {
    console.error('[ENCLAVE ERROR]', error)
    return Response.json({ error: 'Sovereign Swarm Failure' }, { status: 500 })
  }
}
