import { useEffect, useState } from "react";

export function usePopStorage() {
  const POP_STORAGE_KEY = "pop";
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const listener = () => setTotal(getValue());
    document.addEventListener("focus", listener);

    return () => {
      document.removeEventListener("focus", listener);
    };
  }, []);

  useEffect(() => {
    setTotal(getValue());
  }, [POP_STORAGE_KEY]);

  function increment() {
    const value = getValue();
    const newValue = value + 1;
    localStorage.setItem(POP_STORAGE_KEY, String(newValue));
    setTotal(() => newValue);
  }

  function getValue() {
    return Number(localStorage.getItem(POP_STORAGE_KEY));
  }

  return {
    total,
    increment,
  };
}
