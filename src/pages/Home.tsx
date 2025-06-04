import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Search, Shield, Zap, Brain, ArrowRight, CheckCircle, FileText, Settings, Code, Eye, Database, Cloud, Binary, Cpu, Network, Layout, Workflow, Key, MessageSquare, Share2, FileCheck, AlertTriangle, BookOpen, Laptop, Server, PenTool as Tool, ShieldCheck, Fingerprint, Globe, Users } from 'lucide-react';
import BackgroundGradient from '../components/animations/BackgroundGradient';
import FadeIn from '../components/animations/FadeIn';

function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(20, 20, 20, 0.9) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(15, 15, 15, 0.8) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(25, 25, 25, 0.9) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #111111 50%, #0a0a0a 100%)
          `
        }}
      />
      
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

const ScrollingCards = ({ cards }: { cards: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="relative h-[400px] overflow-hidden">
      <motion.div 
        className="absolute w-full space-y-4"
        style={{ y }}
      >
        {cards.map((card, index) => (
          <div key={index} className="stegano-card bg-black/40 border-white/5">
            <div className="flex items-center space-x-4">
              {card.icon}
              <div>
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-gray-400">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Home = () => {
  const mainFeatures = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Secure Encoding",
      description: "Hide your messages securely using advanced LSB steganography techniques."
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Easy Decoding",
      description: "Extract hidden messages from images with just a few clicks."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Privacy First",
      description: "All processing happens in your browser. Your data never leaves your device."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "Process your images instantly with optimized algorithms."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Smart Processing",
      description: "Advanced algorithms ensure your messages are hidden securely."
    }
  ];

  const technicalFeatures = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Advanced LSB Algorithm",
      description: "State-of-the-art Least Significant Bit implementation."
    },
    {
      icon: <Eye className="h-6 w-6 text-primary" />,
      title: "Visual Quality Preservation",
      description: "Maintains image quality while hiding data."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Efficient Storage",
      description: "Optimized data storage in image pixels."
    },
    {
      icon: <Cloud className="h-6 w-6 text-primary" />,
      title: "Browser-Based",
      description: "No installation needed, works in any modern browser."
    },
    {
      icon: <Binary className="h-6 w-6 text-primary" />,
      title: "Binary Operations",
      description: "Low-level bit manipulation for secure hiding."
    }
  ];

  const processingFeatures = [
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "Fast Processing",
      description: "Optimized for quick encoding and decoding."
    },
    {
      icon: <Network className="h-6 w-6 text-primary" />,
      title: "Offline Support",
      description: "Works without internet connection."
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: "Multiple Formats",
      description: "Support for various image formats."
    },
    {
      icon: <Workflow className="h-6 w-6 text-primary" />,
      title: "Streamlined Process",
      description: "Simple and intuitive workflow."
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Customizable",
      description: "Adjustable encoding parameters."
    }
  ];

  const securityFeatures = [
    {
      icon: <Key className="h-6 w-6 text-primary" />,
      title: "Optional Encryption",
      description: "Additional layer of security for messages."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Data Protection",
      description: "Secure handling of sensitive information."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-primary" />,
      title: "No Tracking",
      description: "Zero data collection or analytics."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      title: "Error Detection",
      description: "Built-in error checking mechanisms."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-primary" />,
      title: "Format Verification",
      description: "Automatic file format validation."
    }
  ];

  const useCaseFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Secure Communication",
      description: "Private message exchange through images."
    },
    {
      icon: <Tool className="h-6 w-6 text-primary" />,
      title: "Digital Watermarking",
      description: "Protect intellectual property."
    },
    {
      icon: <Share2 className="h-6 w-6 text-primary" />,
      title: "Data Distribution",
      description: "Secure information sharing."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Educational Use",
      description: "Learn about steganography."
    },
    {
      icon: <Laptop className="h-6 w-6 text-primary" />,
      title: "Research",
      description: "Academic applications."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "No Server Storage",
      description: "All processing done locally."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Access",
      description: "Available worldwide, no restrictions."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Community Driven",
      description: "Open source development."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Privacy Focused",
      description: "Your privacy is our priority."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Smart Features",
      description: "Intelligent processing capabilities."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black">
      <HeroBackground />

      {/* Hero Section with Animated Header */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">100% Free • Browser-based • Secure</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Hide your secrets
                <br />
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  in plain sight
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Transform your images into secure message carriers using advanced steganography. 
                Simple, secure, and completely private.
              </p>

              <div className="flex justify-center gap-4 pt-8">
                <Link
                  to="/tool"
                  className="stegano-button stegano-button-primary inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="stegano-button stegano-button-secondary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main Features Grid */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Powerful Features
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="feature-card bg-black/40 border-white/5">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Cards Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <h2 className="text-2xl font-bold mb-8 text-white">Technical Features</h2>
                <ScrollingCards cards={technicalFeatures} />
              </FadeIn>
            </div>
            <div>
              <FadeIn>
                <h2 className="text-2xl font-bold mb-8 text-white">Processing Features</h2>
                <ScrollingCards cards={processingFeatures} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <h2 className="text-2xl font-bold mb-8 text-white">Security Features</h2>
                <ScrollingCards cards={securityFeatures} />
              </FadeIn>
            </div>
            <div>
              <FadeIn>
                <h2 className="text-2xl font-bold mb-8 text-white">Use Cases</h2>
                <ScrollingCards cards={useCaseFeatures} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-8 text-white text-center">Additional Features</h2>
            <div className="max-w-3xl mx-auto">
              <ScrollingCards cards={additionalFeatures} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Hide Your Messages?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of users who trust SteganoHide for their steganography needs.
            </p>
            <Link
              to="/tool"
              className="stegano-button stegano-button-primary inline-flex items-center"
            >
              Start Encoding Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;