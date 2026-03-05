import { Star, X } from 'lucide-react';
import { useState } from 'react';

interface RatingFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
  onCancel?: () => void;
  initialRating?: number;
  initialComment?: string;
  submitLabel?: string;
}

export function RatingForm({
  onSubmit,
  onCancel,
  initialRating = 0,
  initialComment = '',
  submitLabel = 'Submit Review',
}: RatingFormProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(initialComment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
    } catch (err: unknown) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-gray-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {initialRating > 0 ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Your Rating *
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`size-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-300'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm font-medium text-gray-700">
              {rating} {rating === 1 ? 'star' : 'stars'}
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your Review *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="input resize-none"
          placeholder="Share your experience with this location..."
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Minimum 10 characters ({comment.length}/10)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline flex-1 justify-center"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
