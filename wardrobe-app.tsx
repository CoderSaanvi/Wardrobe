import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Expanded mock wardrobe with cocktail and formal attire
const mockWardrobe = {
  tops: [
    { id: 1, type: 'top', description: 'White Button-Down Shirt', categories: ['business', 'casual'], color: 'white' },
    { id: 2, type: 'top', description: 'Gray Athletic Tank', categories: ['workout'], color: 'gray' },
    { id: 3, type: 'top', description: 'Navy Blazer', categories: ['business', 'cocktail'], color: 'navy' },
    { id: 4, type: 'top', description: 'Sequin Blouse', categories: ['cocktail'], color: 'silver' },
    { id: 5, type: 'top', description: 'Black Tuxedo Jacket', categories: ['formal'], color: 'black' },
    { id: 6, type: 'top', description: 'Embellished Evening Top', categories: ['formal', 'cocktail'], color: 'burgundy' }
  ],
  bottoms: [
    { id: 7, type: 'bottom', description: 'Black Dress Pants', categories: ['business'], color: 'black' },
    { id: 8, type: 'bottom', description: 'Athletic Shorts', categories: ['workout'], color: 'black' },
    { id: 9, type: 'bottom', description: 'Blue Jeans', categories: ['casual'], color: 'blue' },
    { id: 10, type: 'bottom', description: 'Cocktail Dress', categories: ['cocktail'], color: 'black' },
    { id: 11, type: 'bottom', description: 'Floor-Length Gown', categories: ['formal'], color: 'navy' },
    { id: 12, type: 'bottom', description: 'Formal Tuxedo Pants', categories: ['formal'], color: 'black' }
  ]
};

const WardrobeAssistant = () => {
  const [selectedCategory, setSelectedCategory] = useState('casual');
  const [suggestedOutfit, setSuggestedOutfit] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  // Updated categories array with new options
  const categories = ['casual', 'business', 'workout', 'cocktail', 'formal'];

  const generateOutfit = (category) => {
    // Filter clothes by category
    const availableTops = mockWardrobe.tops.filter(item => 
      item.categories.includes(category)
    );
    const availableBottoms = mockWardrobe.bottoms.filter(item => 
      item.categories.includes(category)
    );

    // Randomly select items
    const top = availableTops[Math.floor(Math.random() * availableTops.length)];
    const bottom = availableBottoms[Math.floor(Math.random() * availableBottoms.length)];

    setSuggestedOutfit({ top, bottom });
  };

  const handleAddClothing = () => {
    setShowCamera(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Your Wardrobe Assistant</h1>
        
        <div className="mb-6">
          <button 
            onClick={handleAddClothing}
            className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg hover:bg-gray-50"
          >
            <Camera className="mr-2" />
            <span>Add New Clothing Item</span>
          </button>
        </div>

        {showCamera && (
          <Alert className="mb-4">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to take photos of your clothing items.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generate Outfit</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  generateOutfit(category);
                }}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {suggestedOutfit && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Suggested Outfit for {selectedCategory}:</h3>
            <div className="space-y-2">
              <p>Top: {suggestedOutfit.top.description}</p>
              <p>Bottom: {suggestedOutfit.bottom.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobeAssistant;
