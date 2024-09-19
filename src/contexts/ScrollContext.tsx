import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface ScrollContextType {
  scrollY: number;
  isLocked: boolean;
  lockScroll: () => void;
  unlockScroll: () => void;
  observeElement: (element: Element) => void;
  unobserveElement: (element: Element) => void;
  scrollElementHorizontally: (deltaX: number) => void;
  horizontalScrollX: number;
  scrollThresholdTop: number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

const preventDefaultScroll = (event: Event) => {
  event.preventDefault();
};

// Utility function to add and remove event listeners
const handleEventListener = (
  event: string,
  handler: EventListenerOrEventListenerObject,
  enabled: boolean,
  options?: AddEventListenerOptions
) => {
  if (enabled) {
    window.addEventListener(event, handler, options);
  } else {
    window.removeEventListener(event, handler);
  }
};

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [observedElements, setObservedElements] = useState<Set<Element>>(
    new Set()
  );
  const [currentElement, setCurrentElement] = useState<HTMLElement | null>(
    null
  );
  const [horizontalScrollX, setHorizontalScrollX] = useState<number>(0);

  const scrollThresholdTop = 100;

  const lockScroll = useCallback(() => setIsLocked(true), []);
  const unlockScroll = useCallback(() => setIsLocked(false), []);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    handleEventListener("scroll", updateScrollY, true);
    handleEventListener("resize", updateScrollY, true);

    return () => {
      handleEventListener("scroll", updateScrollY, false);
      handleEventListener("resize", updateScrollY, false);
    };
  }, [updateScrollY]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (isLocked && currentElement) {
        preventDefaultScroll(event);

        const { deltaY } = event;
        const direction: "left" | "right" = deltaY > 0 ? "right" : "left";

        const { scrollLeft, clientWidth } = currentElement;

        // Only scroll when aligned with slide
        if (scrollLeft % clientWidth !== 0) return;

        let newScrollX =
          direction === "left"
            ? scrollLeft - clientWidth
            : scrollLeft + clientWidth;

        const maxScrollX = currentElement.scrollWidth - clientWidth;
        if (newScrollX < 0 || newScrollX > maxScrollX) {
          unobserveElement(currentElement);
          unlockScroll();
          return;
        }

        currentElement.scrollTo({
          left: newScrollX,
          behavior: "smooth",
        });
        setHorizontalScrollX(newScrollX);
      }
    },
    [isLocked, currentElement, horizontalScrollX, unlockScroll]
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isLocked && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        preventDefaultScroll(event);
      }
    },
    [isLocked]
  );

  useEffect(() => {
    handleEventListener("wheel", handleWheel, isLocked, { passive: false });
    handleEventListener("keydown", handleKeydown, isLocked);

    return () => {
      handleEventListener("wheel", handleWheel, false);
      handleEventListener("keydown", handleKeydown, false);
    };
  }, [isLocked, handleWheel, handleKeydown]);

  const observeElement = useCallback((element: Element) => {
    setObservedElements((prev) => {
      const updated = new Set(prev);
      updated.add(element);
      return updated;
    });
  }, []);

  const unobserveElement = useCallback((element: Element) => {
    setObservedElements((prev) => {
      const updated = new Set(prev);
      updated.delete(element);
      return updated;
    });
  }, []);

  const scrollElementHorizontally = useCallback(
    (deltaX: number) => {
      if (currentElement) {
        const newScrollX = horizontalScrollX + deltaX;
        currentElement.scrollLeft = newScrollX;
        setHorizontalScrollX(newScrollX);
      }
    },
    [currentElement, horizontalScrollX]
  );

  useEffect(() => {
    const handleResize = () => {
      if (currentElement) {
        const { clientWidth } = currentElement;
        const newScrollX =
          Math.round(horizontalScrollX / clientWidth) * clientWidth;

        currentElement.scrollTo({
          left: newScrollX,
          behavior: "smooth",
        });
        setHorizontalScrollX(newScrollX);
      }
    };

    handleEventListener("resize", handleResize, true);

    return () => {
      handleEventListener("resize", handleResize, false);
    };
  }, [currentElement, horizontalScrollX]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inViewEntries = entries.filter(
          (entry) => entry.intersectionRatio === 1
        );

        if (inViewEntries.length > 0) {
          const element = inViewEntries[0].target as HTMLElement;
          lockScroll();
          setCurrentElement(element);
          setHorizontalScrollX(element.scrollLeft);
        } else {
          unlockScroll();
          setCurrentElement(null);
        }
      },
      { threshold: 1.0 }
    );

    observedElements.forEach((element) => observer.observe(element));

    return () => {
      observedElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [observedElements, lockScroll, unlockScroll]);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        isLocked,
        lockScroll,
        unlockScroll,
        observeElement,
        unobserveElement,
        scrollElementHorizontally,
        horizontalScrollX,
        scrollThresholdTop,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

// Create a custom hook to use the scroll context
export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
