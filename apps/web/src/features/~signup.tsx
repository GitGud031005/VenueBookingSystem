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

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});

function SignupPage() {
  console.log('[SignupPage] Component rendering');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: '',
      agreeToTerms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      dob: Yup.string().required('Date of birth is required'),
      agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
    }),
    onSubmit: async (values) => {
      console.log('[SignupPage] onSubmit called');
      console.log('[SignupPage] Signup values:', {
        email: values.email,
        firstName: values.firstName,
      });
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await authApi.signup({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          DoB: values.dob,
        });
        console.log('[SignupPage] Signup response:', response);

        // Store auth token and update store
        storage.setItem('token', response.token);

        // Fetch user profile to get real ID and details
        console.log('[SignupPage] Fetching user profile...');
        const userProfile = await userApi.getUserProfile();
        console.log('[SignupPage] User profile fetched:', userProfile);

        // Use new auth store login() function with real data
        login(
          {
            accessToken: response.token,
            refreshToken: response.token,
          },
          {
            isAdmin: userProfile.isAdmin,
            id: userProfile.id,
            email: userProfile.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            role: response.role.toUpperCase() as 'CLIENT' | 'OWNER' | 'ADMIN',
            avatarURL: userProfile.avatarUrl,
            phoneNo: userProfile.phoneNo,
          },
        );

        console.log('[SignupPage] Auth store updated, navigating to home');
        // Navigate to home page
        navigate({ to: '/' });
      } catch (error) {
        console.error('[SignupPage] Signup error:', error);
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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                search={{ redirect: location.href }}
                className="font-medium text-primary hover:text-primary-300"
              >
                Sign in
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
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="name"
                    required
                    className={`input mt-1 ${
                      formik.touched.firstName && formik.errors.firstName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your first name"
                    {...formik.getFieldProps('firstName')}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="name"
                    required
                    className={`input mt-1 ${
                      formik.touched.lastName && formik.errors.lastName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your last name"
                    {...formik.getFieldProps('lastName')}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>

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
                    autoComplete="new-password"
                    required
                    className={`input mt-1 ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Create a password"
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    autoComplete="bday"
                    required
                    className={`input mt-1 ${
                      formik.touched.dob && formik.errors.dob
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your date of birth"
                    {...formik.getFieldProps('dob')}
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.dob}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="agree-to-terms"
                  name="agreeToTerms"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                />
                <label
                  htmlFor="agree-to-terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{' '}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.agreeToTerms}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full justify-center py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
