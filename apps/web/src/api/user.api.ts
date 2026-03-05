import customAxios from '@/utils/custom-axios';

// User Profile DTOs
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: number;
  DoB: string;
  phoneNo?: string;
  avatarUrl?: string;
  bankId?: string;
  bankName?: string;
  accountNo?: string;
  accountName?: string;
}

export interface UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  DoB?: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface UploadAvatarResponse {
  avatarUrl: string;
}

// User API functions
export const userApi = {
  /**
   * Get current user profile
   */
  getUserProfile: async (): Promise<UserProfile> => {
    const response = await customAxios.get<UserProfile>('/user/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (
    data: UpdateUserProfileDto,
  ): Promise<UserProfile> => {
    const response = await customAxios.patch<UserProfile>('/user/me', data);
    return response.data;
  },

  /**
   * Upload user avatar
   */
  uploadAvatar: async (file: File): Promise<UploadAvatarResponse> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await customAxios.post<UploadAvatarResponse>(
      '/user/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
};
