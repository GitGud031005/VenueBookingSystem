// generated with @7nohe/openapi-react-query-codegen@1.4.1

import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {
  AmenitiesService,
  AppService,
  AuthenticationService,
  LocationsService,
  MinioStorageService,
  OrdersService,
  PaymentsService,
  UsersService,
  VenuesService,
} from '../requests/services.gen';

import * as Common from './common';
import type { UpdateVenueDto, SignupDto, OwnerSignupDto, LoginDto, CreateVenueTypeDto, CreateVenueDto, CreateVenueImageDto, CreateRateDto, CreateLocationDto, SearchLocationsDto, AdminOwnerFeesQueryDto, CreateAmenityDto, CreateOrderDto, AddOrderAmenityDto, CreateInvoiceDto, CreateDiscountDto, CreateApplyDto, UpdateUserDto, UpdateOwnerDto, UpdateVenueTypeDto, UpdateRateDto, UpdateLocationDto, UpdateAmenityDto, UpdateOrderDto, CompleteInvoicePaymentDto, UpdateInvoiceStatusDto, UpdateDiscountDto, UpdateApplyDto, RemoveOrderAmenityDto, DeleteApplyDto } from '../requests';
/**
 * @returns string
 * @throws ApiError
 */
export const useAppServiceAppControllerGetHello = <
  TData = Common.AppServiceAppControllerGetHelloDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAppServiceAppControllerGetHelloKeyFn(queryKey),
    queryFn: () => AppService.appControllerGetHello() as TData,
    ...options,
  });
/**
 * Get current user profile
 * @returns UserProfileDto User profile retrieved successfully
 * @throws ApiError
 */
export const useUsersServiceUserControllerGetProfile = <
  TData = Common.UsersServiceUserControllerGetProfileDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseUsersServiceUserControllerGetProfileKeyFn(queryKey),
    queryFn: () => UsersService.userControllerGetProfile() as TData,
    ...options,
  });
