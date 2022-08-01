import { useCallback, useEffect, useState } from "react";

const WindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  const handleSize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [handleSize, windowSize]);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  return { windowSize };
};
export default WindowSize;
