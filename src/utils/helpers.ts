import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import clsx, { ClassValue } from 'clsx';
import * as SecureStore from 'expo-secure-store';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateMnemonic(mnemonic: string) {
  const normalizedMnemonic = mnemonic.trim().toLowerCase();

  const words = normalizedMnemonic.split(/\s+/);
  if (words.length !== 12) {
    return {
      valid: false,
      error: 'Phrase must be 12 words'
    };
  }

  for (let word of words) {
    if (!wordlist.includes(word)) {
      return {
        valid: false,
        error: 'Invalid word(s) in your phrase'
      };
    }
  }

  if (bip39.validateMnemonic(normalizedMnemonic, wordlist)) {
    return {
      valid: true,
      error: null
    };
  } else {
    return {
      valid: false,
      error: 'Invalid phrase'
    };
  }
}

export async function clearStorage(): Promise<void> {
  await SecureStore.deleteItemAsync('encryptedPrivateKey');
  await SecureStore.deleteItemAsync('publicAddress');
}

export function formatNumberWithCommas(
  number: number,
  decimals: number = 2
) {
  return parseFloat(number.toFixed(decimals)).toLocaleString();
}
