
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIPhotoAnalysis from '@/components/AIPhotoAnalysis';
import Breadcrumb from '@/components/Breadcrumb';

const AIAnalysis = () => {
  const breadcrumbItems = [
    { label: 'AI Analysis' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          <AIPhotoAnalysis />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIAnalysis;
