import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { userApi } from '@/api/user.api';
import { queryConfig } from '@/config/react-query';
import { OpenAPI } from '@/generated/requests/core/OpenAPI';
import storage from '@/helpers/storage';
import { useAuthStore } from '@/stores';

import { routeTree } from '../routeTree.gen';

// Configure OpenAPI to use token from storage
OpenAPI.HEADERS = async () => {
  const token = storage.getItem<string>('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return { Authorization: '' }; // Return empty string instead of undefined/missing key to satisfy type
};

const router = createRouter({
  routeTree,
  context: {
    authContext: { isAuthenticated: false },
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  const { isAuthenticated, updateUser, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      // Check if we have a token in storage, even if store says not authenticated
      const token = localStorage.getItem('token');
      if (token || isAuthenticated) {
        try {
          const profile = await userApi.getUserProfile();
          const isAdmin = profile.isAdmin;
          const role = isAdmin ? 'ADMIN' : 'CLIENT';
          updateUser({
            id: profile.id,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            avatarURL: profile.avatarUrl,
            phoneNo: profile.phoneNo,
            role: role,
            isAdmin,
          });
        } catch {
          // If token is invalid, clear it
          logout();
        }
      }
    };

    initAuth();
  }, [isAuthenticated, updateUser, logout]);

  return (
    <RouterProvider
      router={router}
      context={{
        authContext: { isAuthenticated },
      }}
    />
  );
};
const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

const App = () => {
  return (
    // this gg client id is temporary data
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={'hello123'}>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
