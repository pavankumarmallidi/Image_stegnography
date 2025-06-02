# Image Steganography Web Application

A modern web application for hiding and extracting secret messages in images using LSB (Least Significant Bit) steganography technique. Built with Node.js, Express.js, and a beautiful frontend interface.

## 🌟 Features

- **Hide Messages**: Encode secret text messages into image pixels
- **Extract Messages**: Decode hidden messages from steganographic images
- **Modern UI**: Beautiful, responsive web interface with smooth animations
- **Multiple Formats**: Supports PNG, JPG, and JPEG image formats
- **Real-time Preview**: Image preview before processing
- **Character Counter**: Real-time message length tracking
- **Download Integration**: Automatic download of encoded images
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **File Validation**: File type and size validation for security

## 🚀 Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Sharp** - High-performance image processing library
- **Multer** - Middleware for handling file uploads
- **CORS** - Cross-Origin Resource Sharing support

### Frontend
- **HTML5** - Modern semantic markup
- **CSS3** - Advanced styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Modern JavaScript with classes and async/await
- **Font Awesome** - Beautiful icons
- **CSS Grid & Flexbox** - Modern layout techniques

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd image-steganography-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
image-steganography-web/
├── controllers/
│   └── steganographyController.js    # Request handlers
├── routes/
│   └── steganography.js              # API routes
├── services/
│   └── steganographyService.js       # Core steganography logic
├── public/
│   ├── index.html                    # Main HTML file
│   ├── styles.css                    # Styling
│   └── script.js                     # Frontend JavaScript
├── server.js                         # Express server setup
├── package.json                      # Dependencies and scripts
└── README.md                         # Documentation
```

## 🔧 API Endpoints

### POST `/api/steganography/encode`
Encode a message into an image.

**Request:**
- `Content-Type: multipart/form-data`
- `image`: Image file (PNG, JPG, JPEG)
- `message`: Text message to hide

**Response:**
- Success: Binary image data (PNG format)
- Error: JSON with error message

### POST `/api/steganography/decode`
Extract a hidden message from an image.

**Request:**
- `Content-Type: multipart/form-data`
- `image`: Encoded image file

**Response:**
- Success: `{ "message": "decoded text" }`
- Error: JSON with error message

## 🎯 How It Works

### LSB Steganography Algorithm

1. **Encoding Process:**
   - Convert the secret message to binary
   - Add a delimiter pattern to mark the end of the message
   - Iterate through image pixels (RGB channels only)
   - Replace the least significant bit of each color channel with message bits
   - Save the modified image as PNG to preserve quality

2. **Decoding Process:**
   - Extract the least significant bits from image pixels
   - Reconstruct the binary message
   - Look for the delimiter pattern to find the message end
   - Convert binary back to text

### Security Features

- File type validation (only images allowed)
- File size limits (10MB maximum)
- Memory-safe processing using streams
- Input sanitization and error handling

## 🎨 User Interface Features

- **Glassmorphism Design**: Modern translucent cards with backdrop blur
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and keyframe animations
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Visual feedback during processing
- **Drag & Drop Support**: Easy file selection
- **Image Previews**: See your images before processing

## 🔒 Security Considerations

- Only RGB channels are modified (alpha channel preserved)
- Minimal visual impact on the carrier image
- No metadata stored in images
- Memory-efficient processing
- Input validation and sanitization

## 📊 Limitations

- Message length depends on image size (larger images can hold more text)
- Works best with lossless formats (PNG recommended for encoded images)
- JPEG compression may affect very small messages
- Maximum file size: 10MB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **"No hidden message found"**
   - Ensure the image was encoded with this application
   - Check if the image was compressed or modified after encoding

2. **"Message too long"**
   - Use a larger image or shorter message
   - Formula: Max characters ≈ (width × height × 3) / 8

3. **File upload fails**
   - Check file format (PNG, JPG, JPEG only)
   - Ensure file size is under 10MB
   - Verify file is not corrupted

4. **Server errors**
   - Check Node.js version (14+ required)
   - Ensure all dependencies are installed
   - Check server logs for detailed error messages

## 🚀 Performance Tips

- Use PNG format for best quality preservation
- Larger images can hide longer messages
- Compress your messages if they're very long
- Use high-quality source images for better results

---

Made with ❤️ using Node.js and modern web technologies.