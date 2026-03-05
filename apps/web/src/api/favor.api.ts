import customAxios from '@/utils/custom-axios';

// Favor DTOs
export interface Favor {
  client_id: string;
  location_id: string;
  created_at: string;
}

// Favor API functions
export const favorApi = {
  /**
   * Get user's favorite locations
   */
  getMyFavorites: async (): Promise<string[]> => {
    const response = await customAxios.get<string[]>('/favors');
    return response.data;
  },

  /**
   * Add location to favorites
   */
  addFavorite: async (locationId: string): Promise<void> => {
    await customAxios.post('/favors', { location_id: locationId });
  },

  /**
   * Remove location from favorites
   */
  removeFavorite: async (locationId: string): Promise<void> => {
    await customAxios.delete(`/favors/${locationId}`);
  },

  /**
   * Check if location is favorited
   */
  isFavorite: async (locationId: string): Promise<boolean> => {
    try {
      const response = await customAxios.get<boolean>(
        `/favors/${locationId}/check`,
      );
      return response.data;
    } catch {
      return false;
    }
  },
};
