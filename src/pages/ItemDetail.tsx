
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Star, 
  User, 
  MessageSquare, 
  Shield,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

// Mock data - in a real app, this would come from an API
const mockItems = {
  '1': {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition. Perfect for layering and adds a timeless touch to any outfit. This piece features authentic distressing and has been well-maintained over the years. The fabric feels premium and sturdy, making it a great investment piece for your wardrobe.',
    images: [
      'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    size: 'M',
    condition: 'Excellent',
    brand: 'Levi\'s',
    location: 'San Francisco, CA',
    postedAt: '2 days ago',
    rating: 4.8,
    isFavorited: false,
    price: 'Trade/Exchange',
    category: 'Jackets & Coats',
    tags: ['Vintage', 'Denim', 'Classic', 'Unisex'],
    measurements: {
      chest: '42 inches',
      length: '24 inches',
      shoulders: '18 inches',
      sleeves: '25 inches'
    },
    seller: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      totalExchanges: 23,
      joinedDate: 'March 2023',
      verified: true
    },
    exchangePreferences: [
      'Similar size jackets',
      'Vintage sweaters',
      'Designer accessories'
    ]
  },
  '2': {
    id: '2',
    title: 'Summer Floral Dress',
    description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight fabric with a flattering silhouette.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    size: 'S',
    condition: 'New',
    brand: 'Zara',
    location: 'Los Angeles, CA',
    postedAt: '1 day ago',
    rating: 4.9,
    isFavorited: true,
    price: 'Trade/Exchange',
    category: 'Dresses',
    tags: ['Summer', 'Floral', 'Midi', 'Casual'],
    measurements: {
      bust: '34 inches',
      waist: '26 inches',
      length: '42 inches'
    },
    seller: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      totalExchanges: 15,
      joinedDate: 'January 2024',
      verified: true
    },
    exchangePreferences: [
      'Designer dresses',
      'Vintage accessories',
      'High-end shoes'
    ]
  }
};

const ItemDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const item = mockItems[id as keyof typeof mockItems];
  
  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
            <Link to="/items">
              <Button>Back to Items</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Browse Items', path: '/items' },
    { label: item.title }
  ];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Back Button */}
          <Link
            to="/items"
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Items
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <img
                  src={item.images[currentImageIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {item.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-sm rounded">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {item.images.length > 1 && (
                <div className="flex space-x-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isFavorited || item.isFavorited
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-500'
                        }`}
                      />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.postedAt}</span>
                  </div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Brand</p>
                  <p className="font-medium">{item.brand}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Size</p>
                  <p className="font-medium">{item.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-medium">{item.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Exchange Value</p>
                  <p className="font-medium text-green-600">{item.price}</p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Propose Exchange
                </Button>
                <Button variant="outline" className="flex-1">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Verified Seller</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4" />
                    <span>Safe Exchange</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RotateCcw className="w-4 h-4" />
                    <span>Return Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Measurements</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(item.measurements).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Exchange Preferences</h4>
                  <ul className="space-y-1">
                    {item.exchangePreferences.map((pref, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        {pref}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{item.seller.name}</h4>
                      {item.seller.verified && (
                        <Shield className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.seller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Exchanges:</span>
                    <span className="font-medium">{item.seller.totalExchanges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium">{item.seller.joinedDate}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Items
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetail;
