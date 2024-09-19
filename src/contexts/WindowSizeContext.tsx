// WindowSizeContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

// Create the Context with a default value (initial window size)
export const WindowSizeContext = createContext({
  width: window.innerWidth,
  height: window.innerHeight,
});

// Custom hook to consume the window size context
export const useWindowSize = () => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error("useWindowSize must be used within a WindowSizeProvider");
  }
  return context;
};

export const WindowSizeProvider = ({ children }) => {
  // State to store window width and height
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Function to handle window resize
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Add event listener on mount, remove on unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={{windowSize}}>
      {children}
    </WindowSizeContext.Provider>
  );
};
