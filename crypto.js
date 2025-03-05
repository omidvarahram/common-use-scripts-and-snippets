import 'react-native-get-random-values';
import { randomBytes } from 'react-native-crypto';

if (!global.crypto || !global.crypto.getRandomValues) {
  console.log("Manually patching crypto.getRandomValues...");
  global.crypto = {
    ...global.crypto,
    getRandomValues: (arr) => {
      const bytes = randomBytes(arr.length);
      arr.set(bytes);
      return arr;
    }
  };
}