import React, { useState } from 'react';
import { Upload, Lock, Check, AlertCircle, Key } from 'lucide-react';
import FileDropzone from '../ui/FileDropzone';
import { encodeMessage } from '../../utils/steganography';

const EncoderCard: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'encoding' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setStatus('idle');
  };

  const handleEncode = async () => {
    if (!image || !message || !key) {
      setStatus('error');
      setStatusMessage('Please provide an image, message, and encryption key.');
      return;
    }

    if (key.length < 8) {
      setStatus('error');
      setStatusMessage('Encryption key must be at least 8 characters long.');
      return;
    }

    try {
      setStatus('encoding');
      setStatusMessage('Encoding your message...');

      const encodedImage = await encodeMessage(image, message, key);
      
      // Create download link
      const link = document.createElement('a');
      link.href = encodedImage;
      link.download = `steganohide-${image.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setStatus('success');
      setStatusMessage('Message encoded successfully! Image downloaded.');
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to encode message. Try a different image or shorter message.');
      console.error(error);
    }
  };

  return (
    <div className="stegano-card">
      <div className="space-y-6">
        <FileDropzone 
          onFileSelected={handleImageUpload} 
          accept="image/png,image/jpeg"
          label="Upload an image to hide your message"
        />
        
        {preview && (
          <div className="mt-4 relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-contain rounded-md border border-border/40 bg-black/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-md flex items-end justify-center p-2">
              <span className="text-xs text-muted-foreground">{image?.name}</span>
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Secret Message
          </label>
          <textarea 
            id="message"
            className="stegano-textarea"
            placeholder="Enter the secret message you want to hide..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="key" className="block text-sm font-medium mb-2">
            Encryption Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              id="key"
              className="stegano-input pl-10"
              placeholder="Enter your encryption key (minimum 8 characters)..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            You'll need this key to decode the message later (minimum 8 characters)
          </p>
        </div>
        
        <button 
          className={`stegano-button stegano-button-primary w-full ${status === 'encoding' ? 'opacity-80' : ''}`}
          onClick={handleEncode}
          disabled={status === 'encoding' || !image || !message || !key}
        >
          {status === 'encoding' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Encoding...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Upload className="mr-2 h-4 w-4" />
              Encode & Download
            </span>
          )}
        </button>
        
        {status !== 'idle' && (
          <div className={`mt-4 p-3 rounded-md flex items-center space-x-2 ${
            status === 'success' ? 'bg-green-500/10 text-green-400' : 
            status === 'error' ? 'bg-red-500/10 text-red-400' : 
            'bg-blue-500/10 text-blue-400'
          }`}>
            {status === 'success' ? (
              <Check className="h-5 w-5 flex-shrink-0" />
            ) : status === 'error' ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
            )}
            <span className="text-sm">{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncoderCard;