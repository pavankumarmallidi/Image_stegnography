import React from 'react';
import { Mail, Github, Linkedin, MessageSquare, Clock, Lock } from 'lucide-react';
import FadeIn from '../components/animations/FadeIn';

const Contact = () => {
  const contactInfo = [
    {
      icon: MessageSquare,
      title: "Email",
      content: "m.pavankumar255@gmail.com"
    },
    {
      icon: Clock,
      title: "Phone",
      content: "+91 9182213255"
    },
    {
      icon: Lock,
      title: "Security",
      content: "End-to-end encrypted"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 px-6 py-16">
      <FadeIn>
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about SteganoHide? Get in touch with us through any of these channels.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <div className="stegano-card bg-black/40 border-white/5 text-center">
              <info.icon className="h-6 w-6 mx-auto mb-4 text-white" />
              <h3 className="font-semibold mb-2 text-white">{info.title}</h3>
              <p className="text-gray-400">{info.content}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div className="stegano-card bg-black/40 border-white/5">
          <h2 className="text-xl font-semibold mb-4 text-white">Connect With Us</h2>
          <p className="text-gray-400 mb-6">
            Follow us on social media for updates and tips about steganography and digital privacy.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/pavankumarmallidi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/pavankumarreddymallidi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:m.pavankumar255@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="stegano-card bg-black/40 border-white/5">
          <h2 className="text-xl font-semibold mb-4 text-white">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 text-white">Is my data secure?</h3>
              <p className="text-gray-400">
                Yes! All processing happens locally in your browser. Your data never leaves your device.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-white">What file formats are supported?</h3>
              <p className="text-gray-400">
                We currently support PNG and JPEG formats, with PNG recommended for best results.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-white">Is there a file size limit?</h3>
              <p className="text-gray-400">
                Yes, we currently limit files to 5MB to ensure optimal performance.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-white">How secure is the encryption?</h3>
              <p className="text-gray-400">
                We use strong encryption with your provided key to ensure maximum security.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Contact;