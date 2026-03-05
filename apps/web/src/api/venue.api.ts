import customAxios from '@/utils/custom-axios';

// Venue Type DTOs for public API
export interface VenueType {
  venue_type_id: string;
  name: string;
  description: string;
  min_capacity: number;
  max_capacity: number;
}

export interface VenueTypeResponse {
  data: VenueType[];
}

// Venue DTOs
export interface CreateVenueDto {
  locationId: string;
  name: string;
  venueTypeId: string;
  floor: string;
  area: number;
  pricePerHour: number;
  images?: string[];
}

export interface VenueDetailsResponse {
  venue_name: string;
  floor: string;
  area: string;
  pricePerHour: string;
  theme_name: string;
  venueType_id: string;
  minCapacity: number;
  maxCapacity: number;
  location_id: string;
}

export interface UpdateVenueDto {
  name?: string;
  typeId?: string;
  floor?: string;
  area?: number;
  pricePerHour?: number;
}

export interface StorageUploadDto {
  key: string;
}

// Venue API functions
export const venueApi = {
  /**
   * Get all venue types
   */
  getAllVenueTypes: async (): Promise<VenueType[]> => {
    const response = await customAxios.get<VenueTypeResponse>('/venue/types');
    return response.data.data;
  },

  /**
   * Upload image to storage
   */
  uploadImage: async (fileName: string): Promise<{ url: string }> => {
    const response = await customAxios.post<{ url: string }>('/storage', {
      key: fileName,
    });
    return response.data;
  },

  /**
   * Create new venue
   */
  createVenue: async (data: CreateVenueDto): Promise<any> => {
    const response = await customAxios.post('/venue', data);
    return response.data;
  },

  /**
   * Update venue active status
   */
  updateVenueStatus: async (
    locationId: string,
    venueName: string,
    isActive: boolean,
  ): Promise<any> => {
    const response = await customAxios.patch(
      `/venue/${locationId}/${venueName}`,
      { isActive },
    );
    return response.data;
  },

  /**
   * Get venue details
   */
  getVenueDetails: async (
    locationId: string,
    venueName: string,
  ): Promise<VenueDetailsResponse> => {
    const response = await customAxios.get<VenueDetailsResponse>(
      `/venue/${locationId}/${venueName}/preview`,
    );
    return response.data;
  },

  /**
   * Update venue information
   */
  updateVenue: async (
    locationId: string,
    venueName: string,
    data: UpdateVenueDto,
  ): Promise<any> => {
    const response = await customAxios.patch(
      `/venue/${locationId}/${venueName}`,
      data,
    );
    return response.data;
  },
};

export const CDN_BASE_URL =
  'https://cdn.fessior.com/content/booking-classroom-assets/booking-database';
