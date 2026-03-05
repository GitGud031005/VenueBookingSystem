import customAxios from '@/utils/custom-axios';

// Amenity DTOs
export interface Amenity {
  amenity_name: string;
  category: string;
  description: string;
  price: number;
  createdAt: string;
  isActive: boolean;
}

export interface AmenityResponse {
  data: Amenity[];
}

export interface CreateAmenityDto {
  locationId: string;
  name: string;
  category: string;
  description: string;
  price: number;
}

export interface UpdateAmenityDto {
  name?: string;
  category?: string;
  description?: string;
  price?: number;
}

// Amenity API functions
export const amenityApi = {
  /**
   * Get amenities for a location
   */
  getAmenitiesByLocation: async (
    locationId: string,
    category?: string,
  ): Promise<Amenity[]> => {
    const response = await customAxios.get<AmenityResponse>(
      `/amenity/${locationId}`,
      {
        params: category ? { category } : {},
      },
    );
    return response.data.data;
  },

  /**
   * Get amenity details
   */
  getAmenityDetails: async (
    locationId: string,
    amenityName: string,
  ): Promise<Amenity> => {
    const response = await customAxios.get<Amenity>(
      `/amenity/${locationId}/${amenityName}`,
    );
    return response.data;
  },

  /**
   * Create new amenity
   */
  createAmenity: async (data: CreateAmenityDto): Promise<any> => {
    const response = await customAxios.post('/amenity', data);
    return response.data;
  },

  /**
   * Update amenity information
   */
  updateAmenity: async (
    locationId: string,
    amenityName: string,
    data: UpdateAmenityDto,
  ): Promise<any> => {
    const response = await customAxios.patch(
      `/amenity/${locationId}/${amenityName}`,
      data,
    );
    return response.data;
  },

  /**
   * Toggle amenity active status
   */
  toggleAmenityStatus: async (
    locationId: string,
    amenityName: string,
    isActive: boolean,
  ): Promise<any> => {
    const response = await customAxios.patch(
      `/amenity/${locationId}/${amenityName}`,
      { isActive },
    );
    return response.data;
  },

  /**
   * Delete amenity
   */
  deleteAmenity: async (
    locationId: string,
    amenityName: string,
  ): Promise<any> => {
    const response = await customAxios.delete(
      `/amenity/${locationId}/${amenityName}`,
    );
    return response.data;
  },
};
