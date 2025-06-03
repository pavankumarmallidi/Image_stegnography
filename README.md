# SteganoCrypt - Hide Messages in Plain Sight

A modern web application for secure communication through invisible messages using advanced steganography techniques.

## Features

- **Military-Grade Security**: LSB steganography with advanced algorithms
- **Invisible Encoding**: Messages embedded without visible changes to images
- **Universal Compatibility**: Works with PNG, JPG, and JPEG formats
- **Lightning Fast**: Process images in seconds
- **Cross-Platform**: Works on all modern browsers and devices
- **Privacy First**: All processing happens client-side

## Tech Stack

- **Backend**: Node.js, Express.js
- **Image Processing**: Sharp library for LSB steganography
- **Frontend**: Vanilla JavaScript, Modern CSS
- **Deployment**: Vercel-ready configuration

## Project Structure

```
├── public/                 # Static assets and HTML pages
│   ├── css/               # Stylesheets
│   │   ├── base.css       # Global styles and theming
│   │   ├── general.css    # General page components
│   │   ├── index.css      # Homepage styles
│   │   ├── contact.css    # Contact page styles
│   │   └── steganography.css # Main app styles
│   ├── js/                # JavaScript files
│   │   ├── script.js      # Main application logic
│   │   └── steganography.js # Steganography algorithms
│   ├── index.html         # Homepage
│   ├── steganography.html # Main application
│   ├── about.html         # About page
│   ├── contact.html       # Contact page
│   ├── features.html      # Features overview
│   ├── how-it-works.html  # Technical explanation
│   ├── documentation.html # API documentation
│   ├── privacy-policy.html
│   ├── terms-of-service.html
│   ├── security-audit.html
│   ├── bug-bounty.html
│   ├── responsible-disclosure.html
│   └── encryption-standards.html
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## Local Development

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Image_stegnography
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Production Build

```bash
npm start
```

## Deployment

### Vercel Deployment

This project is optimized for Vercel deployment:

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy to Vercel**:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

The application doesn't require environment variables for basic functionality.

### Build Configuration

- `vercel.json` is pre-configured for optimal deployment
- Static assets are served from the `public/` directory
- API routes are handled by `server.js`

## API Endpoints

### Encode Message
```
POST /api/encode
Content-Type: multipart/form-data

Parameters:
- image: File (PNG, JPG, JPEG)
- message: String (text to hide)

Response: Image file (PNG format)
```

### Decode Message
```
POST /api/decode
Content-Type: multipart/form-data

Parameters:
- image: File (encoded image)

Response: JSON { "message": "decoded text" }
```

### Contact Form
```
POST /api/contact
Content-Type: application/json

Parameters:
- name: String
- email: String
- message: String

Response: JSON { "success": true, "message": "..." }
```

## Usage

1. **Encoding Messages**:
   - Navigate to the SteganoCrypt App
   - Select "Encode Message"
   - Upload an image (PNG, JPG, JPEG)
   - Enter your secret message
   - Download the encoded image

2. **Decoding Messages**:
   - Select "Decode Message"
   - Upload an encoded image
   - The hidden message will be revealed automatically

## Security Features

- **Client-side Processing**: Images never leave your device during processing
- **LSB Steganography**: Messages hidden in least significant bits
- **No Data Storage**: No images or messages stored on servers
- **Invisible Changes**: Modifications are imperceptible to human eye

## Technical Details

- **Algorithm**: Least Significant Bit (LSB) steganography
- **File Support**: PNG (recommended), JPG, JPEG
- **Max File Size**: 10MB per image
- **Message Capacity**: ~1 character per 8 pixels
- **End Delimiter**: `1111111111111110` (binary)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **General Questions**: contact@steganocrypt.com
- **Security Issues**: security@steganocrypt.com
- **Bug Reports**: Create an issue on GitHub

## Acknowledgments

- Sharp library for image processing
- Font Awesome for icons
- Express.js for the backend framework