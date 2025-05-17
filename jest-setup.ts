import { jest } from '@jest/globals';
import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

console.log("Jest setup file loaded successfully");

// ✅ Ignore warnings for deprecated React Native modules
jest.spyOn(console, "warn").mockImplementation((message) => {
  // Ignore specific warnings only
  const ignoredWarnings = [
    "ProgressBarAndroid has been extracted",
    "Clipboard has been extracted",
    "PushNotificationIOS has been extracted",
    "new NativeEventEmitter() was called"
  ];

  if (ignoredWarnings.some(warning => message.includes(warning))) {
    return; // Ignore these specific warnings
  }

  console.warn(message); // Otherwise, log the warning as usual
});

// ✅ Properly Type and Mock `setImmediate` with `__promisify__`
global.setImmediate = ((callback: (...args: any[]) => void, ...args: any[]): number => {
  return setTimeout(callback, 0, ...args) as unknown as number;
}) as typeof setImmediate;

// ✅ Attach `__promisify__` to Support Promisification
(global.setImmediate as any).__promisify__ = (callback: (...args: any[]) => void) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, 0);
  });
};

// ✅ Mock `expo-router` to prevent navigation-related test failures
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// ✅ Mock `react-native-toast-message` to prevent toast-related test failures
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// ✅ Mock `clearImmediate` for React Native environment
global.clearImmediate = (id: any) => clearTimeout(id);

// Add this to your existing jest-setup.ts
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));