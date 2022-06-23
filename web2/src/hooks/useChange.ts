import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useChange = (effect: EffectCallback, deps: DependencyList): void => {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    return effectRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
