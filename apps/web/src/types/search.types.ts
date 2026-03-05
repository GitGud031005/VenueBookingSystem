export interface SearchFilters {
  city: string;
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  minPrice?: number;
  maxPrice?: number;
  minAvgRating?: number;
  theme?: string;
  size?: 'Small' | 'Medium' | 'Large';
  amenityCategory?: string;
  sort?: 'PRICE_ASC' | 'PRICE_DESC' | 'RATING' | 'AREA_ASC' | 'AREA_DESC';
}
