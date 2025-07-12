
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Shield, Search, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <Recycle className="w-8 h-8 text-green-600" />,
      title: 'Sustainable Fashion',
      description: 'Reduce textile waste by giving clothes a second life through community exchange.',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Community Driven',
      description: 'Connect with like-minded individuals who share your passion for sustainable living.',
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Safe & Secure',
      description: 'User verification, ratings, and secure exchange guidelines ensure your safety.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about your style preferences and size.',
      icon: <Plus className="w-6 h-6" />,
    },
    {
      step: '2',
      title: 'Browse & Search',
      description: 'Discover amazing clothing items from your local community.',
      icon: <Search className="w-6 h-6" />,
    },
    {
      step: '3',
      title: 'Exchange & Connect',
      description: 'Connect with other users to arrange safe exchanges.',
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Sustainable Fashion 
                  <span className="text-green-600"> Exchange</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join our community-driven platform to exchange, discover, and give new life to 
                  pre-loved clothing. Reduce waste while refreshing your wardrobe.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3" asChild>
                  <Link to="/signup" className="flex items-center space-x-2">
                    <span>Start Swapping</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3" asChild>
                  <Link to="/items">Browse Items</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>10,000+ Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>50,000+ Items Exchanged</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable fashion"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold text-gray-900">Vintage Denim Jacket</h3>
                  <p className="text-sm text-gray-600">Size M • Excellent Condition</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium">Available for Exchange</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <span>⭐ 4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl transform -rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines sustainability, community, and convenience to create 
              the perfect clothing exchange experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started with ReWear is simple. Follow these three easy steps 
              to begin your sustainable fashion journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-sm border h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Start Your Sustainable Fashion Journey?
            </h2>
            <p className="text-xl text-green-100">
              Join thousands of eco-conscious fashion lovers who are already making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
                <Link to="/signup" className="flex items-center space-x-2">
                  <span>Create Free Account</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-white border-white hover:bg-white hover:text-green-600" asChild>
                <Link to="/items">Explore Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
