
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItemCard from '@/components/ItemCard';
import SearchFilters from '@/components/SearchFilters';
import Breadcrumb from '@/components/Breadcrumb';

// Mock data - in a real app, this would come from an API
const mockItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition. Perfect for layering and adds a timeless touch to any outfit.',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'M',
    condition: 'Excellent',
    brand: 'Levi\'s',
    location: 'San Francisco, CA',
    postedAt: '2 days ago',
    rating: 4.8,
    isFavorited: false,
  },
  {
    id: '2',
    title: 'Summer Floral Dress',
    description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight fabric with a flattering silhouette.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'S',
    condition: 'New',
    brand: 'Zara',
    location: 'Los Angeles, CA',
    postedAt: '1 day ago',
    rating: 4.9,
    isFavorited: true,
  },
  {
    id: '3',
    title: 'Designer Leather Boots',
    description: 'High-quality leather ankle boots with minimal wear. Comfortable and stylish for everyday wear.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: '8',
    condition: 'Good',
    brand: 'Doc Martens',
    location: 'Seattle, WA',
    postedAt: '3 days ago',
    rating: 4.7,
    isFavorited: false,
  },
  {
    id: '4',
    title: 'Cozy Knit Sweater',
    description: 'Soft and warm knit sweater in cream color. Perfect for chilly evenings and casual wear.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'L',
    condition: 'Excellent',
    brand: 'H&M',
    location: 'Portland, OR',
    postedAt: '1 week ago',
    rating: 4.6,
    isFavorited: false,
  },
  // Add more mock items...
];

const Items = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState(mockItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    size: [] as string[],
    condition: [] as string[],
    brand: '',
    priceRange: '',
    location: '',
  });

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    // Filter items based on search query and filters
    let filteredItems = mockItems;

    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.category !== 'All Categories') {
      // In a real app, you'd filter by category
    }

    if (filters.size.length > 0) {
      filteredItems = filteredItems.filter(item =>
        filters.size.includes(item.size)
      );
    }

    if (filters.condition.length > 0) {
      filteredItems = filteredItems.filter(item =>
        filters.condition.includes(item.condition)
      );
    }

    if (filters.brand) {
      filteredItems = filteredItems.filter(item =>
        item.brand?.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.location) {
      filteredItems = filteredItems.filter(item =>
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setItems(filteredItems);
  }, [searchQuery, filters]);

  const handleToggleFavorite = (itemId: string) => {
    setItems(items.map(item =>
      item.id === itemId
        ? { ...item, isFavorited: !item.isFavorited }
        : item
    ));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'All Categories',
      size: [],
      condition: [],
      brand: '',
      priceRange: '',
      location: '',
    });
  };

  const breadcrumbItems = [
    { label: 'Browse Items' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Items'}
              </h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} found
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-lg border p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filters Toggle */}
              <SearchFilters
                isOpen={filtersOpen}
                onToggle={() => setFiltersOpen(!filtersOpen)}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            {filtersOpen && (
              <div className="lg:col-span-1">
                <SearchFilters
                  isOpen={true}
                  onToggle={() => setFiltersOpen(false)}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}

            {/* Items Grid */}
            <div className={filtersOpen ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <SlidersHorizontal className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No items found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Items;
