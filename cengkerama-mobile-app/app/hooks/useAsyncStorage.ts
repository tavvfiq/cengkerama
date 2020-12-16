import { Dispatch, SetStateAction, useEffect, useState } from "react";

import StorageWrapper from "../utils/asyncStorageWrapper";

export default function useAsyncStorage<T>(
  key: string,
  nullValue: T,
): [
  T,
  Dispatch<SetStateAction<T>>,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
] {
  const [value, setValue] = useState<T>(nullValue);

  const readFromAsyncStorage = async () => {
    try {
      const payload = await StorageWrapper.read(key);
      if (__DEV__) {
        console.log("READ_ASYNC");
      }
      if (payload !== null) {
        setValue(JSON.parse(payload));
      } else {
        await StorageWrapper.write(key, JSON.stringify(nullValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      await readFromAsyncStorage();
    })();
  }, []);

  const writeToAsyncStorage = async () => {
    try {
      const payload = JSON.stringify(value);
      await StorageWrapper.write(key, payload);
      if (__DEV__) {
        console.log("WRITE_ASYNC");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearStorage = async () => {
    try {
      await StorageWrapper.clear(key);
      setValue(nullValue);
    } catch (e) {
      console.error(e);
    }
  };

  return [
    value,
    setValue,
    writeToAsyncStorage,
    readFromAsyncStorage,
    clearStorage,
  ];
}
