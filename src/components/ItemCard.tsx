
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    size: string;
    condition: string;
    brand?: string;
    location: string;
    postedAt: string;
    rating: number;
    isFavorited?: boolean;
  };
  onToggleFavorite?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(item.id);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'excellent':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/items/${item.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
          >
            <Heart
              className={`w-4 h-4 ${
                item.isFavorited
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            />
          </button>

          {/* Condition Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
              {item.title}
            </h3>
            {item.brand && (
              <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded">Size {item.size}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{item.postedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
