import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  mapSearchFiltersToDto,
  mapSearchResultToVenue,
} from '@/adapters/api.adapter';
import { orderApi } from '@/api/order.api';
import { Footer } from '@/components/booking-footer';
import { Header } from '@/components/booking-header';
import { FilterSidebar } from '@/components/filter-sidebar';
import { VenueList } from '@/components/venue-list';
import { mockProvinces } from '@/data/provinces';
import { useLocationsServiceLocationControllerSearchLocations } from '@/generated/queries';
import { useBookingStore } from '@/stores';
import type { SearchFilters } from '@/types/search.types';
import type { VenueWithDetails } from '@/types/venue.types';

export const Route = createFileRoute('/search')({
  beforeLoad: ({ context }) => {
    if (!context.authContext.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      location: (search.location as string) || '',
      checkIn: (search.checkIn as string) || '',
      checkOut: (search.checkOut as string) || '',
      startTime: (search.startTime as string) || '',
      endTime: (search.endTime as string) || '',
      capacity: (search.capacity as string) || '',
      size: (search.size as string) || '', // Add size param
      rooms: (search.rooms as number) || 1,
    };
  },
});

function SearchPage() {
  const urlSearchParams = Route.useSearch();
  const setSearchParams = useBookingStore((state) => state.setSearchParams);
  const setVenue = useBookingStore((state) => state.setVenue);
  const clearMetadata = useBookingStore((state) => state.clearMetadata);

  const storedSearchParams = useBookingStore((state) => state.searchParams);

  // Initialize from URL params if available, otherwise store, otherwise defaults
  const initialLocation =
    urlSearchParams.location || storedSearchParams.location || 'Hồ Chí Minh';
  const initialRooms = urlSearchParams.rooms || storedSearchParams.rooms || 1;

  const [searchParams, setLocalSearchParams] = useState<{
    location: string;
    startTime: string;
    endTime: string;
    adults: number;
    children: number;
    rooms: number;
  }>({
    location: initialLocation || 'Hồ Chí Minh',
    startTime:
      urlSearchParams.startTime ||
      storedSearchParams.startTime ||
      `${new Date().getHours() + 4}:00`,
    endTime:
      urlSearchParams.endTime ||
      storedSearchParams.endTime ||
      `${new Date().getHours() + 5}:00`,
    adults: 2,
    children: 0,
    rooms: initialRooms,
  });

  // Initialize filters from URL params with all fields
  const [filters, setFilters] = useState<SearchFilters>({
    city: initialLocation,
    startTime:
      urlSearchParams.startTime || storedSearchParams.startTime || undefined,
    endTime: urlSearchParams.endTime || storedSearchParams.endTime || undefined,
    size: (urlSearchParams.size as any) || undefined, // From index page
    sort: 'PRICE_ASC',
    // Optional filters start as undefined
    minPrice: undefined,
    maxPrice: undefined,
    minAvgRating: undefined,
    theme: undefined,
    amenityCategory: undefined,
  });

  // Sync local state with store when store updates (only if URL params are empty to avoid overwriting)
  useEffect(() => {
    // Only sync if we didn't just initialize from URL
    if (!urlSearchParams.location && storedSearchParams.location) {
      console.log(
        '[SearchPage] Store updated, syncing local state:',
        storedSearchParams,
      );
      setLocalSearchParams({
        location: storedSearchParams.location,
        startTime: storedSearchParams.startTime || '09:00',
        endTime: storedSearchParams.endTime || '17:00',
        adults: 2,
        children: 0,
        rooms: storedSearchParams.rooms || 1,
      });

      // Also update filters
      setFilters((prev) => ({
        ...prev,
        city: storedSearchParams.location || prev.city,
      }));
    }
  }, [
    storedSearchParams,
    urlSearchParams.location,
    setLocalSearchParams,
    setFilters,
  ]);

  useEffect(() => {
    console.log('[SearchPage] Initialized state:', {
      urlSearchParams,
      storedSearchParams,
      localSearchParams: searchParams,
    });

    // If we have URL params, ensure store is updated too (optional but good for consistency)
    if (urlSearchParams.location) {
      setSearchParams({
        location: urlSearchParams.location,
        checkIn: urlSearchParams.checkIn
          ? new Date(urlSearchParams.checkIn)
          : null,
        checkOut: urlSearchParams.checkOut
          ? new Date(urlSearchParams.checkOut)
          : null,
        startTime: urlSearchParams.startTime,
        endTime: urlSearchParams.endTime,
        capacity:
          urlSearchParams.capacity === 'Small'
            ? 10
            : urlSearchParams.capacity === 'Medium'
              ? 50
              : urlSearchParams.capacity === 'Large'
                ? 100
                : 1, // Approximate mapping
        rooms: urlSearchParams.rooms,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API Integration
  const [apiVenues, setApiVenues] = useState<VenueWithDetails[]>([]);
  const [amenityCategories, setAmenityCategories] = useState<string[]>([]);

  const searchMutation = useLocationsServiceLocationControllerSearchLocations({
    onSuccess: (data: any) => {
      console.log('[SearchPage] API search success:', data);

      if (Array.isArray(data)) {
        // Map API response to frontend model
        const mappedVenues = data.map((item) => mapSearchResultToVenue(item));
        console.log('[SearchPage] Mapped venues:', mappedVenues);
        setApiVenues(mappedVenues);
      } else {
        console.warn('[SearchPage] API response not an array');
        setApiVenues([]);
      }
    },
    onError: (error: any) => {
      console.error('[SearchPage] API search error:', error);
      toast.error('Failed to search venues. Please try again.');
      setApiVenues([]);
    },
  });

  // Trigger search when filters change
  useEffect(() => {
    if (filters.city) {
      console.log('[SearchPage] Triggering API search with filters:', filters);
      console.log(
        '[SearchPage] Using checkIn date:',
        storedSearchParams.checkIn,
      );

      // Pass checkIn date to adapter to construct full datetime
      const dto = mapSearchFiltersToDto(filters, storedSearchParams.checkIn);
      console.log('[SearchPage] Constructed DTO:', dto);

      searchMutation.mutate({ requestBody: dto });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.city,
    filters.theme,
    filters.size,
    filters.amenityCategory,
    filters.minAvgRating,
    filters.minPrice,
    filters.maxPrice,
    filters.sort, // Added sort to trigger re-search
  ]);

  // Fetch amenity categories from first location (similar to step-one.tsx)
  useEffect(() => {
    const fetchAmenityCategories = async () => {
      try {
        // Use first API location to get amenity list
        if (apiVenues.length > 0) {
          const firstLocation = apiVenues[0];
          const data = await orderApi.getOrderMetadata(
            firstLocation.location_id,
            firstLocation.name,
            new Date().toISOString(),
            new Date().toISOString(),
          );
          // Extract unique categories with proper typing
          const categories = [
            ...new Set(
              data.amenities.map((a: any) => (a.category as string) || 'Other'),
            ),
          ] as string[];
          console.log('[SearchPage] Amenity categories:', categories);
          setAmenityCategories(categories);
        }
      } catch (error) {
        console.error(
          '[SearchPage] Failed to fetch amenity categories:',
          error,
        );
      }
    };

    fetchAmenityCategories();
  }, [apiVenues]);

  // Handle venue click - save search params to store
  const navigate = useNavigate();

  // Handle venue click - save search params to store
  const handleVenueClick = useCallback(
    (venueId: string, locationId: string) => {
      console.log('[SearchPage] handleVenueClick - LocationId:', locationId);
      // Get date from store (set from home page) or use today as fallback
      const baseCheckInDate = storedSearchParams.checkIn
        ? dayjs(storedSearchParams.checkIn)
        : dayjs();
      const baseCheckOutDate = storedSearchParams.checkOut
        ? dayjs(storedSearchParams.checkOut)
        : dayjs();

      // Combine date from store with time from search page
      const [startHour, startMinute] = searchParams.startTime.split(':');
      const [endHour, endMinute] = searchParams.endTime.split(':');

      const checkInDateTime = baseCheckInDate
        .hour(parseInt(startHour))
        .minute(parseInt(startMinute))
        .second(0);

      const checkOutDateTime = baseCheckOutDate
        .hour(parseInt(endHour))
        .minute(parseInt(endMinute))
        .second(0);

      console.log('[SearchPage] handleVenueClick - Saving to store:', {
        startTime: searchParams.startTime,
        endTime: searchParams.endTime,
        checkIn: checkInDateTime.toDate(),
        checkOut: checkOutDateTime.toDate(),
      });

      // Save search parameters to booking store
      setSearchParams({
        location: searchParams.location,
        checkIn: checkInDateTime.toDate(),
        checkOut: checkOutDateTime.toDate(),
        startTime: searchParams.startTime,
        endTime: searchParams.endTime,
        capacity: searchParams.adults + searchParams.children,
        rooms: searchParams.rooms,
      });

      // Save selected venue
      setVenue(venueId);

      // Navigate to checkout using the locationId parameter
      navigate({ to: `/checkout/${locationId}/${venueId}` });
    },
    [
      storedSearchParams.checkIn,
      storedSearchParams.checkOut,
      searchParams.startTime,
      searchParams.endTime,
      searchParams.location,
      searchParams.adults,
      searchParams.children,
      searchParams.rooms,
      setSearchParams,
      setVenue,
      navigate,
    ],
  );

  // Use API results directly (already filtered and sorted by backend)
  const filteredVenues = useMemo(() => {
    console.log('[SearchPage] Using API results:', apiVenues.length);
    return apiVenues;
  }, [apiVenues]);

  // Get unique cities from API data for dropdown
  const availableCities = useMemo(() => {
    clearMetadata();
    return mockProvinces.map((prov) => prov.name);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      {/* Search Bar Section */}
      <div className="bg-primary-700 py-8">
        <div className="container-custom">
          <div className="mx-auto max-w-6xl rounded-lg bg-yellow-500 p-1">
            <div className="flex flex-col gap-1 rounded bg-white p-1 md:flex-row">
              {/* Location Input */}
              <div className="group relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="size-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                </div>
                <select
                  className="w-full rounded border-2 border-transparent bg-white py-3 pl-10 pr-8 text-gray-900 outline-none focus:border-primary disabled:bg-gray-100"
                  value={searchParams.location}
                  onChange={(e) => {
                    setLocalSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    });
                    setFilters({
                      ...filters,
                      city: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Where are you going?
                  </option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Picker */}
              <div className="flex flex-1 gap-1">
                {/* Check-in Time */}
                <div className="group relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-xs font-medium text-gray-500">
                      Check-in Time
                    </span>
                  </div>
                  <select
                    value={searchParams.startTime}
                    onChange={(e) =>
                      setLocalSearchParams({
                        ...searchParams,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full rounded border-2 border-transparent bg-white py-3 pl-28 pr-8 text-gray-900 outline-none focus:border-primary"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <option key={`start-${hour}`} value={`${hour}:00`}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="w-px bg-gray-200" />

                {/* Check-out Time */}
                <div className="group relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-xs font-medium text-gray-500">
                      Check-out Time
                    </span>
                  </div>
                  <select
                    value={searchParams.endTime}
                    onChange={(e) =>
                      setLocalSearchParams({
                        ...searchParams,
                        endTime: e.target.value,
                      })
                    }
                    className="w-full rounded border-2 border-transparent bg-white py-3 pl-32 pr-8 text-gray-900 outline-none focus:border-primary"
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <option key={`end-${hour}`} value={`${hour}:00`}>
                          {hour}:00
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button className="rounded bg-primary px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container-custom py-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="cursor-pointer hover:underline">Home</span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:underline">Vietnam</span>
          <span>&gt;</span>
          <span className="cursor-pointer hover:underline">
            {searchParams.location}
          </span>
          <span>&gt;</span>
          <span className="text-gray-900">Search results</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              amenityCategories={amenityCategories}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Loading State */}
            {searchMutation.isPending && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                  <p className="text-gray-600">Đang tìm kiếm...</p>
                </div>
              </div>
            )}

            {/* Results Count and Sort */}
            {!searchMutation.isPending && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {filteredVenues.length} results
                </p>
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={filters.sort || 'PRICE_ASC'}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        sort: e.target.value as any,
                      })
                    }
                    className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="PRICE_ASC">Price: Low to High</option>
                    <option value="PRICE_DESC">Price: High to Low</option>
                    <option value="RATING">Rating</option>
                    <option value="AREA_ASC">Area: Small to Large</option>
                    <option value="AREA_DESC">Area: Large to Small</option>
                  </select>
                </div>
              </div>
            )}

            {/* Venue List */}
            {!searchMutation.isPending && (
              <VenueList
                venues={filteredVenues}
                onVenueClick={handleVenueClick}
                location={searchParams.location}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
