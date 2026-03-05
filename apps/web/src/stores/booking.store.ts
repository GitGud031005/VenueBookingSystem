// Booking State Management Store
import type { DiscountData } from '@/api/order.api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingSearchParams {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  startTime: string;
  endTime: string;
  capacity: number;
  rooms: number;
}

export interface DiscountCode {
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrderValue?: number;
  expiresAt?: Date;
}

interface BookingState {
  // Search Parameters
  searchParams: BookingSearchParams;

  // Booking Details
  venueId: string;
  selectedAmenities: string[];
  discountCode: string;
  discountAmount: number;
  appliedDiscount: DiscountData[] | null;

  // Actions
  setSearchParams: (params: Partial<BookingSearchParams>) => void;
  setVenue: (venueId: string) => void;
  toggleAmenity: (amenityId: string) => void;
  applyDiscount: (
    discount: DiscountData,
    baseAmount: number,
  ) => Promise<{ success: boolean; message: string }>;
  clearDiscount: (discountId: string) => void;
  clearBooking: () => void;
  clearMetadata: () => void;
}

// Mock discount codes for demo
export const MOCK_DISCOUNT_CODES: DiscountCode[] = [
  {
    code: 'WELCOME10',
    type: 'PERCENTAGE',
    value: 10,
    minOrderValue: 0,
  },
  {
    code: 'SAVE50K',
    type: 'FIXED',
    value: 50000,
    minOrderValue: 500000,
  },
  {
    code: 'VIP20',
    type: 'PERCENTAGE',
    value: 20,
    minOrderValue: 1000000,
  },
];

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      // Initial State
      searchParams: {
        location: '',
        checkIn: null,
        checkOut: null,
        startTime: '',
        endTime: '',
        capacity: 1,
        rooms: 1,
      },
      venueId: '',
      selectedAmenities: [],
      discountCode: '',
      discountAmount: 0,
      appliedDiscount: null,

      // Set search parameters from search page
      setSearchParams: (params) => {
        set((state) => ({
          searchParams: { ...state.searchParams, ...params },
        }));
      },

      // Set selected venue
      setVenue: (venueId) => {
        set({ venueId });
      },

      // Toggle amenity selection
      toggleAmenity: (amenityId) => {
        set((state) => {
          const isSelected = state.selectedAmenities.includes(amenityId);
          return {
            selectedAmenities: isSelected
              ? state.selectedAmenities.filter((id) => id !== amenityId)
              : [...state.selectedAmenities, amenityId],
          };
        });
      },

      // Apply discount code
      applyDiscount: async (discount, baseAmount) => {
        // Check minimum order value
        if (discount.minPrice && baseAmount < Number(discount.minPrice)) {
          return {
            success: false,
            message: `Đơn hàng tối thiểu ${Number(discount.minPrice).toLocaleString('vi-VN')}₫ để áp dụng mã này`,
          };
        }

        // Check expiration
        if (discount.expiredAt && new Date() > new Date(discount.expiredAt)) {
          return {
            success: false,
            message: 'Mã giảm giá đã hết hạn',
          };
        }

        // Calculate discount amount

        // TODO: please fix this to ensure that whenever change the appliedDiscount array, new price will appear
        const discountAmount = (baseAmount * discount.percentage) / 100;

        set((state) => ({
          discountCode: discount.discount_id,
          discountAmount,
          appliedDiscount: [...(state.appliedDiscount || []), discount],
        }));

        return {
          success: true,
          message: `Đã áp dụng mã giảm giá ${discount.percentage}%`,
        };
      },

      // Clear discount
      clearDiscount: (discountId: string) => {
        set((state) => ({
          discountCode: '',
          discountAmount: 0,
          appliedDiscount: state.appliedDiscount
            ? state.appliedDiscount.filter((d) => d.discount_id !== discountId)
            : null,
        }));
      },

      // Clear all booking data
      clearBooking: () => {
        set({
          searchParams: {
            location: '',
            checkIn: null,
            checkOut: null,
            startTime: '',
            endTime: '',
            capacity: 1,
            rooms: 1,
          },
          venueId: '',
          selectedAmenities: [],
          discountCode: '',
          discountAmount: 0,
          appliedDiscount: null,
        });
      },

      clearMetadata: () => {
        set({
          venueId: '',
          selectedAmenities: [],
          discountCode: '',
          discountAmount: 0,
          appliedDiscount: null,
        });
      },
    }),
    {
      name: 'bookingStore',
    },
  ),
);