/**
 * @returns unknown
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerGetVenueTypes = <
  TData = Common.VenuesServiceVenueControllerGetVenueTypesDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseVenuesServiceVenueControllerGetVenueTypesKeyFn(queryKey),
    queryFn: () => VenuesService.venueControllerGetVenueTypes() as TData,
    ...options,
  });
/**
 * Preview venue details
 * @param data The data for the request.
 * @param data.locationId
 * @param data.name
 * @returns VenuePreviewResponseDto Venue preview retrieved successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerPreviewVenue = <
  TData = Common.VenuesServiceVenueControllerPreviewVenueDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    locationId,
    name,
  }: {
    locationId: string;
    name: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseVenuesServiceVenueControllerPreviewVenueKeyFn(
      { locationId, name },
      queryKey,
    ),
    queryFn: () =>
      VenuesService.venueControllerPreviewVenue({ locationId, name }) as TData,
    ...options,
  });
/**
 * Update venue details
 * @param data The data for the request.
 * @param data.locationId
 * @param data.name
 * @param data.requestBody
 * @returns unknown Venue updated successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerUpdateVenue = <
  TData = Common.VenuesServiceVenueControllerUpdateVenueDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    locationId,
    name,
    requestBody,
  }: {
    locationId: string;
    name: string;
    requestBody: UpdateVenueDto;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseVenuesServiceVenueControllerUpdateVenueKeyFn(
      { locationId, name, requestBody },
      queryKey,
    ),
    queryFn: () =>
      VenuesService.venueControllerUpdateVenue({
        locationId,
        name,
        requestBody,
      }) as TData,
    ...options,
  });
/**
 * Get all ratings for a location
 * @param data The data for the request.
 * @param data.locationId
 * @returns LocationRatingsDto Ratings retrieved successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerGetLocationRatings = <
  TData = Common.VenuesServiceVenueControllerGetLocationRatingsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    locationId,
  }: {
    locationId: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseVenuesServiceVenueControllerGetLocationRatingsKeyFn(
      { locationId },
      queryKey,
    ),
    queryFn: () =>
      VenuesService.venueControllerGetLocationRatings({ locationId }) as TData,
    ...options,
  });
/**
 * Get all ratings by current user
 * @returns RateResponseDto User ratings retrieved successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerGetClientRates = <
  TData = Common.VenuesServiceVenueControllerGetClientRatesDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseVenuesServiceVenueControllerGetClientRatesKeyFn(queryKey),
    queryFn: () => VenuesService.venueControllerGetClientRates() as TData,
    ...options,
  });
/**
 * Get all favorited locations by current user
 * @returns FavorResponseDto User favorites retrieved successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerGetClientFavors = <
  TData = Common.VenuesServiceVenueControllerGetClientFavorsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseVenuesServiceVenueControllerGetClientFavorsKeyFn(queryKey),
    queryFn: () => VenuesService.venueControllerGetClientFavors() as TData,
    ...options,
  });
/**
 * Get all active locations (public)
 * @returns LocationListItemDto Locations retrieved successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerGetAllLocations = <
  TData = Common.LocationsServiceLocationControllerGetAllLocationsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseLocationsServiceLocationControllerGetAllLocationsKeyFn(
        queryKey,
      ),
    queryFn: () =>
      LocationsService.locationControllerGetAllLocations() as TData,
    ...options,
  });
/**
 * Get all locations owned by current user
 * @returns unknown Locations retrieved successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerGetLocationsOfOwner = <
  TData = Common.LocationsServiceLocationControllerGetLocationsOfOwnerDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseLocationsServiceLocationControllerGetLocationsOfOwnerKeyFn(
        queryKey,
      ),
    queryFn: () =>
      LocationsService.locationControllerGetLocationsOfOwner() as TData,
    ...options,
  });
/**
 * Get complete location details by ID (public)
 * @param data The data for the request.
 * @param data.id
 * @returns LocationDetailsResponseDto Location details retrieved successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerGetLocationDetails = <
  TData = Common.LocationsServiceLocationControllerGetLocationDetailsDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    id,
  }: {
    id: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseLocationsServiceLocationControllerGetLocationDetailsKeyFn(
        { id },
        queryKey,
      ),
    queryFn: () =>
      LocationsService.locationControllerGetLocationDetails({ id }) as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.id
 * @returns unknown
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerPreviewLocation = <
  TData = Common.LocationsServiceLocationControllerPreviewLocationDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    id,
  }: {
    id: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseLocationsServiceLocationControllerPreviewLocationKeyFn(
      { id },
      queryKey,
    ),
    queryFn: () =>
      LocationsService.locationControllerPreviewLocation({ id }) as TData,
    ...options,
  });
/**
 * @param data The data for the request.
 * @param data.id
 * @returns unknown
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerGetVenuesAtLocation = <
  TData = Common.LocationsServiceLocationControllerGetVenuesAtLocationDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    id,
  }: {
    id: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseLocationsServiceLocationControllerGetVenuesAtLocationKeyFn(
        { id },
        queryKey,
      ),
    queryFn: () =>
      LocationsService.locationControllerGetVenuesAtLocation({ id }) as TData,
    ...options,
  });
/**
 * Get amenities by location ID
 * @param data The data for the request.
 * @param data.locationId
 * @returns unknown Amenities retrieved successfully
 * @throws ApiError
 */
export const useAmenitiesServiceAmenityControllerGetByLocation = <
  TData = Common.AmenitiesServiceAmenityControllerGetByLocationDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    locationId,
  }: {
    locationId: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseAmenitiesServiceAmenityControllerGetByLocationKeyFn(
      { locationId },
      queryKey,
    ),
    queryFn: () =>
      AmenitiesService.amenityControllerGetByLocation({ locationId }) as TData,
    ...options,
  });
/**
 * Get amenity by location ID and name
 * @param data The data for the request.
 * @param data.locationId
 * @param data.name
 * @returns unknown Amenity retrieved successfully
 * @throws ApiError
 */
