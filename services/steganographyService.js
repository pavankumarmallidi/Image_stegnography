const sharp = require('sharp');

class SteganographyService {
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

    // Encode message into image using LSB steganography
    async encodeMessage(imageBuffer, message) {
        try {
            // Convert image to raw pixel data
            const { data, info } = await sharp(imageBuffer)
                .raw()
                .toBuffer({ resolveWithObject: true });

            // Convert message to binary and add delimiter
            const binaryMessage = this.textToBinary(message) + '1111111111111110'; // Delimiter
            
            let dataIndex = 0;
            let messageIndex = 0;

            // Modify pixels to hide the message
            for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i++) {
                if (i % info.channels < 3) { // Only modify RGB channels (skip alpha if present)
                    // Get the current pixel value
                    let pixelValue = data[i];
                    
                    // Modify the least significant bit
                    if (messageIndex < binaryMessage.length) {
                        const bit = parseInt(binaryMessage[messageIndex]);
                        
                        // Clear the LSB and set it to our bit
                        pixelValue = (pixelValue & 0xFE) | bit;
                        data[i] = pixelValue;
                        
                        messageIndex++;
                    }
                }
            }

            // Convert back to PNG format
            const encodedImageBuffer = await sharp(data, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: info.channels
                }
            }).png().toBuffer();

            return encodedImageBuffer;

        } catch (error) {
            throw new Error(`Encoding failed: ${error.message}`);
        }
    }

    // Decode message from image using LSB steganography
    async decodeMessage(imageBuffer) {
        try {
            // Convert image to raw pixel data
            const { data, info } = await sharp(imageBuffer)
                .raw()
                .toBuffer({ resolveWithObject: true });

            let binaryMessage = '';
            let pixelIndex = 0;

            // Extract bits from pixels
            for (let i = 0; i < data.length; i++) {
                if (i % info.channels < 3) { // Only read RGB channels
                    // Extract the least significant bit
                    const bit = data[i] & 1;
                    binaryMessage += bit.toString();

                    // Check for delimiter
                    if (binaryMessage.length >= 16) {
                        const lastBits = binaryMessage.slice(-16);
                        if (lastBits === '1111111111111110') {
                            // Found delimiter, remove it and decode message
                            binaryMessage = binaryMessage.slice(0, -16);
                            break;
                        }
                    }
                }
            }

            if (binaryMessage.length === 0) {
                return null;
            }

            // Convert binary to text
            const decodedMessage = this.binaryToText(binaryMessage);
            return decodedMessage;

        } catch (error) {
            throw new Error(`Decoding failed: ${error.message}`);
        }
    }
}

module.exports = new SteganographyService(); 