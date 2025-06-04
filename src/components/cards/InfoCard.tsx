import React from 'react';
import { Info, ShieldAlert, Lock, Eye } from 'lucide-react';

const InfoCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Lock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">LSB Technique</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            The Least Significant Bit (LSB) technique works by replacing the least significant bit of each pixel's color 
            channel with a bit from the secret message.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2 mb-3">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Security</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            While steganography can hide messages, consider encrypting sensitive data before encoding for maximum security.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Visual Impact</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            The LSB technique causes minimal visual changes to the image while securely hiding your message.
          </p>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Technical Process</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>The secret message is converted to binary data</li>
            <li>Each bit of the message is stored in the LSB of a pixel's color channel</li>
            <li>A special sequence marks the end of the hidden message</li>
            <li>During decoding, the LSBs are extracted and converted back to text</li>
          </ol>
        </div>
      </div>
      
      <p className="text-center text-sm text-muted-foreground">
        This browser-based tool performs all operations locally without sending your data to any server.
        Your privacy and security are maintained throughout the process.
      </p>
    </div>
  );
};

export default InfoCard;