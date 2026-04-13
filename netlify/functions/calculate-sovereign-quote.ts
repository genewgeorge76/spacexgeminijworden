type SovereignQuoteRequest = {
  sqFt?: number;
  depth?: number;
};

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // Retell AI passes the Square Footage and Depth the caller mentioned.
    const { sqFt, depth } = (await req.json()) as SovereignQuoteRequest;
    const squareFeet = Number(sqFt);

    if (!Number.isFinite(squareFeet) || squareFeet <= 0) {
      return Response.json({ error: 'Invalid sqFt value' }, { status: 400 });
    }

    // The math: (SqFt * Depth * 12.75) / 2000 = Tonnage.
    const parsedDepth = Number(depth);
    const actualDepth = Number.isFinite(parsedDepth) && parsedDepth > 0 ? parsedDepth : 2;
    const tonnage = (squareFeet * actualDepth * 12.75) / 2000;

    // "Whale" threshold logic.
    const isWhale = tonnage > 1500;
    const pricePerTon = isWhale ? 119.75 : 145.0;
    const totalCost = tonnage * pricePerTon;

    console.log(`[VOICE AI] Calculated ${tonnage} Tons. Whale Status: ${isWhale}. Cost: $${totalCost}`);

    return Response.json({
      tonnage: Math.ceil(tonnage),
      isWhale,
      totalCost: totalCost.toFixed(2),
      agentInstructions: isWhale
        ? 'Offer the Sovereign Legacy Rate of $119.75/ton for a 48-hour lock.'
        : 'Quote standard 96% Marshall Density pricing.',
    });
  } catch {
    return Response.json({ error: 'Foreman Logic Failure' }, { status: 500 });
  }
};
