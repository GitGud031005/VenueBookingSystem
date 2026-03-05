import customAxios from '@/utils/custom-axios';

// Discount DTOs based on discounts table
export interface Discount {
  discount_id: string;
  name: string;
  percentage: number;
  maxDiscountPrice?: number;
  minPrice?: number;
  venueTypeId?: string;
  venueTypeName?: string;
  membershipTier?: string;
  startedAt: string;
  expiredAt: string;
  createdAt: string;
  isActive?: boolean;
}

export interface CreateDiscountDto {
  name: string;
  percentage: number;
  maxDiscountPrice?: number;
  minPrice?: number;
  venueTypeId?: string;
  membershipTier?: string;
  startedAt: string;
  expiredAt: string;
}

export type UpdateDiscountDto = Partial<CreateDiscountDto>;

// Discount API functions
export const discountApi = {
  /**
   * Get all discounts
   */
  getAllDiscounts: async (): Promise<Discount[]> => {
    const response = await customAxios.get<{ data: Discount[] }>(
      '/payment/discounts/preview',
    );
    return response.data.data;
  },

  /**
   * Get discount by ID
   */
  getDiscountById: async (discountId: string): Promise<Discount> => {
    const response = await customAxios.get<Discount>(
      `/admin/discounts/${discountId}`,
    );
    return response.data;
  },

  /**
   * Create new discount
   */
  createDiscount: async (data: CreateDiscountDto): Promise<void> => {
    await customAxios.post('/payment/discounts', data);
  },

  /**
   * Update discount
   */
  updateDiscount: async (
    discountId: string,
    data: UpdateDiscountDto,
  ): Promise<Discount> => {
    const response = await customAxios.patch<Discount>(
      `/admin/discounts/${discountId}`,
      data,
    );
    return response.data;
  },

  /**
   * Delete discount
   */
  deleteDiscount: async (discountId: string): Promise<void> => {
    await customAxios.delete(`/admin/discounts/${discountId}`);
  },
};
