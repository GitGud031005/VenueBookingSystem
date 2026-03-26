import { useCallback, useEffect, useState } from 'react';

import { venueApi } from '@/api/venue.api';
import type { SearchFilters } from '@/types/search.types';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (newFilters: SearchFilters) => void;
  amenityCategories?: string[]; // Real amenity categories from API
}

export function FilterSidebar({
  filters,
  onFilterChange,
  amenityCategories = [], // Use prop with default empty array
}: FilterSidebarProps) {
  console.log('[FilterSidebar] Component rendering');
  console.log('[FilterSidebar] filters:', filters);
  console.log(
    '[FilterSidebar] amenityCategories from props:',
    amenityCategories,
  );

  const [themes, setThemes] = useState<string[]>([]);
  // Extract unique themes from mock data
  // const themes = mockVenueTypes.map((t) => t.name);

  useEffect(() => {
    const getVenueType = async () => {
      const themes = await venueApi.getAllVenueTypes();
      setThemes(Array.from(new Set(themes.map((t) => t.name))));
    };
    getVenueType();
  }, []);

  const handleThemeChange = useCallback(
    (theme: string) => {
      onFilterChange({
        ...filters,
        theme: filters.theme === theme ? undefined : theme,
      });
    },
    [filters, onFilterChange],
  );

  const handleSizeChange = useCallback(
    (size: 'Small' | 'Medium' | 'Large') => {
      onFilterChange({
        ...filters,
        size: filters.size === size ? undefined : size,
      });
    },
    [filters, onFilterChange],
  );

  const handleAmenityChange = useCallback(
    (category: string) => {
      onFilterChange({
        ...filters,
        amenityCategory:
          filters.amenityCategory === category ? undefined : category,
      });
    },
    [filters, onFilterChange],
  );

  const handlePriceChange = useCallback(
    (type: 'min' | 'max', value: string) => {
      const numValue = value ? parseInt(value, 10) : undefined;
      onFilterChange({
        ...filters,
        [type === 'min' ? 'minPrice' : 'maxPrice']: numValue,
      });
    },
    [filters, onFilterChange],
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      onFilterChange({
        ...filters,
        minAvgRating: filters.minAvgRating === rating ? undefined : rating,
      });
    },
    [filters, onFilterChange],
  );

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h3 className="font-bold text-gray-900">Filter by:</h3>
        </div>

        <div className="divide-y divide-gray-200 bg-white">
          {/* Price Range */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-900">
              Price Range (per hour)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
                value={filters.maxPrice || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <label
                  key={rating}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minAvgRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="size-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{rating}+ Stars</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Theme</h4>
            <div className="space-y-2">
              {themes.map((theme) => (
                <label
                  key={theme}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    checked={filters.theme === theme}
                    onChange={() => handleThemeChange(theme)}
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{theme}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Size</h4>
            <div className="space-y-2">
              {(['Small', 'Medium', 'Large'] as const).map((size) => (
                <label
                  key={size}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="size"
                    checked={filters.size === size}
                    onChange={() => handleSizeChange(size)}
                    className="size-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="p-4">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Amenities</h4>
            <div className="space-y-2">
              {amenityCategories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenityCategory === category}
                    onChange={() => handleAmenityChange(category)}
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
