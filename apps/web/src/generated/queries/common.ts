// generated with @7nohe/openapi-react-query-codegen@1.4.1

import type { UseQueryResult } from '@tanstack/react-query';
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
import type { UpdateVenueDto } from '../requests';
export type AppServiceAppControllerGetHelloDefaultResponse = Awaited<
  ReturnType<typeof AppService.appControllerGetHello>
>;
export type AppServiceAppControllerGetHelloQueryResult<
  TData = AppServiceAppControllerGetHelloDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAppServiceAppControllerGetHelloKey =
  'AppServiceAppControllerGetHello';
export const UseAppServiceAppControllerGetHelloKeyFn = (
  queryKey?: Array<unknown>,
) => [useAppServiceAppControllerGetHelloKey, ...(queryKey ?? [])];
export type UsersServiceUserControllerGetProfileDefaultResponse = Awaited<
  ReturnType<typeof UsersService.userControllerGetProfile>
>;
export type UsersServiceUserControllerGetProfileQueryResult<
  TData = UsersServiceUserControllerGetProfileDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useUsersServiceUserControllerGetProfileKey =
  'UsersServiceUserControllerGetProfile';
export const UseUsersServiceUserControllerGetProfileKeyFn = (
  queryKey?: Array<unknown>,
) => [useUsersServiceUserControllerGetProfileKey, ...(queryKey ?? [])];
export type VenuesServiceVenueControllerGetVenueTypesDefaultResponse = Awaited<
  ReturnType<typeof VenuesService.venueControllerGetVenueTypes>
>;
export type VenuesServiceVenueControllerGetVenueTypesQueryResult<
  TData = VenuesServiceVenueControllerGetVenueTypesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerGetVenueTypesKey =
  'VenuesServiceVenueControllerGetVenueTypes';
export const UseVenuesServiceVenueControllerGetVenueTypesKeyFn = (
  queryKey?: Array<unknown>,
) => [useVenuesServiceVenueControllerGetVenueTypesKey, ...(queryKey ?? [])];
export type VenuesServiceVenueControllerPreviewVenueDefaultResponse = Awaited<
  ReturnType<typeof VenuesService.venueControllerPreviewVenue>
>;
export type VenuesServiceVenueControllerPreviewVenueQueryResult<
  TData = VenuesServiceVenueControllerPreviewVenueDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerPreviewVenueKey =
  'VenuesServiceVenueControllerPreviewVenue';
export const UseVenuesServiceVenueControllerPreviewVenueKeyFn = (
  {
    locationId,
    name,
  }: {
    locationId: string;
    name: string;
  },
  queryKey?: Array<unknown>,
) => [
  useVenuesServiceVenueControllerPreviewVenueKey,
  ...(queryKey ?? [{ locationId, name }]),
];
export type VenuesServiceVenueControllerUpdateVenueDefaultResponse = Awaited<
  ReturnType<typeof VenuesService.venueControllerUpdateVenue>
>;
export type VenuesServiceVenueControllerUpdateVenueQueryResult<
  TData = VenuesServiceVenueControllerUpdateVenueDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerUpdateVenueKey =
  'VenuesServiceVenueControllerUpdateVenue';
export const UseVenuesServiceVenueControllerUpdateVenueKeyFn = (
  {
    locationId,
    name,
    requestBody,
  }: {
    locationId: string;
    name: string;
    requestBody: UpdateVenueDto;
  },
  queryKey?: Array<unknown>,
) => [
  useVenuesServiceVenueControllerUpdateVenueKey,
  ...(queryKey ?? [{ locationId, name, requestBody }]),
];
export type VenuesServiceVenueControllerGetLocationRatingsDefaultResponse =
  Awaited<ReturnType<typeof VenuesService.venueControllerGetLocationRatings>>;
export type VenuesServiceVenueControllerGetLocationRatingsQueryResult<
  TData = VenuesServiceVenueControllerGetLocationRatingsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerGetLocationRatingsKey =
  'VenuesServiceVenueControllerGetLocationRatings';
