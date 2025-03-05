import { useEffect, useState } from 'react';

export function useCrypto() {
  const [cryptoModule, setCryptoModule] = useState(null);
  
  useEffect(() => {
    // Only import crypto in the browser
    import('crypto-js').then(module => {
      setCryptoModule(module);
    });
  }, []);
  
  return cryptoModule;
} 