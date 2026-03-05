import customAxios from '@/utils/custom-axios';
import type { AuthResponse } from './auth.api';

// DTOs matching backend
export interface OwnerSignupDto {
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface UpdateOwnerDto {
  bankId?: string;
  bankName?: string;
  accountName?: string;
  accountNo?: string;
}

// Auth API functions
export const ownerApi = {
  /**
   * Sign up a new user
   */
  switchToOwner: async (): Promise<AuthResponse> => {
    const response =
      await customAxios.patch<AuthResponse>('/auth/switch/owner');
    return response.data;
  },

  /**
   * Owner signup (requires authentication)
   */
  ownerSignup: async (data: OwnerSignupDto): Promise<AuthResponse> => {
    const response = await customAxios.post<AuthResponse>(
      '/auth/owner/signup',
      data,
    );
    return response.data;
  },

  updateOwner: async (data: UpdateOwnerDto): Promise<void> => {
    await customAxios.patch<void>('/user/owner/me', data);
  },
};
