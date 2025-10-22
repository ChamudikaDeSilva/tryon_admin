import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const htmlClass = window.document.documentElement.classList;

    if (colorMode === "dark") {
      htmlClass.add("dark");
    } else {
      htmlClass.remove("dark");
    }
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
