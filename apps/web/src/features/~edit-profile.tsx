import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useFormik } from 'formik';
import { Save, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { ownerApi } from '@/api/owner.api';
import { userApi } from '@/api/user.api';
import { CDN_BASE_URL, venueApi } from '@/api/venue.api';
import { AvatarUpload } from '@/components/avatar-upload';
import { Footer } from '@/components/booking-footer';
import { Header } from '@/components/booking-header';
import handleAxiosError from '@/helpers/handle-axios-error';
import { useAuthStore } from '@/stores';

interface Bank {
  id: string;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
}

export const Route = createFileRoute('/edit-profile')({
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: EditProfilePage,
});

function EditProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>();
  const { user } = useAuthStore();
  const role = user?.role;
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [bankErrorMessage, setBankErrorMessage] = useState('');
  const [isSavingBankInfo, setIsSavingBankInfo] = useState(false);
  const [bankSuccessMessage, setBankSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      dob: Yup.string().required('Date of birth is required'),
      phoneNumber: Yup.string().matches(
        /^[0-9]{10,15}$/,
        'Phone number must be 10-15 digits',
      ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      let avatarUrl: string | undefined;
      try {
        // if (USE_MOCK_DATA) {
        //   // Simulate API calls in mock mode
        if (avatarFile) {
          setIsUploadingAvatar(true);
          const { url } = await venueApi.uploadImage(avatarFile.name);
          await fetch(url, {
            method: 'PUT',
            body: avatarFile,
          });
          avatarUrl = `${CDN_BASE_URL}/${avatarFile.name}`;
          setIsUploadingAvatar(false);
        }

        // Update profile
        await userApi.updateUserProfile({
          firstName: values.firstName,
          lastName: values.lastName,
          DoB: values.dob,
          phoneNumber: values.phoneNumber || undefined,
          avatar: avatarUrl,
        });

        setSuccessMessage('Profile updated successfully!');

        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        handleAxiosError(error, (message) => {
          setErrorMessage(message);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      } finally {
        setIsLoading(false);
        setIsUploadingAvatar(false);
      }
    },
  });

  // Bank info formik for owners
  const bankFormik = useFormik({
    initialValues: {
      bankId: '',
      accountNumber: '',
      accountName: '',
    },
    validationSchema: Yup.object({
      bankId: Yup.string().required('Please select a bank'),
      accountNumber: Yup.string()
        .required('Account number is required')
        .matches(/^[0-9]+$/, 'Account number must contain only digits'),
      accountName: Yup.string().required('Account holder name is required'),
    }),
    onSubmit: async (values) => {
      setIsSavingBankInfo(true);
      setBankErrorMessage('');
      setBankSuccessMessage('');

      try {
        const selectedBank = banks.find(
          (b) => b.id.toString() === values.bankId,
        );
        if (!selectedBank) {
          throw new Error('Bank not found');
        }
        await ownerApi.updateOwner({
          bankId: selectedBank.bin,
          bankName: selectedBank.name,
          accountName: values.accountName,
          accountNo: values.accountNumber,
        });
        setBankSuccessMessage('Bank information updated successfully!');
        setTimeout(() => setBankSuccessMessage(''), 3000);
      } catch (error) {
        handleAxiosError(error, (message) => {
          setBankErrorMessage(message);
        });
      } finally {
        setIsSavingBankInfo(false);
      }
    },
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await userApi.getUserProfile();

        formik.setValues({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          dob: profile.DoB,
          phoneNumber: profile.phoneNo || '',
        });
        setCurrentAvatar(profile.avatarUrl);

        // Set bank info if available for owners
        if (role === 'OWNER' && (profile as any).bankId) {
          bankFormik.setValues({
            bankId: profile.bankId || '',
            accountNumber: profile.accountNo || '',
            accountName: profile.accountName || '',
          });
        }
      } catch (error) {
        handleAxiosError(error, (message) => {
          setErrorMessage(message);
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch banks when role is owner
  useEffect(() => {
    if (role === 'OWNER') {
      const fetchBanks = async () => {
        setLoadingBanks(true);
        setBankErrorMessage('');

        try {
          const response = await fetch('https://api.vietqr.io/v2/banks');
          if (!response.ok) {
            throw new Error('Failed to fetch banks');
          }
          const data = await response.json();
          // VietQR API returns data in format: { code: "00", desc: "Successful", data: [...] }
          if (data.data && Array.isArray(data.data)) {
            setBanks(data.data);
          }
        } catch (error) {
          console.error('Error fetching banks:', error);
          setBankErrorMessage('Failed to load banks. Please refresh the page.');
        } finally {
          setLoadingBanks(false);
        }
      };

      fetchBanks();
    }
  }, [role]);

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file);
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="spinner" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-fade-in w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center">
            <button
              onClick={() => navigate({ to: '/' })}
              className="mb-4 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary-300"
            >
              <ArrowLeft className="size-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Edit Your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Update your personal information and preferences
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="animate-slide-down rounded-lg bg-green-50 p-4 shadow-md">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="animate-slide-down rounded-lg bg-red-50 p-4 shadow-md">
              <div className="flex items-center gap-3">
                <AlertCircle className="size-5 text-red-600" />
                <p className="text-sm font-medium text-red-800">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="card-glass bg-white/80 shadow-xl backdrop-blur-lg">
            <form className="space-y-8" onSubmit={formik.handleSubmit}>
              {/* Avatar Upload */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  Profile Picture
                </h3>
                <AvatarUpload
                  currentAvatar={currentAvatar}
                  onAvatarChange={handleAvatarChange}
                  isUploading={isUploadingAvatar}
                />
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                {/* Name Fields */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
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
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
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
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    disabled
                    className="input mt-1 cursor-not-allowed bg-gray-100"
                    {...formik.getFieldProps('email')}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={
                      new Date(formik.values.dob).toISOString().split('T')[0]
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`input mt-1 ${
                      formik.touched.dob && formik.errors.dob
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.dob}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number{' '}
                    <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className={`input mt-1 ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    placeholder="Enter your phone number"
                    {...formik.getFieldProps('phoneNumber')}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Bank Information Section (for owners only) */}
              {role === 'OWNER' && (
                <div className="space-y-6 border-t border-gray-200 pt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Banking Information
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Manage your bank account details for payments
                    </p>
                  </div>

                  {/* Bank Success Message */}
                  {bankSuccessMessage && (
                    <div className="animate-slide-down rounded-lg bg-green-50 p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="size-5 text-green-600" />
                        <p className="text-sm font-medium text-green-800">
                          {bankSuccessMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Error Message */}
                  {bankErrorMessage && (
                    <div className="animate-slide-down rounded-lg bg-red-50 p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="size-5 text-red-600" />
                        <p className="text-sm font-medium text-red-800">
                          {bankErrorMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Selection */}
                  <div>
                    <label
                      htmlFor="bankId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bank{' '}
                      {!bankFormik.values.bankId && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <select
                      id="bankId"
                      disabled={loadingBanks}
                      className={`input mt-1 ${
                        bankFormik.touched.bankId && bankFormik.errors.bankId
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      } ${loadingBanks ? 'cursor-not-allowed bg-gray-100' : ''}`}
                      {...bankFormik.getFieldProps('bankId')}
                    >
                      <option value="">
                        {loadingBanks ? 'Loading banks...' : 'Select your bank'}
                      </option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                    {bankFormik.touched.bankId && bankFormik.errors.bankId && (
                      <p className="mt-1 text-sm text-red-500">
                        {bankFormik.errors.bankId}
                      </p>
                    )}
                  </div>

                  {/* Account Holder Name */}
                  <div>
                    <label
                      htmlFor="accountName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Account Holder Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="accountName"
                      type="text"
                      className={`input mt-1 ${
                        bankFormik.touched.accountName &&
                        bankFormik.errors.accountName
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                      placeholder="Enter the account holder's name"
                      {...bankFormik.getFieldProps('accountName')}
                    />
                    {bankFormik.touched.accountName &&
                      bankFormik.errors.accountName && (
                        <p className="mt-1 text-sm text-red-500">
                          {bankFormik.errors.accountName}
                        </p>
                      )}
                  </div>

                  {/* Account Number */}
                  <div>
                    <label
                      htmlFor="accountNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Account Number
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      className={`input mt-1 ${
                        bankFormik.touched.accountNumber &&
                        bankFormik.errors.accountNumber
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                      placeholder="Enter your account number"
                      {...bankFormik.getFieldProps('accountNumber')}
                    />
                    {bankFormik.touched.accountNumber &&
                      bankFormik.errors.accountNumber && (
                        <p className="mt-1 text-sm text-red-500">
                          {bankFormik.errors.accountNumber}
                        </p>
                      )}
                  </div>

                  {/* Bank Save Button */}
                  <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={() => bankFormik.handleSubmit()}
                      disabled={isSavingBankInfo || loadingBanks}
                      className="btn-primary w-full justify-center py-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {isSavingBankInfo ? (
                        <>
                          <div className="spinner size-4 border-2 border-white/20 border-t-white" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="size-4" />
                          <span>Save Bank Information</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={isLoading || isUploadingAvatar}
                  className="btn-primary w-full justify-center py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isLoading || isUploadingAvatar ? (
                    <>
                      <div className="spinner size-5 border-2 border-white/20 border-t-white" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="size-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ to: '/' })}
                  className="btn-outline w-full justify-center py-3 text-lg sm:w-auto"
                >
                  Cancel
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
