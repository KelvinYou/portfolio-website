import { useEffect, useState } from 'react';
import { BROWSER_MAP, OS_MAP } from './constants';

interface BrowserInfo {
  browser: string;
  os: string;
}

const useBrowserAndOSInfo = (): BrowserInfo => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({ browser: 'Loading...', os: 'Loading...' });

  useEffect(() => {
    const getBrowserAndOSInfo = () => {
      const userAgent = navigator.userAgent.toLowerCase(); // Convert to lowercase

      let browser: string = 'Unknown Browser';
      let os: string = 'Unknown OS';

      Object.keys(BROWSER_MAP).forEach((key) => {
        if (userAgent.indexOf(key) > -1) {
          browser = BROWSER_MAP[key];
        }
      });

      Object.keys(OS_MAP).forEach((key) => {
        if (userAgent.indexOf(key) > -1) {
          os = OS_MAP[key];
        }
      });

      return { browser, os };
    };

    setBrowserInfo(getBrowserAndOSInfo());
  }, []);

  return browserInfo;
};

export default useBrowserAndOSInfo;
