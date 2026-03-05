import customAxios from '@/utils/custom-axios';

// VenueType DTOs based on venue_types table
export interface VenueType {
  venueType_id: string;
  name: string;
  description?: string;
  minCapacity: number;
  maxCapacity: number;
  createdAt: string;
  updatedAt: string;
  // Extended fields
  venueCount?: number;
}

export interface CreateVenueTypeDto {
  name: string;
  description?: string;
  minCapacity: number;
  maxCapacity: number;
}

export type UpdateVenueTypeDto = Partial<CreateVenueTypeDto>;

// Venue Type API functions
export const venueTypeApi = {
  /**
   * Get all venue types
   */
  getAllVenueTypes: async (): Promise<VenueType[]> => {
    const response = await customAxios.get<VenueType[]>('/admin/venue-types');
    return response.data;
  },

  /**
   * Get venue type by ID
   */
  getVenueTypeById: async (venueTypeId: string): Promise<VenueType> => {
    const response = await customAxios.get<VenueType>(
      `/admin/venue-types/${venueTypeId}`,
    );
    return response.data;
  },

  /**
   * Create new venue type
   */
  createVenueType: async (data: CreateVenueTypeDto): Promise<VenueType> => {
    const response = await customAxios.post<VenueType>('/venue/types', data);
    return response.data;
  },

  /**
   * Update venue type
   */
  updateVenueType: async (
    venueTypeId: string,
    data: UpdateVenueTypeDto,
  ): Promise<VenueType> => {
    const response = await customAxios.patch<VenueType>(
      `/admin/venue-types/${venueTypeId}`,
      data,
    );
    return response.data;
  },

  /**
   * Delete venue type
   */
  deleteVenueType: async (venueTypeId: string): Promise<void> => {
    await customAxios.delete(`/admin/venue-types/${venueTypeId}`);
  },
};
