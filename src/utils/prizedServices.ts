/**
 * JWORDENAI Prized Service Expansion
 * Added: Thermoplastic Striping, Heavy-Duty Grading, Milling, Sealcoating, Patching, Chip and Tar
 */
export const prizedServices: Record<string, { margin: string; tag: string; visualProof: string }> = {
  grading: {
    margin: "Elite",
    tag: "GC-Standard",
    visualProof: "Heavy Equipment / Base Prep",
  },
  striping: {
    margin: "High",
    tag: "Commercial-Finish",
    visualProof: "Precision Markings",
  },
  milling: {
    margin: "Elite",
    tag: "Heavy-Highway",
    visualProof: "Milling Machine / Subbase Exposure",
  },
  sealcoating: {
    margin: "High-Volume",
    tag: "Recurring-Revenue",
    visualProof: "Fresh Blacktop Sealer",
  },
  patching: {
    margin: "High",
    tag: "Urgent-Repair",
    visualProof: "Infrared Patch / Cut & Replace",
  },
  "chip and tar": {
    margin: "Elite",
    tag: "Rural-Estate",
    visualProof: "Tar & Chip Surface / Country Road",
  },
};
