/**
 * Steganography Utility Functions
 * Implements LSB (Least Significant Bit) steganography for hiding and retrieving text in images
 */

import { encryptMessage, decryptMessage } from './crypto';

/**
 * Encodes a message into an image using the LSB technique
 * @param image The image file to encode the message into
 * @param message The message to encode
 * @param key The encryption key
 * @returns A promise resolving to a data URL of the encoded image
 */
export const encodeMessage = async (image: File, message: string, key: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      // Encrypt the message first
      const encryptedMessage = encryptMessage(message, key);
      
      // Convert image to Image object
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Convert encrypted message to binary with marker
        const marker = '||END||';
        const binaryMessage = messageToBinary(encryptedMessage + marker);
        
        // Check if the image is large enough to hold the message
        const maxBits = Math.floor(data.length * 0.75);
        if (binaryMessage.length > maxBits) {
          reject(new Error('Message is too large for this image'));
          return;
        }
        
        // Encode message bits into image data
        let messageIndex = 0;
        for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i++) {
          // Skip alpha channel
          if (i % 4 === 3) continue;
          
          // Get current bit from message
          const messageBit = parseInt(binaryMessage[messageIndex]);
          
          // Modify the least significant bit
          data[i] = (data[i] & 0xFE) | messageBit;
          
          messageIndex++;
        }
        
        // Put modified pixel data back on canvas
        ctx.putImageData(imageData, 0, 0);
        
        // Convert canvas to PNG data URL
        const dataURL = canvas.toDataURL('image/png', 1.0);
        resolve(dataURL);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(image);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Decodes a message from an image that has been encoded using LSB steganography
 * @param image The image file to decode the message from
 * @param key The decryption key
 * @returns A promise resolving to the decoded message
 */
export const decodeMessage = async (image: File, key: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Extract binary message from image data
        let binaryMessage = '';
        let extractedMessage = '';
        const marker = '||END||';
        
        for (let i = 0; i < data.length; i++) {
          // Skip alpha channel
          if (i % 4 === 3) continue;
          
          // Get LSB from current pixel data
          const bit = data[i] & 1;
          binaryMessage += bit;
          
          // Process complete bytes
          if (binaryMessage.length === 8) {
            const charCode = parseInt(binaryMessage, 2);
            const char = String.fromCharCode(charCode);
            extractedMessage += char;
            binaryMessage = '';
            
            // Check for end marker
            if (extractedMessage.endsWith(marker)) {
              try {
                // Remove marker and decrypt
                const encryptedMessage = extractedMessage.slice(0, -marker.length);
                const decryptedMessage = decryptMessage(encryptedMessage, key);
                resolve(decryptedMessage);
                return;
              } catch (error) {
                reject(new Error('Invalid encryption key'));
                return;
              }
            }
            
            // Prevent infinite loops
            if (extractedMessage.length > data.length / 32) {
              reject(new Error('No hidden message found in this image'));
              return;
            }
          }
        }
        
        reject(new Error('No hidden message found in this image'));
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(image);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Converts a string message to binary
 * @param message The message to convert
 * @returns Binary string representation
 */
const messageToBinary = (message: string): string => {
  let binary = '';
  for (let i = 0; i < message.length; i++) {
    binary += message.charCodeAt(i).toString(2).padStart(8, '0');
  }
  return binary;
};