export const UseVenuesServiceVenueControllerGetLocationRatingsKeyFn = (
  {
    locationId,
  }: {
    locationId: string;
  },
  queryKey?: Array<unknown>,
) => [
  useVenuesServiceVenueControllerGetLocationRatingsKey,
  ...(queryKey ?? [{ locationId }]),
];
export type VenuesServiceVenueControllerGetClientRatesDefaultResponse = Awaited<
  ReturnType<typeof VenuesService.venueControllerGetClientRates>
>;
export type VenuesServiceVenueControllerGetClientRatesQueryResult<
  TData = VenuesServiceVenueControllerGetClientRatesDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerGetClientRatesKey =
  'VenuesServiceVenueControllerGetClientRates';
export const UseVenuesServiceVenueControllerGetClientRatesKeyFn = (
  queryKey?: Array<unknown>,
) => [useVenuesServiceVenueControllerGetClientRatesKey, ...(queryKey ?? [])];
export type VenuesServiceVenueControllerGetClientFavorsDefaultResponse =
  Awaited<ReturnType<typeof VenuesService.venueControllerGetClientFavors>>;
export type VenuesServiceVenueControllerGetClientFavorsQueryResult<
  TData = VenuesServiceVenueControllerGetClientFavorsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useVenuesServiceVenueControllerGetClientFavorsKey =
  'VenuesServiceVenueControllerGetClientFavors';
export const UseVenuesServiceVenueControllerGetClientFavorsKeyFn = (
  queryKey?: Array<unknown>,
) => [useVenuesServiceVenueControllerGetClientFavorsKey, ...(queryKey ?? [])];
export type LocationsServiceLocationControllerGetAllLocationsDefaultResponse =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerGetAllLocations>
  >;
export type LocationsServiceLocationControllerGetAllLocationsQueryResult<
  TData = LocationsServiceLocationControllerGetAllLocationsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationsServiceLocationControllerGetAllLocationsKey =
  'LocationsServiceLocationControllerGetAllLocations';
export const UseLocationsServiceLocationControllerGetAllLocationsKeyFn = (
  queryKey?: Array<unknown>,
) => [
  useLocationsServiceLocationControllerGetAllLocationsKey,
  ...(queryKey ?? []),
];
export type LocationsServiceLocationControllerGetLocationsOfOwnerDefaultResponse =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerGetLocationsOfOwner>
  >;
export type LocationsServiceLocationControllerGetLocationsOfOwnerQueryResult<
  TData = LocationsServiceLocationControllerGetLocationsOfOwnerDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationsServiceLocationControllerGetLocationsOfOwnerKey =
  'LocationsServiceLocationControllerGetLocationsOfOwner';
export const UseLocationsServiceLocationControllerGetLocationsOfOwnerKeyFn = (
  queryKey?: Array<unknown>,
) => [
  useLocationsServiceLocationControllerGetLocationsOfOwnerKey,
  ...(queryKey ?? []),
];
export type LocationsServiceLocationControllerGetLocationDetailsDefaultResponse =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerGetLocationDetails>
  >;
export type LocationsServiceLocationControllerGetLocationDetailsQueryResult<
  TData = LocationsServiceLocationControllerGetLocationDetailsDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationsServiceLocationControllerGetLocationDetailsKey =
  'LocationsServiceLocationControllerGetLocationDetails';
export const UseLocationsServiceLocationControllerGetLocationDetailsKeyFn = (
  {
    id,
  }: {
    id: string;
  },
  queryKey?: Array<unknown>,
) => [
  useLocationsServiceLocationControllerGetLocationDetailsKey,
  ...(queryKey ?? [{ id }]),
];
export type LocationsServiceLocationControllerPreviewLocationDefaultResponse =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerPreviewLocation>
  >;
export type LocationsServiceLocationControllerPreviewLocationQueryResult<
  TData = LocationsServiceLocationControllerPreviewLocationDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationsServiceLocationControllerPreviewLocationKey =
  'LocationsServiceLocationControllerPreviewLocation';
export const UseLocationsServiceLocationControllerPreviewLocationKeyFn = (
  {
    id,
  }: {
    id: string;
  },
  queryKey?: Array<unknown>,
) => [
  useLocationsServiceLocationControllerPreviewLocationKey,
  ...(queryKey ?? [{ id }]),
];
export type LocationsServiceLocationControllerGetVenuesAtLocationDefaultResponse =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerGetVenuesAtLocation>
  >;
