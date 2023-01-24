import { compressToUTF16, decompressFromUTF16 } from 'async-lz-string';
import storage from 'electron-json-storage';
import { useCallback } from 'react';

type StringKey = 'theme';
type ObjectKey = 'tokens';
type ArrayKey = '';

const STRING_KEYS: StringKey[] = ['theme'];
const OBJECT_KEYS: ObjectKey[] = ['tokens'];
const ARRAY_KEYS: ArrayKey[] = [];

export type StorageKey = StringKey | ObjectKey | ArrayKey;
export type StorageValue = any;

const typeOfKey = (key: any) => {
  if (STRING_KEYS.includes(key)) return 'string';
  if (OBJECT_KEYS.includes(key)) return 'object';
  if (ARRAY_KEYS.includes(key)) return 'array';
  return 'unknown';
};

const stringify = async (key: StorageKey, value: StorageValue): Promise<string> => {
  const type = typeOfKey(key);
  if (type === 'array' || type === 'object') {
    const stringy = JSON.stringify(value);
    return await compressToUTF16(stringy);
  }
  return `${value}`;
};

const parse = async (key: StorageKey, value: string): Promise<StorageValue> => {
  const type = typeOfKey(key);
  if (type === 'array' || type === 'object') {
    const decompressed = await decompressFromUTF16(value);
    return JSON.parse(decompressed);
  }
  return `${value}`;
};

export const useSetStorage = () => {
  return useCallback(async (key: StorageKey, data: StorageValue) => {
    const value = await stringify(key, data);
    localStorage.setItem(key, value);
  }, []);
};

export const useGetStorage = () => {
  return useCallback(async (key: StorageKey) => {
    const value = localStorage.getItem(key);
    return await parse(key, value ?? '');
  }, []);
};

export const useRemoveStorage = () => {
  return useCallback((key: StorageKey) => {
    localStorage.removeItem(key);
  }, []);
};

export const useClearStorage = () => {
  return useCallback(() => {
    localStorage.clear();
  }, []);
};
