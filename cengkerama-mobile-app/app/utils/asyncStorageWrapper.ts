import AsyncStorage from "@react-native-async-storage/async-storage";
import RNAsyncStorageFlipper from "rn-async-storage-flipper";

import { error } from "./logger";

class Storage {
  constructor() {
    RNAsyncStorageFlipper(AsyncStorage);
  }

  public write = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      error(`AsyncStorage_WRITE_${key}`, e);
      throw e;
    }
  };

  public read = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result;
    } catch (e) {
      error(`AsyncStorage_READ_${key}`, e);
      throw e;
    }
  };

  public clear = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      error(`AsyncStorage_CLEAR_${key}`, e);
      throw e;
    }
  };

  public clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      error("AsyncStorage_ALL", e);
      throw e;
    }
  };
}

const StorageWrapper = new Storage();

export default StorageWrapper;
