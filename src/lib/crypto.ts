import { useEffect, useState } from 'react';
import type CryptoJS from 'crypto-js';

// Create a proper type for the module
type CryptoModule = typeof CryptoJS | null;

export function useCrypto() {
  // Initialize with the correct type
  const [cryptoModule, setCryptoModule] = useState<CryptoModule>(null);
  
  useEffect(() => {
    // Only import crypto in the browser
    import('crypto-js').then(module => {
      setCryptoModule(module.default || module);
    });
  }, []);
  
  return cryptoModule;
} 