export const useAmenitiesServiceAmenityControllerGetByLocationAndName = <
  TData = Common.AmenitiesServiceAmenityControllerGetByLocationAndNameDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    locationId,
    name,
  }: {
    locationId: string;
    name: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseAmenitiesServiceAmenityControllerGetByLocationAndNameKeyFn(
        { locationId, name },
        queryKey,
      ),
    queryFn: () =>
      AmenitiesService.amenityControllerGetByLocationAndName({
        locationId,
        name,
      }) as TData,
    ...options,
  });
/**
 * @returns string
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerGetUncompletedOrders = <
  TData = Common.OrdersServiceOrderControllerGetUncompletedOrdersDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseOrdersServiceOrderControllerGetUncompletedOrdersKeyFn(queryKey),
    queryFn: () => OrdersService.orderControllerGetUncompletedOrders() as TData,
    ...options,
  });
/**
 * Get available amenities and discounts for booking
 * @param data The data for the request.
 * @param data.locationId
 * @param data.venueName
 * @param data.startTime
 * @param data.endTime
 * @returns unknown Metadata retrieved successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerGetDiscountsByVenue = <
  TData = Common.OrdersServiceOrderControllerGetDiscountsByVenueDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    endTime,
    locationId,
    startTime,
    venueName,
  }: {
    endTime: string;
    locationId: string;
    startTime: string;
    venueName: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseOrdersServiceOrderControllerGetDiscountsByVenueKeyFn(
      { endTime, locationId, startTime, venueName },
      queryKey,
    ),
    queryFn: () =>
      OrdersService.orderControllerGetDiscountsByVenue({
        endTime,
        locationId,
        startTime,
        venueName,
      }) as TData,
    ...options,
  });
/**
 * @returns unknown
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerGetOrdersByLocation = <
  TData = Common.OrdersServiceOrderControllerGetOrdersByLocationDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey:
      Common.UseOrdersServiceOrderControllerGetOrdersByLocationKeyFn(queryKey),
    queryFn: () => OrdersService.orderControllerGetOrdersByLocation() as TData,
    ...options,
  });
/**
 * Get orders for current client with optional status filter
 * @param data The data for the request.
 * @param data.status Filter by order status (optional)
 * @returns ClientOrderResponseDto Orders retrieved successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerGetClientOrders = <
  TData = Common.OrdersServiceOrderControllerGetClientOrdersDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    status,
  }: {
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  } = {},
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseOrdersServiceOrderControllerGetClientOrdersKeyFn(
      { status },
      queryKey,
    ),
    queryFn: () =>
      OrdersService.orderControllerGetClientOrders({ status }) as TData,
    ...options,
  });
/**
 * Get invoice creation data for an order
 * @param data The data for the request.
 * @param data.orderId
 * @returns InvoiceCreateDataResponseDto Invoice data retrieved successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerGetInvoiceCreateData = <
  TData = Common.OrdersServiceOrderControllerGetInvoiceCreateDataDefaultResponse,
  TError = unknown,
  TQueryKey extends Array<unknown> = unknown[],
>(
  {
    orderId,
  }: {
    orderId: string;
  },
  queryKey?: TQueryKey,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<TData, TError>({
    queryKey: Common.UseOrdersServiceOrderControllerGetInvoiceCreateDataKeyFn(
      { orderId },
      queryKey,
    ),
    queryFn: () =>
      OrdersService.orderControllerGetInvoiceCreateData({ orderId }) as TData,
    ...options,
  });
/**
 * Register a new client user
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown User successfully registered
 * @throws ApiError
 */
