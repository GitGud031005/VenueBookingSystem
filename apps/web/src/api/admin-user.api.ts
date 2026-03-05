import customAxios from '@/utils/custom-axios';

// User DTOs based on users table
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  avatarURL?: string;
  DoB: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  // Extended fields
  userType?: 'client' | 'owner' | 'admin';
  membershipPoints?: number;
  bankInfo?: {
    bankId: string;
    bankName: string;
    accountName: string;
    accountNo: string;
  };
}

export interface UserFilters {
  userType?: 'client' | 'owner' | 'admin';
  isActive?: boolean;
}

// Admin User API functions
export const adminUserApi = {
  /**
   * Get all users (admin only)
   */
  getAllUsers: async (filters: UserFilters): Promise<User[]> => {
    const { userType, isActive } = filters;
    const response = await customAxios.get<User[]>(
      `/user/list?${isActive === undefined ? '' : isActive ? 'status=active' : 'status=inactive'}${userType === undefined ? '' : `role=${userType}`}`,
    );
    return response.data;
  },

  /**
   * Get user detail by ID
   */
  getUserDetail: async (userId: string): Promise<User> => {
    const response = await customAxios.get<User>(`/admin/users/${userId}`);
    return response.data;
  },

  /**
   * Update user status (activate/deactivate)
   */
  updateUserStatus: async (
    userId: string,
    isActive: boolean,
  ): Promise<void> => {
    await customAxios.patch(`/admin/users/${userId}/status`, { isActive });
  },

  /**
   * Get user statistics
   */
  getUserStats: async (): Promise<{
    totalUsers: number;
    totalClients: number;
    totalOwners: number;
    totalAdmins: number;
    activeUsers: number;
  }> => {
    const response = await customAxios.get('/admin/users/stats');
    return response.data;
  },
};
