import React, { useState } from 'react';
import { Heart, Search, Filter, Grid, List, SortAsc, SortDesc, Trash2, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItemCard from '@/components/ItemCard';
import Breadcrumb from '@/components/Breadcrumb';

// Mock favorite items data
const mockFavorites = [
  {
    id: '1',
    title: 'Designer Leather Boots',
    description: 'Authentic leather ankle boots in excellent condition. Perfect for fall and winter styling.',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: '8',
    condition: 'Excellent',
    brand: 'Cole Haan',
    location: 'New York, NY',
    postedAt: '3 days ago',
    rating: 4.9,
    isFavorited: true,
    savedAt: '2024-01-15',
    category: 'Shoes'
  },
  {
    id: '2',
    title: 'Vintage Silk Scarf',
    description: 'Beautiful vintage silk scarf with floral pattern. A timeless accessory piece.',
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'One Size',
    condition: 'Good',
    brand: 'Hermès',
    location: 'Los Angeles, CA',
    postedAt: '1 week ago',
    rating: 4.7,
    isFavorited: true,
    savedAt: '2024-01-12',
    category: 'Accessories'
  },
  {
    id: '3',
    title: 'Cashmere Sweater',
    description: 'Luxurious cashmere sweater in neutral beige. Super soft and cozy for cold weather.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'M',
    condition: 'New',
    brand: 'Everlane',
    location: 'Seattle, WA',
    postedAt: '2 days ago',
    rating: 4.8,
    isFavorited: true,
    savedAt: '2024-01-14',
    category: 'Tops'
  },
  {
    id: '4',
    title: 'High-Waisted Jeans',
    description: 'Trendy high-waisted denim jeans in dark wash. Great fit and comfortable wear.',
    image: 'https://images.unsplash.com/photo-1541840031508-326b77c9a17e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'S',
    condition: 'Good',
    brand: 'Levi\'s',
    location: 'Austin, TX',
    postedAt: '5 days ago',
    rating: 4.6,
    isFavorited: true,
    savedAt: '2024-01-10',
    category: 'Bottoms'
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('savedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Favorites' },
  ];

  const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories', 'Dresses', 'Outerwear'];

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const filteredFavorites = favorites
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                <span>My Favorites</span>
              </h1>
              <p className="text-gray-600 mt-1">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share List
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllFavorites}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {favorites.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <CardTitle className="text-2xl text-gray-900 mb-4">
                  No favorites yet
                </CardTitle>
                <CardDescription className="text-lg mb-6 max-w-md mx-auto">
                  Start browsing items and click the heart icon to save your favorites here
                </CardDescription>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href="/items">Browse Items</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filters and Controls */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search favorites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      >
                        {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                      </Button>
                      
                      <div className="border-l pl-2">
                        <Button
                          variant={viewMode === 'grid' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode('list')}
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing {filteredFavorites.length} of {favorites.length} favorites
                </p>
                
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center space-x-2">
                    <span>Search: "{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>

              {/* Items Grid/List */}
              {filteredFavorites.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <CardTitle className="text-xl text-gray-900 mb-2">
                      No items match your filters
                    </CardTitle>
                    <CardDescription>
                      Try adjusting your search or filter criteria
                    </CardDescription>
                  </CardContent>
                </Card>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }>
                  {filteredFavorites.map((item) => (
                    <div key={item.id} className={viewMode === 'list' ? "flex" : ""}>
                      <ItemCard
                        item={item}
                        onToggleFavorite={handleToggleFavorite}
                      />
                      {viewMode === 'list' && (
                        <div className="flex-1 ml-4 flex flex-col justify-between">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              Saved {new Date(item.savedAt).toLocaleDateString()}
                            </Badge>
                            <p className="text-sm text-gray-600">
                              Added to favorites on {new Date(item.savedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
