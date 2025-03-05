import 'react-native-get-random-values';

// Define the type for crypto to avoid TypeScript errors
declare global {
  interface Crypto {
    getRandomValues<T extends ArrayBufferView | null>(array: T): T;
  }
  
  var crypto: Crypto;
}

// Manually patch `crypto.getRandomValues` if it doesn't exist
if (!global.crypto || !global.crypto.getRandomValues) {
  console.log('Manually patching crypto.getRandomValues...');
  
  global.crypto = {
    ...global.crypto,
    getRandomValues: <T extends ArrayBufferView | null>(array: T): T => {
      if (!array) {
        throw new Error('crypto