export const useAuthenticationServiceAuthControllerSignup = <
  TData = Common.AuthenticationServiceAuthControllerSignupMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: SignupDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: SignupDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthenticationService.authControllerSignup({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Upgrade client account to owner account
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Owner account created successfully
 * @throws ApiError
 */
export const useAuthenticationServiceAuthControllerOwnerSignup = <
  TData = Common.AuthenticationServiceAuthControllerOwnerSignupMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: OwnerSignupDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: OwnerSignupDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthenticationService.authControllerOwnerSignup({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Login with email and password
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Login successful
 * @throws ApiError
 */
export const useAuthenticationServiceAuthControllerLogin = <
  TData = Common.AuthenticationServiceAuthControllerLoginMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: LoginDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: LoginDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AuthenticationService.authControllerLogin({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new venue type (Admin only)
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Venue type created successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerCreateVenueType = <
  TData = Common.VenuesServiceVenueControllerCreateVenueTypeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateVenueTypeDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateVenueTypeDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      VenuesService.venueControllerCreateVenueType({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new venue
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Venue created successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerCreateVenue = <
  TData = Common.VenuesServiceVenueControllerCreateVenueMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateVenueDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateVenueDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      VenuesService.venueControllerCreateVenue({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Add an image to a venue
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Image added successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerCreateVenueImage = <
  TData = Common.VenuesServiceVenueControllerCreateVenueImageMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateVenueImageDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateVenueImageDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      VenuesService.venueControllerCreateVenueImage({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Rate a location
 * @param data The data for the request.
 * @param data.requestBody
 * @returns RateResponseDto Rating created successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerCreateRate = <
  TData = Common.VenuesServiceVenueControllerCreateRateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateRateDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateRateDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      VenuesService.venueControllerCreateRate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new location
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Location created successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerCreate = <
  TData = Common.LocationsServiceLocationControllerCreateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateLocationDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateLocationDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      LocationsService.locationControllerCreate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Search for available locations with filters
 * @param data The data for the request.
 * @param data.requestBody
 * @returns LocationSearchResultDto Search results returned successfully
 * @returns unknown
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerSearchLocations = <
  TData = Common.LocationsServiceLocationControllerSearchLocationsMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: SearchLocationsDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: SearchLocationsDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      LocationsService.locationControllerSearchLocations({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Add location to favorites
 * @param data The data for the request.
 * @param data.locationId
 * @returns unknown Favorite added successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerCreateFavor = <
  TData = Common.LocationsServiceLocationControllerCreateFavorMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        locationId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      locationId: string;
    },
    TContext
  >({
    mutationFn: ({ locationId }) =>
      LocationsService.locationControllerCreateFavor({
        locationId,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Get owner fees statistics by month/year (Admin only)
 * @param data The data for the request.
 * @param data.requestBody
 * @returns AdminOwnerFeesResponseDto Owner fees retrieved successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerGetOwnerFees = <
  TData = Common.LocationsServiceLocationControllerGetOwnerFeesMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: AdminOwnerFeesQueryDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: AdminOwnerFeesQueryDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      LocationsService.locationControllerGetOwnerFees({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new amenity
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Amenity created successfully
 * @throws ApiError
 */
export const useAmenitiesServiceAmenityControllerCreate = <
  TData = Common.AmenitiesServiceAmenityControllerCreateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateAmenityDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateAmenityDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      AmenitiesService.amenityControllerCreate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new booking order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Order created successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerCreate = <
  TData = Common.OrdersServiceOrderControllerCreateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateOrderDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateOrderDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      OrdersService.orderControllerCreate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Add an amenity to an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Amenity added to order successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerAddAmenity = <
  TData = Common.OrdersServiceOrderControllerAddAmenityMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: AddOrderAmenityDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: AddOrderAmenityDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      OrdersService.orderControllerAddAmenity({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create an invoice for an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Invoice created successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerCreateInvoice = <
  TData = Common.PaymentsServicePaymentControllerCreateInvoiceMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateInvoiceDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateInvoiceDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerCreateInvoice({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Create a new discount code (Admin only)
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Discount created successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerCreateDiscount = <
  TData = Common.PaymentsServicePaymentControllerCreateDiscountMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateDiscountDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateDiscountDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerCreateDiscount({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Apply a discount code to an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Discount applied successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerApplyDiscount = <
  TData = Common.PaymentsServicePaymentControllerApplyDiscountMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CreateApplyDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CreateApplyDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerApplyDiscount({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * @returns unknown
 * @throws ApiError
 */
export const useMinioStorageServiceMinioStorageControllerGetPresignedUrl = <
  TData = Common.MinioStorageServiceMinioStorageControllerGetPresignedUrlMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<TData, TError, void, TContext>,
    'mutationFn'
  >,
) =>
  useMutation<TData, TError, void, TContext>({
    mutationFn: () =>
      MinioStorageService.minioStorageControllerGetPresignedUrl() as unknown as Promise<TData>,
    ...options,
  });
/**
 * Switch user role to owner
 * @returns unknown Successfully switched to owner role
 * @throws ApiError
 */
export const useAuthenticationServiceAuthControllerSwitchToOwner = <
  TData = Common.AuthenticationServiceAuthControllerSwitchToOwnerMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<TData, TError, void, TContext>,
    'mutationFn'
  >,
) =>
  useMutation<TData, TError, void, TContext>({
    mutationFn: () =>
      AuthenticationService.authControllerSwitchToOwner() as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update current user profile
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown User profile updated successfully
 * @throws ApiError
 */
export const useUsersServiceUserControllerUpdate = <
  TData = Common.UsersServiceUserControllerUpdateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: UpdateUserDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: UpdateUserDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.userControllerUpdate({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update owner profile
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Owner profile updated successfully
 * @throws ApiError
 */
export const useUsersServiceUserControllerUpdateOwner = <
  TData = Common.UsersServiceUserControllerUpdateOwnerMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: UpdateOwnerDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: UpdateOwnerDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      UsersService.userControllerUpdateOwner({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update venue type (Admin only)
 * @param data The data for the request.
 * @param data.id
 * @param data.requestBody
 * @returns unknown Venue type updated successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerUpdateVenueType = <
  TData = Common.VenuesServiceVenueControllerUpdateVenueTypeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        requestBody: UpdateVenueTypeDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      requestBody: UpdateVenueTypeDto;
    },
    TContext
  >({
    mutationFn: ({ id, requestBody }) =>
      VenuesService.venueControllerUpdateVenueType({
        id,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update an existing rating
 * @param data The data for the request.
 * @param data.clientId
 * @param data.locationId
 * @param data.requestBody
 * @returns RateResponseDto Rating updated successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerUpdateRate = <
  TData = Common.VenuesServiceVenueControllerUpdateRateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        clientId: string;
        locationId: string;
        requestBody: UpdateRateDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      clientId: string;
      locationId: string;
      requestBody: UpdateRateDto;
    },
    TContext
  >({
    mutationFn: ({ clientId, locationId, requestBody }) =>
      VenuesService.venueControllerUpdateRate({
        clientId,
        locationId,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update location details
 * @param data The data for the request.
 * @param data.id
 * @param data.requestBody
 * @returns unknown Location updated successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerUpdate = <
  TData = Common.LocationsServiceLocationControllerUpdateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        requestBody: UpdateLocationDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      requestBody: UpdateLocationDto;
    },
    TContext
  >({
    mutationFn: ({ id, requestBody }) =>
      LocationsService.locationControllerUpdate({
        id,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update amenity details
 * @param data The data for the request.
 * @param data.id
 * @param data.name
 * @param data.requestBody
 * @returns unknown Amenity updated successfully
 * @throws ApiError
 */
export const useAmenitiesServiceAmenityControllerUpdate = <
  TData = Common.AmenitiesServiceAmenityControllerUpdateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        name: string;
        requestBody: UpdateAmenityDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      name: string;
      requestBody: UpdateAmenityDto;
    },
    TContext
  >({
    mutationFn: ({ id, name, requestBody }) =>
      AmenitiesService.amenityControllerUpdate({
        id,
        name,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Mark invoice as cancelled
 * @returns unknown Invoice cancelled successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerCancelInvoice = <
  TData = Common.OrdersServiceOrderControllerCancelInvoiceMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<TData, TError, void, TContext>,
    'mutationFn'
  >,
) =>
  useMutation<TData, TError, void, TContext>({
    mutationFn: () =>
      OrdersService.orderControllerCancelInvoice() as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update order details
 * @param data The data for the request.
 * @param data.id
 * @param data.requestBody
 * @returns unknown Order updated successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerUpdate = <
  TData = Common.OrdersServiceOrderControllerUpdateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        requestBody: UpdateOrderDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      requestBody: UpdateOrderDto;
    },
    TContext
  >({
    mutationFn: ({ id, requestBody }) =>
      OrdersService.orderControllerUpdate({
        id,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Mark invoice as paid with transaction details
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Invoice payment completed successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerCompleteInvoicePayment = <
  TData = Common.PaymentsServicePaymentControllerCompleteInvoicePaymentMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: CompleteInvoicePaymentDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: CompleteInvoicePaymentDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerCompleteInvoicePayment({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Webhook to update order status
 * @returns unknown Order status updated successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerWebhookUpdateOrderStatus = <
  TData = Common.PaymentsServicePaymentControllerWebhookUpdateOrderStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<TData, TError, void, TContext>,
    'mutationFn'
  >,
) =>
  useMutation<TData, TError, void, TContext>({
    mutationFn: () =>
      PaymentsService.paymentControllerWebhookUpdateOrderStatus() as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update invoice payment status
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Invoice status updated successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerUpdateInvoiceStatus = <
  TData = Common.PaymentsServicePaymentControllerUpdateInvoiceStatusMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: UpdateInvoiceStatusDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: UpdateInvoiceStatusDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerUpdateInvoiceStatus({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Update discount details (Admin only)
 * @param data The data for the request.
 * @param data.id
 * @param data.requestBody
 * @returns unknown Discount updated successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerUpdateDiscount = <
  TData = Common.PaymentsServicePaymentControllerUpdateDiscountMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        requestBody: UpdateDiscountDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      requestBody: UpdateDiscountDto;
    },
    TContext
  >({
    mutationFn: ({ id, requestBody }) =>
      PaymentsService.paymentControllerUpdateDiscount({
        id,
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Change the discount applied to an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Discount updated successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerUpdateApply = <
  TData = Common.PaymentsServicePaymentControllerUpdateApplyMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: UpdateApplyDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: UpdateApplyDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerUpdateApply({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete venue type (Admin only)
 * @param data The data for the request.
 * @param data.id
 * @returns unknown Venue type deleted successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerDeleteVenueType = <
  TData = Common.VenuesServiceVenueControllerDeleteVenueTypeMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
    },
    TContext
  >({
    mutationFn: ({ id }) =>
      VenuesService.venueControllerDeleteVenueType({
        id,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete a venue
 * @param data The data for the request.
 * @param data.locationId
 * @param data.name
 * @returns unknown Venue deleted successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerDeleteVenue = <
  TData = Common.VenuesServiceVenueControllerDeleteVenueMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        locationId: string;
        name: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      locationId: string;
      name: string;
    },
    TContext
  >({
    mutationFn: ({ locationId, name }) =>
      VenuesService.venueControllerDeleteVenue({
        locationId,
        name,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Remove an image from a venue
 * @param data The data for the request.
 * @param data.locationId
 * @param data.venueName
 * @param data.url
 * @returns unknown Image deleted successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerDeleteVenueImage = <
  TData = Common.VenuesServiceVenueControllerDeleteVenueImageMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        locationId: string;
        url: string;
        venueName: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      locationId: string;
      url: string;
      venueName: string;
    },
    TContext
  >({
    mutationFn: ({ locationId, url, venueName }) =>
      VenuesService.venueControllerDeleteVenueImage({
        locationId,
        url,
        venueName,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete a rating
 * @param data The data for the request.
 * @param data.clientId
 * @param data.locationId
 * @returns unknown Rating deleted successfully
 * @throws ApiError
 */
export const useVenuesServiceVenueControllerDeleteRate = <
  TData = Common.VenuesServiceVenueControllerDeleteRateMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        clientId: string;
        locationId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      clientId: string;
      locationId: string;
    },
    TContext
  >({
    mutationFn: ({ clientId, locationId }) =>
      VenuesService.venueControllerDeleteRate({
        clientId,
        locationId,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete a location
 * @param data The data for the request.
 * @param data.id
 * @returns unknown Location deleted successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerDelete = <
  TData = Common.LocationsServiceLocationControllerDeleteMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
    },
    TContext
  >({
    mutationFn: ({ id }) =>
      LocationsService.locationControllerDelete({
        id,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Remove location from favorites
 * @param data The data for the request.
 * @param data.locationId
 * @returns unknown Favorite removed successfully
 * @throws ApiError
 */
export const useLocationsServiceLocationControllerDeleteFavor = <
  TData = Common.LocationsServiceLocationControllerDeleteFavorMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        locationId: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      locationId: string;
    },
    TContext
  >({
    mutationFn: ({ locationId }) =>
      LocationsService.locationControllerDeleteFavor({
        locationId,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete an amenity
 * @param data The data for the request.
 * @param data.id
 * @param data.name
 * @returns unknown Amenity deleted successfully
 * @throws ApiError
 */
export const useAmenitiesServiceAmenityControllerDelete = <
  TData = Common.AmenitiesServiceAmenityControllerDeleteMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
        name: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
      name: string;
    },
    TContext
  >({
    mutationFn: ({ id, name }) =>
      AmenitiesService.amenityControllerDelete({
        id,
        name,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Cancel/delete an order
 * @param data The data for the request.
 * @param data.id
 * @returns unknown Order deleted successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerRemove = <
  TData = Common.OrdersServiceOrderControllerRemoveMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
    },
    TContext
  >({
    mutationFn: ({ id }) =>
      OrdersService.orderControllerRemove({ id }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Remove an amenity from an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Amenity removed from order successfully
 * @throws ApiError
 */
export const useOrdersServiceOrderControllerRemoveAmenity = <
  TData = Common.OrdersServiceOrderControllerRemoveAmenityMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: RemoveOrderAmenityDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: RemoveOrderAmenityDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      OrdersService.orderControllerRemoveAmenity({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Delete a discount (Admin only)
 * @param data The data for the request.
 * @param data.id
 * @returns unknown Discount deleted successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerDeleteDiscount = <
  TData = Common.PaymentsServicePaymentControllerDeleteDiscountMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        id: string;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      id: string;
    },
    TContext
  >({
    mutationFn: ({ id }) =>
      PaymentsService.paymentControllerDeleteDiscount({
        id,
      }) as unknown as Promise<TData>,
    ...options,
  });
/**
 * Remove a discount from an order
 * @param data The data for the request.
 * @param data.requestBody
 * @returns unknown Discount removed successfully
 * @throws ApiError
 */
export const usePaymentsServicePaymentControllerRemoveDiscount = <
  TData = Common.PaymentsServicePaymentControllerRemoveDiscountMutationResult,
  TError = unknown,
  TContext = unknown,
>(
  options?: Omit<
    UseMutationOptions<
      TData,
      TError,
      {
        requestBody: DeleteApplyDto;
      },
      TContext
    >,
    'mutationFn'
  >,
) =>
  useMutation<
    TData,
    TError,
    {
      requestBody: DeleteApplyDto;
    },
    TContext
  >({
    mutationFn: ({ requestBody }) =>
      PaymentsService.paymentControllerRemoveDiscount({
        requestBody,
      }) as unknown as Promise<TData>,
    ...options,
  });