export type LocationsServiceLocationControllerGetVenuesAtLocationQueryResult<
  TData = LocationsServiceLocationControllerGetVenuesAtLocationDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useLocationsServiceLocationControllerGetVenuesAtLocationKey =
  'LocationsServiceLocationControllerGetVenuesAtLocation';
export const UseLocationsServiceLocationControllerGetVenuesAtLocationKeyFn = (
  {
    id,
  }: {
    id: string;
  },
  queryKey?: Array<unknown>,
) => [
  useLocationsServiceLocationControllerGetVenuesAtLocationKey,
  ...(queryKey ?? [{ id }]),
];
export type AmenitiesServiceAmenityControllerGetByLocationDefaultResponse =
  Awaited<ReturnType<typeof AmenitiesService.amenityControllerGetByLocation>>;
export type AmenitiesServiceAmenityControllerGetByLocationQueryResult<
  TData = AmenitiesServiceAmenityControllerGetByLocationDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAmenitiesServiceAmenityControllerGetByLocationKey =
  'AmenitiesServiceAmenityControllerGetByLocation';
export const UseAmenitiesServiceAmenityControllerGetByLocationKeyFn = (
  {
    locationId,
  }: {
    locationId: string;
  },
  queryKey?: Array<unknown>,
) => [
  useAmenitiesServiceAmenityControllerGetByLocationKey,
  ...(queryKey ?? [{ locationId }]),
];
export type AmenitiesServiceAmenityControllerGetByLocationAndNameDefaultResponse =
  Awaited<
    ReturnType<typeof AmenitiesService.amenityControllerGetByLocationAndName>
  >;
export type AmenitiesServiceAmenityControllerGetByLocationAndNameQueryResult<
  TData = AmenitiesServiceAmenityControllerGetByLocationAndNameDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useAmenitiesServiceAmenityControllerGetByLocationAndNameKey =
  'AmenitiesServiceAmenityControllerGetByLocationAndName';
export const UseAmenitiesServiceAmenityControllerGetByLocationAndNameKeyFn = (
  {
    locationId,
    name,
  }: {
    locationId: string;
    name: string;
  },
  queryKey?: Array<unknown>,
) => [
  useAmenitiesServiceAmenityControllerGetByLocationAndNameKey,
  ...(queryKey ?? [{ locationId, name }]),
];
export type OrdersServiceOrderControllerGetUncompletedOrdersDefaultResponse =
  Awaited<ReturnType<typeof OrdersService.orderControllerGetUncompletedOrders>>;
export type OrdersServiceOrderControllerGetUncompletedOrdersQueryResult<
  TData = OrdersServiceOrderControllerGetUncompletedOrdersDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useOrdersServiceOrderControllerGetUncompletedOrdersKey =
  'OrdersServiceOrderControllerGetUncompletedOrders';
export const UseOrdersServiceOrderControllerGetUncompletedOrdersKeyFn = (
  queryKey?: Array<unknown>,
) => [
  useOrdersServiceOrderControllerGetUncompletedOrdersKey,
  ...(queryKey ?? []),
];
export type OrdersServiceOrderControllerGetDiscountsByVenueDefaultResponse =
  Awaited<ReturnType<typeof OrdersService.orderControllerGetDiscountsByVenue>>;
export type OrdersServiceOrderControllerGetDiscountsByVenueQueryResult<
  TData = OrdersServiceOrderControllerGetDiscountsByVenueDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useOrdersServiceOrderControllerGetDiscountsByVenueKey =
  'OrdersServiceOrderControllerGetDiscountsByVenue';
export const UseOrdersServiceOrderControllerGetDiscountsByVenueKeyFn = (
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
  queryKey?: Array<unknown>,
) => [
  useOrdersServiceOrderControllerGetDiscountsByVenueKey,
  ...(queryKey ?? [{ endTime, locationId, startTime, venueName }]),
];
export type OrdersServiceOrderControllerGetOrdersByLocationDefaultResponse =
  Awaited<ReturnType<typeof OrdersService.orderControllerGetOrdersByLocation>>;
