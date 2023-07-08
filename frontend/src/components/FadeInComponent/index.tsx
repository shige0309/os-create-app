import React, { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const FadeInComponent = ({ children }: { children?: ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [opacity, setOpacity] = useState<number>(0);
  const [MarginTop, setMarginTop] = useState<string>("5rem");

  useEffect(() => {
    if (inView) {
      setOpacity(1);
      setMarginTop("0");
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{ transition: "2s", opacity: opacity, marginTop: MarginTop }}
    >
      {children}
    </div>
  );
};
