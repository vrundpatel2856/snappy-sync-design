
import React, { useState } from 'react';
import { User, Package, Heart, Settings, Plus, TrendingUp, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ItemCard from '@/components/ItemCard';
import Breadcrumb from '@/components/Breadcrumb';

// Mock user data
const mockUser = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  location: 'San Francisco, CA',
  memberSince: 'January 2024',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  rating: 4.8,
  totalExchanges: 24,
  itemsListed: 12,
  favoriteItems: 8,
};

// Mock items data
const mockMyItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition.',
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
    description: 'Beautiful floral midi dress perfect for summer occasions.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    size: 'S',
    condition: 'New',
    brand: 'Zara',
    location: 'San Francisco, CA',
    postedAt: '1 day ago',
    rating: 4.9,
    isFavorited: false,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const breadcrumbItems = [
    { label: 'Dashboard' },
  ];

  const stats = [
    {
      title: 'Total Exchanges',
      value: mockUser.totalExchanges,
      icon: <TrendingUp className="w-4 h-4" />,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Items Listed',
      value: mockUser.itemsListed,
      icon: <Package className="w-4 h-4" />,
      change: '+3',
      changeType: 'positive' as const,
    },
    {
      title: 'Favorites',
      value: mockUser.favoriteItems,
      icon: <Heart className="w-4 h-4" />,
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      title: 'Rating',
      value: mockUser.rating,
      icon: <Star className="w-4 h-4" />,
      change: '+0.1',
      changeType: 'positive' as const,
    },
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
                Welcome back, {mockUser.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your items, track exchanges, and update your profile
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <a href="/add-item" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <img
                      src={mockUser.avatar}
                      alt={mockUser.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg text-gray-900">
                      {mockUser.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{mockUser.email}</p>
                    
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mockUser.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({mockUser.totalExchanges} exchanges)
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{mockUser.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {mockUser.memberSince}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => setActiveTab('profile')}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="items">My Items</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">
                                {stat.title}
                              </p>
                              <p className="text-2xl font-bold text-gray-900">
                                {stat.value}
                              </p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-full text-green-600">
                              {stat.icon}
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className={`text-sm ${
                              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change} from last month
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Your latest exchanges and interactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Your "Vintage Denim Jacket" received a new inquiry
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              You favorited "Designer Leather Boots"
                            </p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Exchange completed with @alexchen
                            </p>
                            <p className="text-xs text-gray-500">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="items" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">My Listed Items</h3>
                    <Button className="bg-green-600 hover:bg-green-700" asChild>
                      <a href="/add-item">Add New Item</a>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockMyItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="space-y-6">
                  <h3 className="text-lg font-semibold">Favorite Items</h3>
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      No favorites yet
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Start browsing items and save your favorites here
                    </p>
                    <Button variant="outline" asChild>
                      <a href="/items">Browse Items</a>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>
                        Update your personal information and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                          Profile settings coming soon
                        </h4>
                        <p className="text-gray-600">
                          We're working on profile customization features
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
