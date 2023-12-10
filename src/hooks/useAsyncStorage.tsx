import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";

interface IUseAsyncStorage<T> {
  key?: string;
  initialValue?: T;
}

const useAsyncStorage = <T,>({ key, initialValue }: IUseAsyncStorage<T>) => {
  const initialDataRef = useRef(initialValue);
  const [data, setData] = useState<T>();
  const [retrievedFromStorage, setRetrievedFromStorage] = useState(false);

  const setNewData = async (value: T) => {
    try {
      await AsyncStorage.setItem(key as string, JSON.stringify(value));
      setData(value);
    } catch (error) {
      console.error(`useAsyncStorage setItem ${key} error:`, error);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key as string);
    } catch (error) {
      console.error(`useAsyncStorage removeItem ${key} error:`, error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`useAsyncStorage clear error:`, error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key as string);
      if (!value) {
        return;
      }
      setData(JSON.parse(value));
      setRetrievedFromStorage(true);
    } catch (error) {
      console.error(`useAsyncStorage getItem ${key} error:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem(key as string);
        if (!value) {
          setData(initialDataRef.current);
          return;
        }
        setData(JSON.parse(value));
        setRetrievedFromStorage(true);
      } catch (error) {
        console.error(`useAsyncStorage getItem ${key} error:`, error);
      }
    };

    fetchData();
  }, [key, initialDataRef]);

  return {
    data,
    retrievedFromStorage,
    getData,
    removeData,
    clearData,
    setNewData,
  };
};

export default useAsyncStorage;
