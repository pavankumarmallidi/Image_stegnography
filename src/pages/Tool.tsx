import React, { useState } from 'react';
import { Lock, Search } from 'lucide-react';
import EncoderCard from '../components/cards/EncoderCard';
import DecoderCard from '../components/cards/DecoderCard';
import FadeIn from '../components/animations/FadeIn';

const Tool = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      <FadeIn>
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold">Steganography Tool</h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hide and extract messages from images using our secure steganography tools.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center my-12">
          <div className="inline-flex items-center rounded-lg border p-1.5 bg-secondary/50">
            <button
              className={`flex items-center px-6 py-3 rounded-md transition-all duration-200 ${
                mode === 'encode'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'hover:bg-secondary-foreground/10'
              }`}
              onClick={() => setMode('encode')}
            >
              <Lock className="w-5 h-5 mr-3" />
              Encode
            </button>
            
            <button
              className={`flex items-center px-6 py-3 rounded-md transition-all duration-200 ${
                mode === 'decode'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'hover:bg-secondary-foreground/10'
              }`}
              onClick={() => setMode('decode')}
            >
              <Search className="w-5 h-5 mr-3" />
              Decode
            </button>
          </div>
        </div>

        {/* Tool Cards */}
        <div className="max-w-2xl mx-auto mb-16">
          {mode === 'encode' ? <EncoderCard /> : <DecoderCard />}
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-3">
          <p>Supported formats: PNG, JPG/JPEG</p>
          <p>Maximum file size: 5MB</p>
        </div>
      </FadeIn>
    </div>
  );
};

export default Tool;