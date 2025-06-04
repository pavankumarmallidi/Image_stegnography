import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Image Steganography Tool/i)).toBeInTheDocument();
  });
  
  it('displays the encoding and decoding sections', () => {
    render(<App />);
    expect(screen.getByText(/📥 Encode Message/i)).toBeInTheDocument();
    expect(screen.getByText(/📤 Decode Message/i)).toBeInTheDocument();
  });
  
  it('shows the information section', () => {
    render(<App />);
    expect(screen.getByText(/ℹ️ How Steganography Works/i)).toBeInTheDocument();
  });
});