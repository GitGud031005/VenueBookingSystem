import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function RatingDisplay({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : index < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'fill-gray-200 text-gray-300'
          }`}
        />
      ))}
      {showNumber && (
        <span
          className={`ml-1 font-semibold text-gray-700 ${textSizeClasses[size]}`}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
