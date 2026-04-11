import Anthropic from '@anthropic-ai/sdk';

// --- THE YIELD-MASTER CONSTANTS ---
const ASPHALT_DENSITY = 115; // lbs per square yard per inch
const STONE_BASE_DENSITY = 150; // lbs per cubic foot
const STONE_BASE_COST_PER_TON = 28.50;
const ASPHALT_COST_PER_TON = 85.00;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { address, sqft, soilType, region, projectType } = JSON.parse(event.body);

    // --- 1. THE SOIL-TRUTH HANDSHAKE (Geotechnical Override) ---
    let surfaceDepth = 2; // Standard Residential Surface
    let baseDepth = 4;    // Standard Stone Base
    let engineeringNote = "Standard 4th-Generation Compaction Specs applied.";

    const regionLower = region ? region.toLowerCase() : '';

    // Chicago / Illinois Frost-Heave Spec Override
    if (regionLower && (regionLower.includes('chicago') || regionLower.includes('il') || regionLower.includes('illinois'))) {
      surfaceDepth = 3; // Frost-Heave Heavy Duty Surface
      baseDepth = 8;    // Deep Freeze Sub-Base
      engineeringNote = "CRITICAL OVERRIDE: Illinois Frost-Heave Specification applied. Upgraded to 3-inch Heavy Duty Surface and 8-inch Stone Base to prevent thermal cracking and sub-grade failure during deep freeze cycles.";
    }
    // Richmond / Kansas City Clay Spec Override
    else if ((soilType && soilType.toLowerCase() === 'clay') || (regionLower && (regionLower.includes('23221') || regionLower.includes('kansas')))) {
      baseDepth = 6;    // Worden Clay Stabilization
      engineeringNote = "CRITICAL OVERRIDE: High-Plasticity Clay Stabilization applied. Upgraded to 6-inch Stone Base to prevent moisture-induced sub-grade pumping and load failure.";
    }

    // Commercial Spec Override (Always overrides residential depth)
    if (projectType && projectType.toLowerCase() === 'commercial') {
      if (surfaceDepth < 3) surfaceDepth = 3;
      if (baseDepth < 6) baseDepth = 6;
    }

    // --- 2. THE YIELD-MASTER HANDSHAKE (Asphalt Math) ---
    const asphaltTons = (sqft * surfaceDepth * ASPHALT_DENSITY) / 2000;
    const stoneTons = (sqft * (baseDepth / 12) * STONE_BASE_DENSITY) / 2000;

    const totalMaterialsCost = (asphaltTons * ASPHALT_COST_PER_TON) + (stoneTons * STONE_BASE_COST_PER_TON);
    const estimatedLaborAndEquip = totalMaterialsCost * 1.5; // Basic markup logic
    const totalProjectedPrice = totalMaterialsCost + estimatedLaborAndEquip;

    // --- 3. THE PROPOSAL-GENERATOR HANDSHAKE (The Closing Bot) ---
    const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

    const systemPrompt = `You are the Chief Estimator for J. Worden & Sons Paving (a 4th-generation, Class A Virginia Licensed contractor operating nationwide). 
    Your goal is to write a highly professional, aggressive, and authoritative construction proposal that justifies our premium pricing.
    
    CRITICAL INSTRUCTIONS:
    1. Tone: Authoritative, uncompromising on quality, speaking directly to facility managers, GCs, or property owners.
    2. Engineering Justification: You MUST explain why the specific depths chosen are necessary for their region/soil to prevent failure. If an override was applied, explain why the "cheap guy's 2-inch bid" will fail in 3 years.
    3. Proof of Performance: You MUST embed our enterprise case studies as proof of capability: Mention our 2017 $2.2M KFC "Big Chicken" Remodel Repave and our continuous work for Taco Bell and Arby's.
    4. Format the output in clean Markdown with clear headings (e.g., Executive Summary, Engineering Specifications, Enterprise Proof, Investment).`;

    const userPrompt = `Generate a formal bid for: ${address}. 
    - Area: ${sqft} sq. ft.
    - Project Type: ${projectType || 'Standard'}
    - Region: ${region || 'Unknown'}
    - Soil Type: ${soilType || 'Standard'}
    
    Worden Node Calculated Specs:
    - Surface Asphalt Depth: ${surfaceDepth} inches (${asphaltTons.toFixed(2)} Tons required)
    - Structural Stone Base Depth: ${baseDepth} inches (${stoneTons.toFixed(2)} Tons required)
    - Engineering Note: ${engineeringNote}
    
    Total Estimated Investment: $${totalProjectedPrice.toFixed(2)}
    
    Write the complete proposal now.`;

    const response = await anthropic.messages.create({
      model: "claude-3-7-sonnet-latest",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }]
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        specs: {
          surfaceDepth,
          baseDepth,
          asphaltTons: asphaltTons.toFixed(2),
          stoneTons: stoneTons.toFixed(2),
          engineeringNote,
          totalProjectedPrice: totalProjectedPrice.toFixed(2)
        },
        proposalMarkdown: response.content[0].text
      })
    };

  } catch (error) {
    console.error("Worden Brain Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Worden Brain Neural Misfire", details: error.message })
    };
  }
};
