class SteganographyApp {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.currentMode = 'encode';
        this.initializeNavigation();
        this.initializeMode();
        this.steganography = new Steganography();
    }

    initializeElements() {
        // Navigation elements
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        // Mode buttons
        this.encodeModeBtn = document.querySelector('[data-mode="encode"]');
        this.decodeModeBtn = document.querySelector('[data-mode="decode"]');
        
        // Sections
        this.encodeSection = document.getElementById('encode-section');
        this.decodeSection = document.getElementById('decode-section');
        
        // Forms
        this.encodeForm = document.getElementById('encode-form');
        this.decodeForm = document.getElementById('decode-form');
        this.contactForm = document.getElementById('contact-form');
        
        // File inputs
        this.encodeImageInput = document.getElementById('encode-image');
        this.decodeImageInput = document.getElementById('decode-image');
        
        // Previews
        this.encodePreview = document.getElementById('encode-preview');
        this.decodePreview = document.getElementById('decode-preview');
        
        // Message elements
        this.messageTextarea = document.getElementById('message');
        this.charCount = document.getElementById('char-count');
        this.decodedMessage = document.getElementById('decoded-message');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loading-overlay');
        
        // Toast container
        this.toastContainer = document.getElementById('toast-container');
    }

    initializeMode() {
        // Set initial mode
        this.switchMode(this.currentMode);
        
        // Show initial section
        this.encodeSection.classList.add('active');
        this.decodeSection.classList.remove('active');
    }

    attachEventListeners() {
        // Navigation
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Mode switching
        this.encodeModeBtn.addEventListener('click', () => this.switchMode('encode'));
        this.decodeModeBtn.addEventListener('click', () => this.switchMode('decode'));
        
        // File input changes
        this.encodeImageInput.addEventListener('change', (e) => this.handleImagePreview(e, this.encodePreview));
        this.decodeImageInput.addEventListener('change', (e) => this.handleImagePreview(e, this.decodePreview));
        
        // Message character count
        this.messageTextarea.addEventListener('input', () => this.updateCharCount());
        
        // Form submissions
        this.encodeForm.addEventListener('submit', (e) => this.handleEncode(e));
        this.decodeForm.addEventListener('submit', (e) => this.handleDecode(e));
        this.contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // File drag and drop
        this.initializeDragAndDrop();
    }

    initializeNavigation() {
        // Update active navigation based on current section
        this.updateActiveNavigation();
        
        // Smooth scroll for anchor links
        this.initializeSmoothScroll();
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu if open
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    initializeSmoothScroll() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleScroll() {
        // Update navigation background opacity
        const scrollY = window.scrollY;
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDarkMode) {
            this.navbar.style.background = scrollY > 50 ? 
                'rgba(26, 32, 44, 0.95)' : 
                'rgba(26, 32, 44, 0.1)';
        } else {
            this.navbar.style.background = scrollY > 50 ? 
                'rgba(255, 255, 255, 0.95)' : 
                'rgba(255, 255, 255, 0.1)';
        }
        
        // Update active navigation based on scroll position
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = ['home', 'features', 'app', 'about', 'contact'];
        let currentSection = 'home';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = sectionId;
                }
            }
        });
        
        // Update active nav link
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    initializeDragAndDrop() {
        [this.encodeImageInput, this.decodeImageInput].forEach(input => {
            const wrapper = input.closest('.file-input-wrapper');
            const display = wrapper.querySelector('.file-input-display');
            
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                wrapper.addEventListener(eventName, this.preventDefaults, false);
            });
            
            ['dragenter', 'dragover'].forEach(eventName => {
                wrapper.addEventListener(eventName, () => display.classList.add('drag-over'), false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                wrapper.addEventListener(eventName, () => display.classList.remove('drag-over'), false);
            });
            
            wrapper.addEventListener('drop', (e) => this.handleDrop(e, input), false);
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDrop(e, input) {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            const event = new Event('change', { bubbles: true });
            input.dispatchEvent(event);
        }
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.tool-section').forEach(section => section.classList.remove('active'));
        document.getElementById(`${mode}-section`).classList.add('active');
        
        // Hide decoded message when switching modes
        this.decodedMessage.classList.remove('show');
    }

    handleImagePreview(event, previewContainer) {
        const file = event.target.files[0];
        
        if (file) {
            // Validate file type
            if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
                this.showToast('Please select a valid image file (PNG, JPG, JPEG)', 'error');
                event.target.value = '';
                return;
            }
            
            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                this.showToast('File size too large. Maximum size is 10MB', 'error');
                event.target.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                previewContainer.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="image-info">
                        <span><i class="fas fa-file"></i> ${file.name}</span>
                        <span><i class="fas fa-weight"></i> ${this.formatFileSize(file.size)}</span>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
            
            // Update file input display
            const wrapper = event.target.closest('.file-input-wrapper');
            const display = wrapper.querySelector('.file-input-display');
            display.innerHTML = `
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <span style="color: #10b981;">File selected: ${file.name}</span>
            `;
        } else {
            previewContainer.innerHTML = '';
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateCharCount() {
        const count = this.messageTextarea.value.length;
        this.charCount.textContent = count;
        
        // Add visual feedback for character count
        if (count > 1000) {
            this.charCount.style.color = '#ef4444';
        } else if (count > 500) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = 'var(--text-muted)';
        }
    }

    async handleEncode(event) {
        event.preventDefault();
        
        const imageFile = this.encodeImageInput.files[0];
        const message = this.messageTextarea.value.trim();
        
        if (!imageFile) {
            this.showToast('Please select an image file', 'error');
            return;
        }
        
        if (!message) {
            this.showToast('Please enter a message to hide', 'error');
            return;
        }
        
        try {
        this.showLoading(true);
        
            // Use the steganography class to encode the message
            const encodedImageBlob = await this.steganography.encode(imageFile, message);
                
                // Create download link
            const url = window.URL.createObjectURL(encodedImageBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'encoded_' + imageFile.name;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
                
            this.showToast('Message successfully hidden in image!', 'success');
            this.resetForm(this.encodeForm);
            
        } catch (error) {
            console.error('Encode error:', error);
            this.showToast('Failed to hide message: ' + error.message, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleDecode(event) {
        event.preventDefault();
        
        const imageFile = this.decodeImageInput.files[0];
        
        if (!imageFile) {
            this.showToast('Please select an encoded image', 'error');
            return;
        }
        
        try {
            this.showLoading(true);
            
            // Use the steganography class to decode the message
            const decodedMessage = await this.steganography.decode(imageFile);
            
                // Display decoded message
                const messageContent = this.decodedMessage.querySelector('.message-content');
            messageContent.textContent = decodedMessage;
                this.decodedMessage.classList.add('show');
                
                // Add copy button
                this.addCopyButton(messageContent);
            
            this.showToast('Message successfully revealed!', 'success');
            
        } catch (error) {
            console.error('Decode error:', error);
            this.showToast('Failed to reveal message: ' + error.message, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleContactForm(event) {
        event.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name.trim() || !email.trim() || !message.trim()) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        this.showLoading(true);
        
        // Simulate form submission (replace with actual endpoint)
        try {
            // In a real application, you would send this to your backend
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.contactForm.reset();
        } catch (error) {
            this.showToast('Failed to send message. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    resetForm(form) {
        form.reset();
        const preview = form.id === 'encode-form' ? this.encodePreview : this.decodePreview;
        preview.innerHTML = '';
        this.resetFileInputDisplay(form.querySelector('input[type="file"]'));
        if (form.id === 'encode-form') {
            this.messageTextarea.value = '';
            this.updateCharCount();
        }
    }

    resetFileInputDisplay(input) {
        const wrapper = input.closest('.file-input-wrapper');
        const display = wrapper.querySelector('.file-input-display');
        display.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <span>${input.id.includes('decode') ? 'Drop encoded image here or click to browse' : 'Drop your image here or click to browse'}</span>
        `;
    }

    addCopyButton(messageContent) {
        // Remove existing copy button if any
        const existingBtn = this.decodedMessage.querySelector('.copy-btn');
        if (existingBtn) existingBtn.remove();
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn btn-secondary copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Message';
        copyBtn.style.marginTop = '1rem';
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(messageContent.textContent).then(() => {
                this.showToast('Message copied to clipboard!', 'success');
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Message';
                }, 2000);
            }).catch(() => {
                this.showToast('Failed to copy message', 'error');
            });
        });
        
        this.decodedMessage.appendChild(copyBtn);
    }

    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            this.loadingOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fas fa-check-circle' : 
                    type === 'error' ? 'fas fa-exclamation-circle' : 
                    'fas fa-info-circle';
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        this.toastContainer.removeChild(toast);
                    }
                }, 300);
            }
        }, 5000);
        
        // Allow manual close
        toast.addEventListener('click', () => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        this.toastContainer.removeChild(toast);
                    }
                }, 300);
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SteganographyApp();
    
    // Add some additional enhancements
    addScrollAnimations();
    addParallaxEffect();
});

// Scroll animations for elements
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .tech-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Subtle parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
} 