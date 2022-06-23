import { useRef, useState } from "react";
import { useChange } from "./useChange";

const IS_DEMO = import.meta.env.DEV || import.meta.env.VITE_IS_DEMO_MODE === "true";

const TRIPLE_CLICK_MS = 600;

export const useDemoValue = <T = string>(
  demoValue: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
): (() => void) => {
  const clickTimesRef = useRef<[number, number]>([0, 0]);
  const [clickCount, setClickCount] = useState(0);

  useChange(() => {
    const [firstClickTime, secondClickTime] = clickTimesRef.current;
    const nowTime = Date.now();
    if (nowTime <= firstClickTime + TRIPLE_CLICK_MS) {
      if (secondClickTime >= firstClickTime) {
        // is triple click
        setValue(demoValue);
        clickTimesRef.current = [0, 0];
      } else {
        clickTimesRef.current = [firstClickTime, nowTime];
      }
    } else {
      clickTimesRef.current = [nowTime, 0];
    }
  }, [clickCount]);

  return () => {
    if (IS_DEMO) {
      setClickCount(clickCount + 1);
    }
  };
};
