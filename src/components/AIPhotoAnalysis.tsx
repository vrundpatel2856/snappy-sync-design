
import React, { useState, useCallback } from 'react';
import { Upload, Brain, Star, Camera, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AnalysisResult {
  category: string;
  color: string;
  material: string;
  style: string;
  condition: string;
  confidence: number;
  suggestedPrice: number;
  description: string;
}

const AIPhotoAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in a real app, this would call an AI service)
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        category: 'Jacket',
        color: 'Blue Denim',
        material: 'Cotton Denim',
        style: 'Vintage/Casual',
        condition: 'Good',
        confidence: 92,
        suggestedPrice: 45,
        description: 'Classic denim jacket in good condition. Shows minimal wear with authentic vintage appeal. Perfect for layering.'
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">See AI in Action</h1>
        <p className="text-gray-600">Watch how our AI analyzes, matches, and prices items in real-time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <CardHeader>
            <Camera className="w-12 h-12 mx-auto text-green-500 mb-2" />
            <CardTitle className="text-lg">Upload Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Take or upload a photo of your clothing item</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Brain className="w-12 h-12 mx-auto text-purple-500 mb-2" />
            <CardTitle className="text-lg">AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Our AI identifies category, condition, and value</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Star className="w-12 h-12 mx-auto text-blue-500 mb-2" />
            <CardTitle className="text-lg">Perfect Match</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Get matched with interested buyers instantly</p>
          </CardContent>
        </Card>
      </div>

      {!selectedImage ? (
        <Card>
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload your clothing photo
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your photo here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="photo-upload"
              />
              <Button
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="bg-green-600 hover:bg-green-700"
              >
                Choose Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={selectedImage}
                alt="Uploaded clothing"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex space-x-2">
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
                <Button onClick={resetAnalysis} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <Loader className="w-8 h-8 mx-auto text-green-600 animate-spin mb-4" />
                  <p className="text-gray-600">AI is analyzing your image...</p>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-500">Identifying category...</div>
                    <div className="text-sm text-gray-500">Analyzing condition...</div>
                    <div className="text-sm text-gray-500">Calculating value...</div>
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Confidence Score:</span>
                    <span className="text-green-600 font-bold">{analysisResult.confidence}%</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{analysisResult.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Color</label>
                      <p className="text-gray-900">{analysisResult.color}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Material</label>
                      <p className="text-gray-900">{analysisResult.material}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Style</label>
                      <p className="text-gray-900">{analysisResult.style}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Condition</label>
                      <p className="text-gray-900">{analysisResult.condition}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Suggested Price</label>
                      <p className="text-green-600 font-bold">${analysisResult.suggestedPrice}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900 text-sm mt-1">{analysisResult.description}</p>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Create Listing
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Click "Analyze with AI" to see the magic happen!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIPhotoAnalysis;