export type OrdersServiceOrderControllerGetOrdersByLocationQueryResult<
  TData = OrdersServiceOrderControllerGetOrdersByLocationDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useOrdersServiceOrderControllerGetOrdersByLocationKey =
  'OrdersServiceOrderControllerGetOrdersByLocation';
export const UseOrdersServiceOrderControllerGetOrdersByLocationKeyFn = (
  queryKey?: Array<unknown>,
) => [
  useOrdersServiceOrderControllerGetOrdersByLocationKey,
  ...(queryKey ?? []),
];
export type OrdersServiceOrderControllerGetClientOrdersDefaultResponse =
  Awaited<ReturnType<typeof OrdersService.orderControllerGetClientOrders>>;
export type OrdersServiceOrderControllerGetClientOrdersQueryResult<
  TData = OrdersServiceOrderControllerGetClientOrdersDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useOrdersServiceOrderControllerGetClientOrdersKey =
  'OrdersServiceOrderControllerGetClientOrders';
export const UseOrdersServiceOrderControllerGetClientOrdersKeyFn = (
  {
    status,
  }: {
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  } = {},
  queryKey?: Array<unknown>,
) => [
  useOrdersServiceOrderControllerGetClientOrdersKey,
  ...(queryKey ?? [{ status }]),
];
export type OrdersServiceOrderControllerGetInvoiceCreateDataDefaultResponse =
  Awaited<ReturnType<typeof OrdersService.orderControllerGetInvoiceCreateData>>;
export type OrdersServiceOrderControllerGetInvoiceCreateDataQueryResult<
  TData = OrdersServiceOrderControllerGetInvoiceCreateDataDefaultResponse,
  TError = unknown,
> = UseQueryResult<TData, TError>;
export const useOrdersServiceOrderControllerGetInvoiceCreateDataKey =
  'OrdersServiceOrderControllerGetInvoiceCreateData';
export const UseOrdersServiceOrderControllerGetInvoiceCreateDataKeyFn = (
  {
    orderId,
  }: {
    orderId: string;
  },
  queryKey?: Array<unknown>,
) => [
  useOrdersServiceOrderControllerGetInvoiceCreateDataKey,
  ...(queryKey ?? [{ orderId }]),
];
export type AuthenticationServiceAuthControllerSignupMutationResult = Awaited<
  ReturnType<typeof AuthenticationService.authControllerSignup>
>;
export type AuthenticationServiceAuthControllerOwnerSignupMutationResult =
  Awaited<ReturnType<typeof AuthenticationService.authControllerOwnerSignup>>;
export type AuthenticationServiceAuthControllerLoginMutationResult = Awaited<
  ReturnType<typeof AuthenticationService.authControllerLogin>
>;
export type VenuesServiceVenueControllerCreateVenueTypeMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerCreateVenueType>
>;
export type VenuesServiceVenueControllerCreateVenueMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerCreateVenue>
>;
export type VenuesServiceVenueControllerCreateVenueImageMutationResult =
  Awaited<ReturnType<typeof VenuesService.venueControllerCreateVenueImage>>;
export type VenuesServiceVenueControllerCreateRateMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerCreateRate>
>;
export type LocationsServiceLocationControllerCreateMutationResult = Awaited<
  ReturnType<typeof LocationsService.locationControllerCreate>
>;
export type LocationsServiceLocationControllerSearchLocationsMutationResult =
  Awaited<
    ReturnType<typeof LocationsService.locationControllerSearchLocations>
  >;
export type LocationsServiceLocationControllerCreateFavorMutationResult =
  Awaited<ReturnType<typeof LocationsService.locationControllerCreateFavor>>;
export type LocationsServiceLocationControllerGetOwnerFeesMutationResult =
  Awaited<ReturnType<typeof LocationsService.locationControllerGetOwnerFees>>;
export type AmenitiesServiceAmenityControllerCreateMutationResult = Awaited<
  ReturnType<typeof AmenitiesService.amenityControllerCreate>
