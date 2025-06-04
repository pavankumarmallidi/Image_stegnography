# SteganoHide - Image Steganography Tool

A modern, browser-based steganography application that allows you to hide and extract secret messages within digital images using advanced LSB (Least Significant Bit) techniques.

![SteganoHide Preview](https://via.placeholder.com/800x400/000000/FFFFFF?text=SteganoHide+Preview)

## 🚀 Features

- **🔒 Secure Encoding**: Hide messages in images using LSB steganography
- **🔍 Easy Decoding**: Extract hidden messages with encryption keys
- **🛡️ Privacy First**: All processing happens locally in your browser
- **⚡ Lightning Fast**: Optimized algorithms for instant processing
- **🎨 Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **🔐 Encryption**: Optional message encryption for enhanced security
- **📱 Mobile Friendly**: Works on all devices and screen sizes

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/steganohide.git
cd steganohide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Deploy to Vercel

1. **Option 1: Using Vercel CLI**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Option 2: Using GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push to main branch

3. **Option 3: Manual Upload**
   - Build the project: `npm run build`
   - Upload the `dist` folder to Vercel dashboard

### Environment Variables

No environment variables are required as this application runs entirely in the browser.

## 📋 Usage

### Encoding a Message

1. Navigate to the Tool page
2. Select "Encode" mode
3. Upload an image (PNG or JPEG, max 5MB)
4. Enter your secret message
5. Provide an encryption key (minimum 8 characters)
6. Click "Encode & Download" to get your steganographic image

### Decoding a Message

1. Navigate to the Tool page
2. Select "Decode" mode
3. Upload the steganographic image
4. Enter the correct encryption key
5. Click "Decode Message" to reveal the hidden message

## 🔧 Configuration

The project includes the following configuration files for Vercel deployment:

- `vercel.json`: Vercel deployment configuration
- `.vercelignore`: Files to exclude from deployment
- `vite.config.ts`: Vite build configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and legitimate privacy purposes only. Please ensure you comply with all applicable laws and regulations when using steganography techniques.

## 🙋‍♂️ Support

If you have any questions or issues, please open an issue on GitHub or contact:

- Email: m.pavankumar255@gmail.com
- Phone: +91 9182213255

## 🌟 Acknowledgments

- Built with modern web technologies
- Inspired by the need for privacy-preserving communication
- Thanks to the open-source community for the amazing tools and libraries 
