import React from 'react';
import FadeIn from '../components/animations/FadeIn';
import { Lock, Shield, Code, Brain, Users, Globe, FileText, Image, Binary, Cpu, Network, Database, Cloud, Zap, Key, Eye, Settings, PenTool as Tool, Share2, MessageSquare, FileCheck, AlertTriangle, BookOpen, Laptop, Server, Workflow, Layout, Fingerprint, ShieldCheck } from 'lucide-react';

function About() {
  const features = [
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Privacy First",
      description: "All operations are performed locally in your browser, ensuring your data never leaves your device."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure Implementation",
      description: "Advanced LSB techniques with encryption for maximum security."
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Modern Technology",
      description: "Built with the latest web technologies for optimal performance."
    }
  ];

  const techStack = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Smart Algorithms",
      description: "Advanced steganography algorithms for optimal message hiding."
    },
    {
      icon: <Binary className="h-6 w-6 text-primary" />,
      title: "Bit Manipulation",
      description: "Precise bit-level operations for seamless message integration."
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "Fast Processing",
      description: "Optimized for quick encoding and decoding operations."
    }
  ];

  const securityFeatures = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "End-to-End Security",
      description: "Complete privacy throughout the entire process."
    },
    {
      icon: <Key className="h-6 w-6 text-primary" />,
      title: "Encryption",
      description: "Strong encryption for additional security."
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Visual Quality",
      description: "Maintains image quality while hiding data."
    }
  ];

  const useCases = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Private Communication",
      description: "Secure message exchange through images."
    },
    {
      icon: <Tool className="h-6 w-6 text-primary" />,
      title: "Digital Watermarking",
      description: "Protect your digital content."
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary" />,
      title: "Secure Sharing",
      description: "Share sensitive information safely."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      <FadeIn>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold mb-4">About SteganoHide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SteganoHide is a cutting-edge steganography tool that enables secure message hiding within digital images. 
            Built with privacy and security in mind, it operates entirely in your browser.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="stegano-card">
              <div className="flex flex-col items-center text-center space-y-3">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="stegano-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  {tech.icon}
                  <h3 className="text-xl font-semibold">{tech.title}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="stegano-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="stegano-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  {useCase.icon}
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="stegano-card">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Who Uses SteganoHide?</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              SteganoHide serves a diverse community of users who value privacy and security:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Privacy-conscious individuals seeking secure communication</li>
              <li>Digital artists protecting their work</li>
              <li>Security researchers and students</li>
              <li>Organizations requiring secure data transmission</li>
              <li>Anyone needing to hide sensitive information</li>
            </ul>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="stegano-card">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Our Commitment</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We are committed to providing secure, accessible steganography tools while maintaining:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Complete privacy and security</li>
              <li>High-quality image processing</li>
              <li>User-friendly interface</li>
              <li>Regular updates and improvements</li>
              <li>Educational resources about steganography</li>
            </ul>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default About;