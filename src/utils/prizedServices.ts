/**
 * JWORDENAI Prized Service Database
 * High-margin services prioritized in the Kickserv 'Elite' pipeline.
 */
export const prizedServices: Record<string, { margin: string; tag: string; visualProof: string }> = {
  grading: { margin: "Elite", tag: "GC-Standard", visualProof: "Heavy Equipment / Base Prep" },
  striping: { margin: "High", tag: "Commercial-Finish", visualProof: "Precision Markings" },
  milling: { margin: "Elite", tag: "Asphalt-Removal", visualProof: "Milling Machine Operations" },
  sealcoating: { margin: "High", tag: "Recurring-Revenue", visualProof: "Fresh Sealcoat Finish" },
  patching: { margin: "Medium-High", tag: "Repair-Priority", visualProof: "Infrared / Sawcut Patching" },
  "chip and tar": { margin: "High", tag: "Rural-Specialty", visualProof: "Tar and Chip Driveway" },
};
