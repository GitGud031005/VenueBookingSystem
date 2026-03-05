// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  avatarURL?: string;
  DoB: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  slug: string;
  membership_points: number;
}

export interface Owner extends User {
  bankId: string;
  bankName: string;
  accountName: string;
  accountNo: string;
}

// Location Types
export interface Location {
  location_id: string;
  owner_id: string;
  name: string;
  description?: string;
  addrNo: string;
  ward: string;
  city: string;
  avgRating: number;
  policy?: string;
  phoneNo: string;
  mapURL: string;
  thumbnailURL: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Venue Types
export interface VenueType {
  venueType_id: string;
  name: string;
  description?: string;
  minCapacity: number;
  maxCapacity: number;
  area: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Venue {
  location_id: string;
  name: string;
  venueType_id: string;
  floor: string;
  pricePerHour: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Populated fields
  location?: Location;
  venueType?: VenueType;
  images?: VenueImage[];
}

export interface VenueImage {
  image_id: string;
  location_id: string;
  venueName: string;
  locationImgURL: string;
}

// Amenity Types
export interface Amenity {
  amenity_name: any;
  amenity_id: string;
  location_id: string;
  category: string;
  description?: string;
  price: number;
  compatibleSize?: string; // Small, Medium, Large, or null for all sizes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Order {
  order_id: string;
  client_id: string;
  venue_loc_id: string;
  venueName: string;
  totalPrice: number;
  status: OrderStatus;
  startHour: Date;
  endHour: Date;
  points: number;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  // Populated fields
  client?: Client;
  venue?: Venue;
  amenities?: Amenity[];
  discounts?: Discount[];
}

// Discount Types
export type MembershipTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface Discount {
  discount_id: string;
  name: string;
  percentage: number;
  maxDiscountPrice?: number;
  minPrice?: number;
  venueTypeId?: string;
  membershipTier?: MembershipTier[];
  startedAt: Date;
  expiredAt: Date;
  createdAt: Date;
}

// Invoice Types
export type InvoiceStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Invoice {
  invoice_id: string;
  order_id: string;
  amount: number;
  status: InvoiceStatus;
  senderBankAccount?: string;
  receiverBankAccount?: string;
  transaction_id?: string;
  paidOn?: Date;
  description?: string;
}

// Review Types
export interface Rate {
  client_id: string;
  location_id: string;
  stars: number;
  comment?: string;
  created_at: Date;
  updated_at: Date;
  // Populated fields
  client?: Client;
}

// Favorite Types
export interface Favor {
  client_id: string;
  location_id: string;
  created_at: Date;
}

// Search & Filter Types
export interface SearchFilters {
  location?: string;
  city?: string;
  checkIn?: Date;
  checkOut?: Date;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  venueTypes?: string[];
  amenities?: string[];
  rating?: number;
}

export interface SearchResults {
  venues: VenueWithDetails[];
  total: number;
  page: number;
  limit: number;
}

export interface VenueWithDetails extends Venue {
  location: Location;
  venueType: VenueType;
  images: VenueImage[];
  amenities: Amenity[];
  avgRating: number;
  reviewCount: number;
  isFavorite?: boolean;
}

// Booking Form Types
export interface BookingFormData {
  venue: VenueWithDetails;
  startHour: Date;
  endHour: Date;
  selectedAmenities: Amenity[];
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
  };
  discountCode?: string;
  totalPrice: number;
  finalPrice: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
