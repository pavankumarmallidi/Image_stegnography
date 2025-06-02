# SteganoCrypt - Image Steganography Web Application

SteganoCrypt is a professional web application that allows users to hide and extract text messages within images using LSB (Least Significant Bit) steganography. The application provides a modern, responsive interface with dark/light mode support and beautiful animations.

![SteganoCrypt Screenshot](https://via.placeholder.com/800x400?text=SteganoCrypt+Screenshot)

## Features

- **Hide Messages**: Conceal text within images using advanced LSB steganography
- **Extract Messages**: Retrieve hidden messages from encoded images
- **Modern UI**: Professional design with glassmorphism effects and smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Drag & Drop**: Easy file upload with visual feedback
- **Security**: Military-grade steganography algorithms
- **Beautiful Animations**: Floating objects and smooth transitions
- **Accessibility**: High contrast themes and keyboard navigation

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Image Processing**: Sharp
- **File Handling**: Multer
- **Deployment**: Vercel
- **Animations**: CSS3 Animations and Transitions
- **Theme Management**: CSS Variables and LocalStorage

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/steganocrypt.git
   cd steganocrypt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Features in Detail

### Theme System
- Automatic dark/light mode detection
- Manual theme toggle with persistent preference
- Smooth theme transitions
- High contrast color schemes for accessibility

### Animations
- Floating background objects
- Smooth page transitions
- Loading animations
- Hover effects
- Gradient text animations

### Security Features
- LSB steganography implementation
- Secure file handling
- Input validation
- Error handling

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings (if needed)
6. Click "Deploy"

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port on which the server runs (default: 3000)
- `NODE_ENV`: The environment (development/production)

## API Endpoints

### Encode Message

```
POST /api/steganography/encode
```

**Request:**
- `image`: Image file (PNG, JPG, JPEG)
- `message`: Text message to hide

**Response:**
- Encoded image file

### Decode Message

```
POST /api/steganography/decode
```

**Request:**
- `image`: Encoded image file

**Response:**
- `message`: Extracted text message

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Sharp](https://sharp.pixelplumbing.com/)
- [Multer](https://github.com/expressjs/multer)
- [Vercel](https://vercel.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)