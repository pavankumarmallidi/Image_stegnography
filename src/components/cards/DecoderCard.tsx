import React, { useState } from 'react';
import { Download, Search, Check, AlertCircle, Key } from 'lucide-react';
import FileDropzone from '../ui/FileDropzone';
import { decodeMessage } from '../../utils/steganography';

const DecoderCard: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [key, setKey] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'decoding' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');

  const handleImageUpload = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setStatus('idle');
    setDecodedMessage('');
    setStatusMessage('');
  };

  const handleDecode = async () => {
    if (!image) {
      setStatus('error');
      setStatusMessage('Please select an image first');
      return;
    }

    if (!key || key.length < 8) {
      setStatus('error');
      setStatusMessage('Please enter a valid encryption key (minimum 8 characters)');
      return;
    }

    try {
      setStatus('decoding');
      setStatusMessage('Analyzing image...');
      
      const message = await decodeMessage(image, key);
      
      setDecodedMessage(message);
      setStatus('success');
      setStatusMessage('Message decoded successfully!');
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage('Failed to decode message');
      }
    }
  };

  return (
    <div className="stegano-card">
      <div className="space-y-6">
        <FileDropzone 
          onFileSelected={handleImageUpload} 
          accept="image/png,image/jpeg"
          label="Upload an image to decode a hidden message"
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
          <label htmlFor="key" className="block text-sm font-medium mb-2">
            Encryption Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              id="key"
              className="stegano-input pl-10"
              placeholder="Enter the encryption key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter the key that was used to encode the message (minimum 8 characters)
          </p>
        </div>
        
        <button 
          className={`stegano-button stegano-button-secondary w-full ${status === 'decoding' ? 'opacity-80' : ''}`}
          onClick={handleDecode}
          disabled={status === 'decoding' || !image || !key}
        >
          {status === 'decoding' ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 text-secondary-foreground border-2 border-current border-t-transparent rounded-full" />
              Decoding...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" />
              Decode Message
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
        
        {decodedMessage && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Decoded Message
            </label>
            <div className="stegano-textarea overflow-auto">
              <p className="whitespace-pre-wrap">{decodedMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecoderCard;