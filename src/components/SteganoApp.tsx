import React, { useState } from 'react';
import EncoderCard from './cards/EncoderCard';
import DecoderCard from './cards/DecoderCard';
import InfoCard from './cards/InfoCard';
import { Lock, Search, Wand2, Zap, Shield, FileText } from 'lucide-react';

const SteganoApp: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-primary" />,
      title: "Advanced Steganography",
      description: "Hide messages in images with cutting-edge LSB techniques for undetectable results."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "Process your images instantly with our optimized algorithms."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description: "All processing happens in your browser. Your data never leaves your device."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="hero-badge">
              100% Free • Browser-based • Secure
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Transform Your Images into
            <br />
            <span className="text-primary">Secret Messages</span>
          </h1>
          <p className="text-muted-foreground max-w-[42rem] mx-auto text-lg">
            Hide and extract secret messages in images using advanced steganography. 
            Secure, private, and completely browser-based.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-lg border p-1 bg-secondary/50">
            <button
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                mode === 'encode'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary-foreground/10'
              }`}
              onClick={() => setMode('encode')}
            >
              <Lock className="w-4 h-4 mr-2" />
              Encode
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                mode === 'decode'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary-foreground/10'
              }`}
              onClick={() => setMode('decode')}
            >
              <Search className="w-4 h-4 mr-2" />
              Decode
            </button>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-2xl mx-auto">
        {mode === 'encode' ? <EncoderCard /> : <DecoderCard />}
      </div>

      {/* Features Grid */}
      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="flex flex-col items-center text-center space-y-2">
              {feature.icon}
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div id="how-it-works">
        <InfoCard />
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 pb-8">
        <h2 className="text-3xl font-bold">Ready to Hide Your Messages?</h2>
        <p className="text-muted-foreground">
          Join thousands of users who trust SteganoHide for their steganography needs.
        </p>
        <button 
          className="stegano-button stegano-button-primary"
          onClick={() => setMode('encode')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Start Encoding Now
        </button>
      </div>
    </div>
  );
};

export default SteganoApp;