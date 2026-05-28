"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils/currency";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms
}

export function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let startTimestamp: number | null = null;
    const startValue = currentValue;
    const endValue = value;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setCurrentValue(startValue + (endValue - startValue) * easeOut);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration, mounted]); 

  return <span>{formatCurrency(currentValue)}</span>;
}
