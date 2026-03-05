import type { Review } from '@/api/rate.api';

import { RatingDisplay } from './rating-display';

interface ReviewCardProps {
  review: Review;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwn?: boolean;
}

export function ReviewCard({
  review,
  onEdit,
  onDelete,
  isOwn = false,
}: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="bg-gradient-primary size-10 overflow-hidden rounded-full">
            {review.clientAvatar ? (
              <img
                src={review.clientAvatar}
                alt={review.clientName || 'User'}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm font-bold text-white">
                {review.clientName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {/* Name and Date */}
          <div>
            <p className="font-semibold text-gray-900">
              {review.clientName || 'Anonymous'}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(review.created_at)}
            </p>
          </div>
        </div>

        {/* Rating */}
        <RatingDisplay rating={review.stars} showNumber={false} size="sm" />
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="mb-3 text-sm text-gray-700">{review.comment}</p>
      )}

      {/* Actions (if own review) */}
      {isOwn && (onEdit || onDelete) && (
        <div className="flex gap-2 border-t border-gray-100 pt-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-sm font-medium text-primary transition-colors hover:text-primary-300"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-sm font-medium text-red-600 transition-colors hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {/* Updated indicator */}
      {review.updated_at !== review.created_at && (
        <p className="mt-2 text-xs italic text-gray-400">
          Edited on {formatDate(review.updated_at)}
        </p>
      )}
    </div>
  );
}
