import { useEffect, useState } from 'react';
import { BROWSER_MAP, OS_MAP } from './constants';

interface BrowserInfo {
  browser: {key: string, name: string};
  os: {key: string, name: string};
}

const useBrowserAndOSInfo = (): BrowserInfo => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({ 
    browser: {
      key: 'loading',
      name: 'Loading ...',
    },
    os: {
      key: 'loading',
      name: 'Loading ...',
    },
  });

  useEffect(() => {
    const getBrowserAndOSInfo = () => {
      const userAgent = navigator.userAgent.toLowerCase(); // Convert to lowercase

      let browser: {key: string, name: string} = {key: 'unknown', name: 'Unknown Browser'};
      let os: {key: string, name: string} = {key: 'unknown', name: 'Unknown OS'};

      Object.keys(BROWSER_MAP).forEach((key) => {
        if (userAgent.indexOf(key) > -1) {
          browser.key = key;
          browser.name = BROWSER_MAP[key];
        }
      });

      Object.keys(OS_MAP).forEach((key) => {
        if (userAgent.indexOf(key) > -1) {
          os.key = key;
          os.name = OS_MAP[key];
        }
      });

      return { 
        browser,
        os
      };
    };

    setBrowserInfo(getBrowserAndOSInfo());
  }, []);

  return browserInfo;
};

export default useBrowserAndOSInfo;
