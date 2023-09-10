// import { AsyncStorage } from 'react-native';
import ls, { clear, get, remove, set } from "local-storage";

const MYSTORAGE_KEY_PREFIX = "@FlexMVP:";

/** @class */
export class AmplifyStorage {
  static syncPromise = null;
  /**
   * This is used to set a specific item in storage
   */
  static setItem(key: string, value: any) {
    set(MYSTORAGE_KEY_PREFIX + key, value);
    return get(MYSTORAGE_KEY_PREFIX + key);
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key: string) {
    return get(MYSTORAGE_KEY_PREFIX + key);
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key: string) {
    return remove(MYSTORAGE_KEY_PREFIX + key);
  }

  /**
   * This is used to clear the storage
   */
  static clear() {
    return clear();
  }

  /**
   * Will sync the MyStorage data from AsyncStorage to storageWindow MyStorage
   */
  //   static sync() {
  //     return ls;
  //   }
}
