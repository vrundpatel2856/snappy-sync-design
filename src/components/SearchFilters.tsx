
import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterState {
  category: string;
  size: string[];
  condition: string[];
  brand: string;
  priceRange: string;
  location: string;
}

interface SearchFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onToggle,
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const categories = [
    'All Categories',
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Accessories',
    'Activewear',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['New', 'Excellent', 'Good', 'Fair'];

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...filters.size, size]
      : filters.size.filter(s => s !== size);
    
    onFiltersChange({ ...filters, size: newSizes });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const newConditions = checked
      ? [...filters.condition, condition]
      : filters.condition.filter(c => c !== condition);
    
    onFiltersChange({ ...filters, condition: newConditions });
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center space-x-2"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </Button>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <Label>Size</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={filters.size.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-3">
        <Label>Condition</Label>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={`condition-${condition}`}
                checked={filters.condition.includes(condition)}
                onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
              />
              <Label htmlFor={`condition-${condition}`} className="text-sm">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          placeholder="Enter brand name"
          value={filters.brand}
          onChange={(e) => onFiltersChange({ ...filters, brand: e.target.value })}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Enter city or zip code"
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
        />
      </div>

      <Button 
        onClick={onToggle}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default SearchFilters;
