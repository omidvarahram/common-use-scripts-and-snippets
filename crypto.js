import 'react-native-get-random-values';

if (!global.crypto || !global.crypto.getRandomValues) {
  global.crypto = {
    ...global.crypto,
    getRandomValues: (array) => {
      return array.map(() => Math.floor(Math.random() * 256));
    }
  };
}