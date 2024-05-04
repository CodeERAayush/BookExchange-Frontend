import AsyncStorage from '@react-native-async-storage/async-storage';
export const setAsync = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
export const setAsyncJson = async (key,value) => {
    try {
        const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };
export const getAsync = async (key) => {
    try {
      await AsyncStorage.getItem(key);
    } catch (e) {
      // saving error
    }
  };
export const getAsyncJson = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // saving error
    }
  };

