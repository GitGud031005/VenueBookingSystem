import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { authApi } from '@/api/auth.api';
import { userApi } from '@/api/user.api';
import { Footer } from '@/components/booking-footer';
import { Header } from '@/components/booking-header';
import handleAxiosError from '@/helpers/handle-axios-error';
import storage from '@/helpers/storage';
import { useAuthStore } from '@/stores';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  console.log('[LoginPage] Component rendering');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('[LoginPage] onSubmit called');
      console.log('[LoginPage] Login values:', { email: values.email });
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await authApi.login({
          email: values.email,
          password: values.password,
        });
        console.log('[LoginPage] Login response:', response);

        // Store auth token and update store
        storage.setItem('token', response.token);

        // Fetch user profile to get real ID and details
        console.log('[LoginPage] Fetching user profile...');
        const userProfile = await userApi.getUserProfile();
        console.log('[LoginPage] User profile fetched:', userProfile);

        // Use new auth store login() function with real data
        login(
          {
            accessToken: response.token,
            refreshToken: response.token,
          },
          {
            id: userProfile.id,
            isAdmin: userProfile.isAdmin,
            email: userProfile.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            role: response.role.toUpperCase() as 'CLIENT' | 'OWNER' | 'ADMIN',
            avatarURL: userProfile.avatarUrl,
            phoneNo: userProfile.phoneNo,
          },
        );

        console.log('[LoginPage] Auth store updated, navigating to home');
        // Navigate to home page
        navigate({ to: '/' });
      } catch (error) {
        console.error('[LoginPage] Login error:', error);
        handleAxiosError(error, (message) => {
          setErrorMessage(message);
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary-300"
              >
                create a new account
              </Link>
            </p>
          </div>

          <div className="card-glass bg-white/80 shadow-xl backdrop-blur-lg">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {errorMessage && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-4 rounded-md">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`input mt-1 ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={`input mt-1 ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your password"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary-300"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full justify-center py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
