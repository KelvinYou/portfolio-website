'use client';

import { useEffect, useState } from 'react';
import type CryptoJS from 'crypto-js';

// Create a proper type for the module
type CryptoModule = typeof CryptoJS | null;

export function useCrypto() {
  const [cryptoModule, setCryptoModule] = useState<CryptoModule>(null);
  
  useEffect(() => {
    // Only import crypto in the browser
    if (typeof window !== 'undefined') {
      import('crypto-js').then(module => {
        setCryptoModule(module.default || module);
      }).catch(err => {
        console.error('Failed to load crypto-js:', err);
      });
    }
  }, []);
  
  return cryptoModule;
}

// Safe wrapper to prevent server-side usage
export const getCrypto = () => {
  if (typeof window === 'undefined') {
    return null; // Return null on server
  }
  
  // Lazy import only in browser context
  return import('crypto-js').then(module => module.default || module);
}; 