>;
export type OrdersServiceOrderControllerCreateMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerCreate>
>;
export type OrdersServiceOrderControllerAddAmenityMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerAddAmenity>
>;
export type PaymentsServicePaymentControllerCreateInvoiceMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerCreateInvoice>>;
export type PaymentsServicePaymentControllerCreateDiscountMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerCreateDiscount>>;
export type PaymentsServicePaymentControllerApplyDiscountMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerApplyDiscount>>;
export type MinioStorageServiceMinioStorageControllerGetPresignedUrlMutationResult =
  Awaited<
    ReturnType<typeof MinioStorageService.minioStorageControllerGetPresignedUrl>
  >;
export type AuthenticationServiceAuthControllerSwitchToOwnerMutationResult =
  Awaited<ReturnType<typeof AuthenticationService.authControllerSwitchToOwner>>;
export type UsersServiceUserControllerUpdateMutationResult = Awaited<
  ReturnType<typeof UsersService.userControllerUpdate>
>;
export type UsersServiceUserControllerUpdateOwnerMutationResult = Awaited<
  ReturnType<typeof UsersService.userControllerUpdateOwner>
>;
export type VenuesServiceVenueControllerUpdateVenueTypeMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerUpdateVenueType>
>;
export type VenuesServiceVenueControllerUpdateRateMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerUpdateRate>
>;
export type LocationsServiceLocationControllerUpdateMutationResult = Awaited<
  ReturnType<typeof LocationsService.locationControllerUpdate>
>;
export type AmenitiesServiceAmenityControllerUpdateMutationResult = Awaited<
  ReturnType<typeof AmenitiesService.amenityControllerUpdate>
>;
export type OrdersServiceOrderControllerCancelInvoiceMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerCancelInvoice>
>;
export type OrdersServiceOrderControllerUpdateMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerUpdate>
>;
export type PaymentsServicePaymentControllerCompleteInvoicePaymentMutationResult =
  Awaited<
    ReturnType<typeof PaymentsService.paymentControllerCompleteInvoicePayment>
  >;
export type PaymentsServicePaymentControllerWebhookUpdateOrderStatusMutationResult =
  Awaited<
    ReturnType<typeof PaymentsService.paymentControllerWebhookUpdateOrderStatus>
  >;
export type PaymentsServicePaymentControllerUpdateInvoiceStatusMutationResult =
  Awaited<
    ReturnType<typeof PaymentsService.paymentControllerUpdateInvoiceStatus>
  >;
export type PaymentsServicePaymentControllerUpdateDiscountMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerUpdateDiscount>>;
export type PaymentsServicePaymentControllerUpdateApplyMutationResult = Awaited<
  ReturnType<typeof PaymentsService.paymentControllerUpdateApply>
>;
export type VenuesServiceVenueControllerDeleteVenueTypeMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerDeleteVenueType>
>;
export type VenuesServiceVenueControllerDeleteVenueMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerDeleteVenue>
>;
export type VenuesServiceVenueControllerDeleteVenueImageMutationResult =
  Awaited<ReturnType<typeof VenuesService.venueControllerDeleteVenueImage>>;
export type VenuesServiceVenueControllerDeleteRateMutationResult = Awaited<
  ReturnType<typeof VenuesService.venueControllerDeleteRate>
>;
export type LocationsServiceLocationControllerDeleteMutationResult = Awaited<
  ReturnType<typeof LocationsService.locationControllerDelete>
>;
export type LocationsServiceLocationControllerDeleteFavorMutationResult =
  Awaited<ReturnType<typeof LocationsService.locationControllerDeleteFavor>>;
export type AmenitiesServiceAmenityControllerDeleteMutationResult = Awaited<
  ReturnType<typeof AmenitiesService.amenityControllerDelete>
>;
export type OrdersServiceOrderControllerRemoveMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerRemove>
>;
export type OrdersServiceOrderControllerRemoveAmenityMutationResult = Awaited<
  ReturnType<typeof OrdersService.orderControllerRemoveAmenity>
>;
export type PaymentsServicePaymentControllerDeleteDiscountMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerDeleteDiscount>>;
export type PaymentsServicePaymentControllerRemoveDiscountMutationResult =
  Awaited<ReturnType<typeof PaymentsService.paymentControllerRemoveDiscount>>;
