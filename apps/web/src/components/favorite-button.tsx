import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { locationApi } from '@/api/location.api';
import {
  useLocationsServiceLocationControllerCreateFavor,
  useLocationsServiceLocationControllerDeleteFavor,
} from '@/generated/queries/queries';
import { useAuthStore } from '@/stores';

interface FavoriteButtonProps {
  locationId: string;
  initialIsFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  locationId,
  initialIsFavorite = false,
  onToggle,
  size = 'md',
}: FavoriteButtonProps) {
  const user = useAuthStore((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  // Sync state with prop
  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const sizeClasses = {
    sm: 'size-5',
    md: 'size-6',
    lg: 'size-8',
  };

  // Create favor mutation
  const createFavorMutation = useLocationsServiceLocationControllerCreateFavor({
    onSuccess: () => {
      setIsFavorite(true);
      onToggle?.(true);
      toast.success('Added to favorites!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add favorite');
    },
  });

  // Delete favor mutation
  const deleteFavorMutation = useLocationsServiceLocationControllerDeleteFavor({
    onSuccess: () => {
      setIsFavorite(false);
      onToggle?.(false);
      toast.success('Removed from favorites!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to remove favorite');
    },
  });

  const handleFavoriteClick = async () => {
    await locationApi.favorLocation(locationId);
  };

  const handleUnfavoriteClick = async () => {
    await locationApi.unfavorLocation(locationId);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to add favorites');
      return;
    }

    if (isFavorite) {
      handleUnfavoriteClick();
      setIsFavorite(false);
    } else {
      handleFavoriteClick();
      setIsFavorite(true);
    }
  };

  const isLoading =
    createFavorMutation.isPending || deleteFavorMutation.isPending;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`group rounded-full bg-white p-2 shadow-md transition-all hover:scale-110 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 ${
        isFavorite ? 'ring-2 ring-red-400' : ''
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${sizeClasses[size]} transition-colors ${
          isFavorite
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 group-hover:text-red-400'
        }`}
      />
    </button>
  );
}
