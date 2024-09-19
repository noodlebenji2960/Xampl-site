import React, { useEffect, useState } from "react";
import ChatNow from "./ChatNow";
import ScrollIndicator from "./ScrollIndicator";
import { useScroll } from "../contexts/ScrollContext";
import { useWindowSize } from "../contexts/WindowSizeContext";

const StickyButtons = () => {
  const {width, height} = useWindowSize()
  const { scrollY, isLocked, unlockScroll } = useScroll();
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    // Calculate maximum scroll height
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

    // Calculate how far we are from the bottom
    const distanceFromBottom = maxScrollY - scrollY;
    const threshold = 0
    // Apply translation only if the scroll is close to the bottom
    if (distanceFromBottom < threshold) {
      setTranslateY(-(threshold - distanceFromBottom));
    } else {
      setTranslateY(0); // Reset to 0 if we're not close to the bottom
    }
  }, [scrollY, width, height]);

  return (
    <span
      className="stickyButtons"
      style={{ transform: `translateX(-50%) translateY(${translateY}px)`}} // Apply dynamic transform
    >
      <ChatNow />
      <ScrollIndicator locked={isLocked} unlock={unlockScroll} />
    </span>
  );
};

export default StickyButtons;
