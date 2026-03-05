import customAxios from '@/utils/custom-axios';

// DTOs matching backend
export interface SignupDto {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  DoB: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface OwnerSignupDto {
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

// API Response types
export interface AuthResponse {
  token: string;
  role: 'client' | 'owner' | 'admin';
}

// Auth API functions
export const authApi = {
  /**
   * Sign up a new user
   */
  signup: async (data: SignupDto): Promise<AuthResponse> => {
    const response = await customAxios.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  /**
   * Login with email and password
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await customAxios.post<AuthResponse>('/auth/login', data);
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
};
