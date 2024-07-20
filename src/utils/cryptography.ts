// import CryptoES from 'crypto-es';

// encrypting with basic AES
export function encryptString(text: string) {
  return text;
  // return CryptoES.AES.encrypt(
  //   text,
  //   process.env.EXPO_PUBLIC_ENCRYPTION_SECRET_KEY
  // ).toString();
}

export function decryptString(cipherText: string) {
  return cipherText;
  // const bytes = CryptoES.AES.decrypt(
  //   cipherText,
  //   process.env.EXPO_PUBLIC_ENCRYPTION_SECRET_KEY
  // );
  // return bytes.toString(CryptoES.enc.Utf8);
}
