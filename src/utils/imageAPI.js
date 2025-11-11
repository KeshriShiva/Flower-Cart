// Simple image API that returns placeholder images or uses the provided name to create a placeholder.
export const imageAPI = {
  getPlantImage: async (plantName) => {
    if (!plantName) return null;
    // Use picsum.photos with seed so each plant name gets a consistent image
    return `https://picsum.photos/seed/${encodeURIComponent(plantName)}/600/400`;
  },

  getBatchPlantImages: async (plantNames) => {
    const result = {};
    (plantNames || []).forEach(name => {
      result[name] = `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`;
    });
    return result;
  }
};
