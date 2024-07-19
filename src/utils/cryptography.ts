import CryptoES from 'crypto-es';

// encrypting with basic AES
export function encryptString(text: string) {
  return CryptoES.AES.encrypt(
    text,
    process.env.EXPO_PUBLIC_SECRET_KEY
  ).toString();
}

export function decryptString(cipherText: string) {
  const bytes = CryptoES.AES.decrypt(
    cipherText,
    process.env.EXPO_PUBLIC_SECRET_KEY
  );
  return bytes.toString(CryptoES.enc.Utf8);
}
