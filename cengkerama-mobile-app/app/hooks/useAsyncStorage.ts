import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useAsyncStorage<T>(
  key: string,
  nullValue: T,
): [T, Dispatch<SetStateAction<T>>, () => Promise<void>, () => Promise<void>] {
  const [value, setValue] = useState<T>(nullValue);

  const readFromAsyncStorage = async () => {
    try {
      const payload = await AsyncStorage.getItem(key);
      if (__DEV__) {
        console.log("READ_ASYNC");
      }
      if (payload !== null) {
        setValue(JSON.parse(payload));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    readFromAsyncStorage();
  }, []);

  const writeToAsyncStorage = async () => {
    try {
      const payload = JSON.stringify(value);
      await AsyncStorage.setItem(key, payload);
      if (__DEV__) {
        console.log("WRITE_ASYNC");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(nullValue);
    } catch (e) {
      console.error(e);
    }
  };

  return [value, setValue, writeToAsyncStorage, clearStorage];
}
