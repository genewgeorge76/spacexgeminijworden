export const sovereignTheme = {
  colors: {
    background: "#0A0A0B", // Midnight Obsidian
    surface: "#161618", // Elevated Asphalt
    accent: "#D4AF37", // Burnished Gold (Metallic)
    accentHover: "#F9E076", // Molten Spark
    text: "#F2F2F2", // High-Contrast Smoke
    muted: "#636366", // Industrial Slate
    success: "#30D158", // Safety Green
    warning: "#FF9F0A", // Warning Amber
  },
  textures: {
    asphalt: "url('/assets/asphalt-grain-subtle.png')",
    overlay:
      "linear-gradient(180deg, rgba(10,10,11,0) 0%, rgba(10,10,11,0.8) 100%)",
  },
  animations: {
    reveal: "cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
    glow: "0 0 20px rgba(212, 175, 55, 0.4)",
  },
  glassmorphism: {
    background: "rgba(22, 22, 24, 0.7)",
    blur: "20px",
    border: "1px solid rgba(212, 175, 55, 0.2)",
  },
};
