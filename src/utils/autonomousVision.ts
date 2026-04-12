const ZIP_TO_FOLDER_MAP: Readonly<Record<string, string>> = {
  "29920": "BEAUFORT",
  "29928": "HHI",
  "23221": "RICHMOND"
};

export const autonomousVision = {
  matchZipToFolder: (zipCode: string) => {
    return ZIP_TO_FOLDER_MAP[zipCode] || "REGIONAL";
  },
  serveLocalEvidence: function(leadZip: string) {
    const targetFolder = autonomousVision.matchZipToFolder(leadZip);
    return {
      folder: targetFolder,
      message: `Loading verified ${targetFolder} projects for your estimate...`,
      images: [`/assets/geo/${targetFolder}/sample-1.jpg`] // Placeholder
    };
  }
};
