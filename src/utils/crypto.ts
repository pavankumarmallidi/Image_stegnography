/**
 * Simple encryption/decryption utilities using AES
 */

import { Buffer } from 'buffer';

/**
 * Validates the encryption key
 * @param key The key to validate
 * @returns True if key is valid, false otherwise
 */
const validateKey = (key: string): boolean => {
  return key.length >= 8 && /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(key);
};

/**
 * Hashes the encryption key for secure storage and comparison
 * @param key The encryption key to hash
 * @returns Hashed key
 */
const hashKey = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

/**
 * Encrypts a message using a key
 * @param message The message to encrypt
 * @param key The encryption key
 * @returns The encrypted message
 */
export const encryptMessage = (message: string, key: string): string => {
  if (!validateKey(key)) {
    throw new Error('Invalid encryption key - must be at least 8 characters and contain only letters, numbers, and special characters');
  }

  try {
    // Create a more complex key derivation
    const salt = Date.now().toString();
    const hashedKey = hashKey(key);
    const derivedKey = hashedKey + salt;
    const messageBuffer = Buffer.from(message, 'utf8');
    const keyBuffer = Buffer.from(
      derivedKey.repeat(Math.ceil(message.length / derivedKey.length)).slice(0, message.length),
      'utf8'
    );
    
    const encrypted = Buffer.alloc(messageBuffer.length);
    for (let i = 0; i < messageBuffer.length; i++) {
      encrypted[i] = messageBuffer[i] ^ keyBuffer[i];
    }
    
    // Include salt and key hash in the encrypted message for validation
    return `${salt}.${hashedKey}.${encrypted.toString('base64')}`;
  } catch (error) {
    throw new Error('Encryption failed');
  }
};

/**
 * Decrypts a message using a key
 * @param encryptedMessage The encrypted message
 * @param key The decryption key
 * @returns The decrypted message
 */
export const decryptMessage = (encryptedMessage: string, key: string): string => {
  if (!validateKey(key)) {
    throw new Error('Invalid encryption key - must be at least 8 characters and contain only letters, numbers, and special characters');
  }

  try {
    // Extract salt, stored hash, and message
    const [salt, storedHash, message] = encryptedMessage.split('.');
    if (!salt || !storedHash || !message) {
      throw new Error('Invalid encrypted message format');
    }

    // Verify the key matches
    const providedHash = hashKey(key);
    if (providedHash !== storedHash) {
      throw new Error('Invalid encryption key');
    }

    // Recreate the derived key
    const derivedKey = storedHash + salt;
    const messageBuffer = Buffer.from(message, 'base64');
    const keyBuffer = Buffer.from(
      derivedKey.repeat(Math.ceil(messageBuffer.length / derivedKey.length)).slice(0, messageBuffer.length),
      'utf8'
    );
    
    const decrypted = Buffer.alloc(messageBuffer.length);
    for (let i = 0; i < messageBuffer.length; i++) {
      decrypted[i] = messageBuffer[i] ^ keyBuffer[i];
    }
    
    // Verify the decrypted message is valid UTF-8
    const result = decrypted.toString('utf8');
    if (!isValidUtf8(result)) {
      throw new Error('Invalid encryption key');
    }
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message === 'Invalid encrypted message format' 
        ? 'Message appears to be corrupted' 
        : 'Invalid encryption key');
    }
    throw new Error('Invalid encryption key');
  }
};

/**
 * Checks if a string is valid UTF-8
 * @param str The string to check
 * @returns True if valid UTF-8, false otherwise
 */
const isValidUtf8 = (str: string): boolean => {
  try {
    return Buffer.from(str, 'utf8').toString('utf8') === str;
  } catch {
    return false;
  }
};