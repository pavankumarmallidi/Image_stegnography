const sharp = require('sharp');
const SteganographyService = require('../services/steganographyService');

class SteganographyController {
    async encodeMessage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No image file provided' });
            }

            const { message } = req.body;
            if (!message || message.trim().length === 0) {
                return res.status(400).json({ error: 'No message provided' });
            }

            // Get image buffer and metadata
            const imageBuffer = req.file.buffer;
            const metadata = await sharp(imageBuffer).metadata();

            // Check if image is large enough to hold the message
            const maxMessageLength = Math.floor((metadata.width * metadata.height * 3) / 8) - 1;
            if (message.length > maxMessageLength) {
                return res.status(400).json({ 
                    error: `Message too long. Maximum length for this image: ${maxMessageLength} characters` 
                });
            }

            // Encode the message
            const encodedImageBuffer = await SteganographyService.encodeMessage(imageBuffer, message);

            // Send the encoded image back
            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="encoded_${req.file.originalname.split('.')[0]}.png"`
            });

            res.send(encodedImageBuffer);

        } catch (error) {
            console.error('Encoding error:', error);
            res.status(500).json({ error: 'Failed to encode message' });
        }
    }

    async decodeMessage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No image file provided' });
            }

            const imageBuffer = req.file.buffer;
            
            // Decode the message
            const decodedMessage = await SteganographyService.decodeMessage(imageBuffer);

            if (!decodedMessage) {
                return res.status(400).json({ error: 'No hidden message found in this image' });
            }

            res.json({ message: decodedMessage });

        } catch (error) {
            console.error('Decoding error:', error);
            res.status(500).json({ error: 'Failed to decode message' });
        }
    }
}

module.exports = new SteganographyController(); 