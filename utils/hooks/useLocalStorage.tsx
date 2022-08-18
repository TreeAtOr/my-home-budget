import { Dispatch, SetStateAction, useEffect, useState } from "react";


export function useLocalStorage<T>(storageKey: string, fallbackState: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(fallbackState);
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)
  }, [])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

