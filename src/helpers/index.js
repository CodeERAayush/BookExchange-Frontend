import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '../../asset/images';
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

  export const categories=[
    {name:'paper',image:Images?.paper},
    {name:'book',image:Images?.book},
    {name:'gadgets',image:Images?.gadgets},
    {name:'clothing',image:Images?.clothing},
    {name:'vehicle',image:Images?.vehicle},
    {name:'other',image:Images?.other},
  ]
