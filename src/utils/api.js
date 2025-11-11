import * as sample from './sampleData';

// Local (mock) plants API that mimics the backend shape used by the frontend.
export const plantsAPI = {
  // Returns a promise that resolves to an object similar to axios response
  getAllPlants: async (params = {}) => {
    const result = sample.getAll(params);
    return {
      data: {
        success: true,
        data: result.data,
        pagination: result.pagination
      }
    };
  },

  getPlantById: async (id) => {
    const plant = sample.getById(id);
    if (plant) {
      return { data: { success: true, data: plant } };
    }
    return { data: { success: false, message: 'Plant not found' } };
  },

  addPlant: async (plantData) => {
    const created = sample.add(plantData);
    return { data: { success: true, data: created } };
  },

  updatePlant: async (id, plantData) => {
    // very small local update: find and replace
    const existing = sample.getById(id);
    if (!existing) return { data: { success: false, message: 'Not found' } };
    Object.assign(existing, plantData);
    return { data: { success: true, data: existing } };
  },

  deletePlant: async (id) => {
    // not implemented for sample
    return { data: { success: true } };
  },

  getCategories: async () => {
    const cats = sample.getCategories();
    return { data: { data: cats } };
  },

  searchPlants: async (query, filters = {}) => {
    const params = { search: query, ...filters };
    return plantsAPI.getAllPlants(params);
  },

  getPlantsByCategory: async (category, additionalParams = {}) => {
    const params = { category, ...additionalParams };
    return plantsAPI.getAllPlants(params);
  },

  getPlantsByAvailability: async (availability, additionalParams = {}) => {
    const params = { availability, ...additionalParams };
    return plantsAPI.getAllPlants(params);
  }
};

export const healthAPI = {
  check: async () => ({ data: { status: 'ok' } })
};

export default plantsAPI;
