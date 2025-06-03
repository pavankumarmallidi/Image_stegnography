const express = require('express');
const cors = require('cors');
const path = require('path');
const steganographyRoutes = require('./routes/steganography');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Routes
app.use('/api/steganography', steganographyRoutes);

// Serve static files from organized folders
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/html', express.static(path.join(__dirname, 'html')));

// Root route serves index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Serve HTML files directly from root path (without /html prefix)
app.get('/:page.html', (req, res) => {
    const page = req.params.page;
    const htmlPath = path.join(__dirname, 'html', `${page}.html`);
    
    // Check if file exists
    if (fs.existsSync(htmlPath)) {
        res.sendFile(htmlPath);
    } else {
        res.status(404).send('Page not found');
    }
});

// LSB Steganography functions
function embedMessage(imageBuffer, message) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, info } = await sharp(imageBuffer)
                .raw()
                .toBuffer({ resolveWithObject: true });

            const binaryMessage = message.split('').map(char => 
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join('') + '1111111111111110'; // End delimiter

            if (binaryMessage.length > data.length) {
                throw new Error('Message too long for image');
            }

            const modifiedData = Buffer.from(data);
            
            for (let i = 0; i < binaryMessage.length; i++) {
                const bit = parseInt(binaryMessage[i]);
                modifiedData[i] = (modifiedData[i] & 0xFE) | bit;
            }

            const outputBuffer = await sharp(modifiedData, {
                raw: {
                    width: info.width,
                    height: info.height,
                    channels: info.channels
                }
            }).png().toBuffer();

            resolve(outputBuffer);
        } catch (error) {
            reject(error);
        }
    });
}

function extractMessage(imageBuffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await sharp(imageBuffer).raw().toBuffer({ resolveWithObject: true });
            
            let binaryMessage = '';
            const delimiter = '1111111111111110';
            
            for (let i = 0; i < data.length; i++) {
                binaryMessage += (data[i] & 1).toString();
                
                if (binaryMessage.endsWith(delimiter)) {
                    binaryMessage = binaryMessage.slice(0, -delimiter.length);
                    break;
                }
            }

            if (!binaryMessage || binaryMessage.length % 8 !== 0) {
                throw new Error('No hidden message found');
            }

            let message = '';
            for (let i = 0; i < binaryMessage.length; i += 8) {
                const byte = binaryMessage.substr(i, 8);
                message += String.fromCharCode(parseInt(byte, 2));
            }

            resolve(message);
        } catch (error) {
            reject(error);
        }
    });
}

// API Routes
app.post('/api/encode', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        if (!req.body.message) {
            return res.status(400).json({ error: 'No message provided' });
        }

        const encodedImage = await embedMessage(req.file.buffer, req.body.message);
        
        res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="encoded_image.png"'
        });
        
        res.send(encodedImage);
    } catch (error) {
        console.error('Encoding error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/decode', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const message = await extractMessage(req.file.buffer);
        res.json({ message });
    } catch (error) {
        console.error('Decoding error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Here you would typically save to database or send email
        console.log('Contact form submission:', { name, email, message });
        
        res.json({ success: true, message: 'Thank you for your message! We will get back to you soon.' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
        }
    }
    
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Image Steganography Server running on port ${PORT}`);
        console.log(`📱 Open your browser to http://localhost:${PORT}`);
    });
}

// Export the Express API for Vercel
module.exports = app; 