import React from 'react';
import { Binary, Image, Lock, ArrowRight, Code, Shield, Cpu, Database, Key, Eye, FileCheck } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Image className="h-8 w-8 text-white" />,
      title: "Image Analysis",
      description: "Advanced pixel-level processing of your image's color channels."
    },
    {
      icon: <Lock className="h-8 w-8 text-white" />,
      title: "Message Encryption",
      description: "Your message is encrypted before being embedded in the image."
    },
    {
      icon: <Binary className="h-8 w-8 text-white" />,
      title: "LSB Embedding",
      description: "Secure bit-level modifications preserve image quality while hiding data."
    }
  ];

  const features = [
    {
      icon: <Key className="h-6 w-6 text-white" />,
      title: "Secure Encryption",
      description: "Military-grade encryption protects your hidden messages."
    },
    {
      icon: <Eye className="h-6 w-6 text-white" />,
      title: "Visual Preservation",
      description: "Changes are imperceptible to the human eye."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-white" />,
      title: "Format Support",
      description: "Works with PNG and JPEG images up to 5MB."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 px-6 py-16">
      <FadeIn>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold mb-4 text-white">How SteganoHide Works</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the advanced technology behind our steganography implementation.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <div className="feature-card bg-black/40 border-white/5">
              <div className="flex flex-col items-center text-center space-y-4">
                {step.icon}
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="stegano-card bg-black/40 border-white/5">
              <div className="flex flex-col items-center text-center space-y-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-8">
          <div className="stegano-card bg-black/40 border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">Technical Process</h2>
            </div>
            <div className="space-y-6 text-gray-400">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">1. Image Processing</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Convert image to pixel data using HTML5 Canvas</li>
                  <li>Extract RGB color channels for each pixel</li>
                  <li>Analyze image capacity for message storage</li>
                  <li>Prepare image data for bit manipulation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">2. Message Preparation</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encrypt message using AES encryption</li>
                  <li>Convert encrypted data to binary format</li>
                  <li>Add secure end markers for extraction</li>
                  <li>Validate message size against image capacity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3. Data Embedding</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify least significant bits of pixel data</li>
                  <li>Distribute message bits across the image</li>
                  <li>Preserve image quality and appearance</li>
                  <li>Add error detection and validation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="stegano-card bg-black/40 border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">Security Features</h2>
            </div>
            <div className="space-y-4 text-gray-400">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption of messages</li>
                <li>Secure key validation and handling</li>
                <li>Random bit distribution patterns</li>
                <li>Error detection and correction</li>
                <li>Local processing for maximum privacy</li>
              </ul>
            </div>
          </div>

          <div className="stegano-card bg-black/40 border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-semibold text-white">Performance</h2>
            </div>
            <div className="space-y-4 text-gray-400">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Optimized algorithms for fast processing</li>
                <li>Efficient memory usage and management</li>
                <li>Browser-based execution for instant results</li>
                <li>Support for various image sizes and formats</li>
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Ready to Try It?</h2>
          <p className="text-gray-400">
            Experience secure steganography with our easy-to-use tool.
          </p>
          <a 
            href="/tool" 
            className="stegano-button stegano-button-primary inline-flex items-center"
          >
            Start Encoding
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </FadeIn>
    </div>
  );
};

export default HowItWorks;