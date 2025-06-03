class Steganography {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    // Convert text to binary
    textToBinary(text) {
        return text.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join('');
    }

    // Convert binary to text
    binaryToText(binary) {
        let text = '';
        for (let i = 0; i < binary.length; i += 8) {
            const byte = binary.slice(i, i + 8);
            if (byte.length === 8) {
                text += String.fromCharCode(parseInt(byte, 2));
            }
        }
        return text;
    }

    // Encode message into image
    async encode(imageFile, message) {
        try {
            // Create image element and load the file
            const img = await this.loadImage(imageFile);
            
            // Set canvas dimensions to match image
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            
            // Draw image on canvas
            this.ctx.drawImage(img, 0, 0);
            
            // Get image data
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const data = imageData.data;
            
            // Convert message to binary and add delimiter
            const binaryMessage = this.textToBinary(message) + '1111111111111110';
            
            // Check if image is large enough
            const maxMessageLength = Math.floor((this.canvas.width * this.canvas.height * 3) / 8) - 1;
            if (message.length > maxMessageLength) {
                throw new Error(`Message too long. Maximum length for this image: ${maxMessageLength} characters`);
            }
            
            let messageIndex = 0;
            
            // Modify pixels to hide the message
            for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
                // Only modify RGB channels (skip alpha)
                for (let j = 0; j < 3 && messageIndex < binaryMessage.length; j++) {
                    const bit = parseInt(binaryMessage[messageIndex]);
                    // Clear the LSB and set it to our bit
                    data[i + j] = (data[i + j] & 0xFE) | bit;
                    messageIndex++;
                }
            }
            
            // Put modified data back on canvas
            this.ctx.putImageData(imageData, 0, 0);
            
            // Convert canvas to blob
            return new Promise((resolve) => {
                this.canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            });
            
        } catch (error) {
            throw new Error(`Encoding failed: ${error.message}`);
        }
    }

    // Decode message from image
    async decode(imageFile) {
        try {
            // Create image element and load the file
            const img = await this.loadImage(imageFile);
            
            // Set canvas dimensions to match image
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            
            // Draw image on canvas
            this.ctx.drawImage(img, 0, 0);
            
            // Get image data
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const data = imageData.data;
            
            let binaryMessage = '';
            
            // Extract bits from pixels
            for (let i = 0; i < data.length; i += 4) {
                // Only read RGB channels (skip alpha)
                for (let j = 0; j < 3; j++) {
                    // Extract the least significant bit
                    const bit = data[i + j] & 1;
                    binaryMessage += bit.toString();
                    
                    // Check for delimiter
                    if (binaryMessage.length >= 16) {
                        const lastBits = binaryMessage.slice(-16);
                        if (lastBits === '1111111111111110') {
                            // Found delimiter, remove it and decode message
                            binaryMessage = binaryMessage.slice(0, -16);
                            return this.binaryToText(binaryMessage);
                        }
                    }
                }
            }
            
            throw new Error('No hidden message found in this image');
            
        } catch (error) {
            throw new Error(`Decoding failed: ${error.message}`);
        }
    }

    // Helper function to load image file
    loadImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = URL.createObjectURL(file);
        });
    }
} 