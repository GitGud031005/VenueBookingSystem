import customAxios from '@/utils/custom-axios';

// Review DTOs
export interface Review {
  client_id: string;
  location_id: string;
  stars: number;
  comment: string;
  created_at: string;
  updated_at: string;
  clientName?: string;
  clientAvatar?: string;
  avatarURL?: string;
  locationName?: string;
  city?: string;
  thumbnailURL?: string;
}

export interface CreateReviewDto {
  stars: number;
  comment: string;
}

export interface UpdateReviewDto {
  stars?: number;
  comment?: string;
}

// Rate API functions
export const rateApi = {
  /**
   * Create a review for a location
   */
  createReview: async (
    locationId: string,
    data: CreateReviewDto,
  ): Promise<Review> => {
    const response = await customAxios.post<Review>(
      `/locations/${locationId}/reviews`,
      data,
    );
    return response.data;
  },

  /**
   * Update own review
   */
  updateReview: async (
    locationId: string,
    data: UpdateReviewDto,
  ): Promise<Review> => {
    const response = await customAxios.patch<Review>(
      `/locations/${locationId}/reviews`,
      data,
    );
    return response.data;
  },

  /**
   * Delete own review
   */
  deleteReview: async (locationId: string): Promise<void> => {
    await customAxios.delete(`/locations/${locationId}/reviews`);
  },

  /**
   * Get all reviews for a location
   */
  getLocationReviews: async (locationId: string): Promise<Review[]> => {
    const response = await customAxios.get<Review[]>(
      `/locations/${locationId}/reviews`,
    );
    return response.data;
  },

  /**
   * Get my reviews
   */
  getMyReviews: async (): Promise<Review[]> => {
    const response = await customAxios.get<Review[]>('/reviews/me');
    return response.data;
  },

  /**
   * Check if user has reviewed a location
   */
  hasReviewed: async (locationId: string): Promise<boolean> => {
    try {
      const response = await customAxios.get<boolean>(
        `/locations/${locationId}/reviews/check`,
      );
      return response.data;
    } catch {
      return false;
    }
  },
};
