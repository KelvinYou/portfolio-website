import { v4 as uuidv4 } from "uuid";

export interface BrowserInfo {
  browser: string;
  os: string;
}

const BROWSER_MAP: Record<string, string> = {
  chrome: 'Google Chrome',
  firefox: 'Mozilla Firefox',
  safari: 'Apple Safari',
  edg: 'Microsoft Edge',
  opera: 'Opera',
  ie: 'Internet Explorer',
};

const OS_MAP: Record<string, string> = {
  win: 'Windows',
  mac: 'Mac OS',
  linux: 'Linux',
  android: 'Android',
  iphone: 'iOS',
};

export const getBrowserAndOSInfo = (): BrowserInfo => {
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

export const getDeviceId = () => {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
};