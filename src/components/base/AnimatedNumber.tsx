import { cn } from "@/utils/cssHelpers";
import { useEffect, useRef, useState } from "react";

const DIGIT_HEIGHT_EM = 1.2;

/**
 * Renders a single character. For digits, it builds a column from
 * the previous digit to the new digit and transitions between them.
 * Non-digit characters (₹, ,, .) are rendered statically.
 */
function DigitSlot({
  char,
  prevChar,
  className,
}: {
  char: string;
  prevChar: string;
  className?: string;
}) {
  const isDigit = /\d/.test(char);
  const isPrevDigit = /\d/.test(prevChar);
  const [animated, setAnimated] = useState(false);

  // Trigger CSS transition after mount so it actually animates
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, [char]);

  // Reset when char changes so next change re-animates
  useEffect(() => {
    setAnimated(false);
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, [char]);

  if (!isDigit) {
    return (
      <span
        style={{ display: "inline-block", lineHeight: `${DIGIT_HEIGHT_EM}em` }}
        className={cn(className)}
      >
        {char}
      </span>
    );
  }

  const from = isPrevDigit ? parseInt(prevChar) : parseInt(char);
  const to = parseInt(char);

  // Build the shortest column: from → to
  // If to >= from, we scroll down (negative translateY); column is [from..to]
  // If to < from (e.g. 9 → 2), we wrap around: [from..9, 0..to]
  const column: string[] = [];
  if (to >= from) {
    for (let i = from; i <= to; i++) column.push(String(i));
  } else {
    for (let i = from; i <= 9; i++) column.push(String(i));
    for (let i = 0; i <= to; i++) column.push(String(i));
  }

  // The target index is always the last item
  const targetIndex = column.length - 1;

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: `${DIGIT_HEIGHT_EM}em`,
        lineHeight: `${DIGIT_HEIGHT_EM}em`,
        verticalAlign: "bottom",
      }}
      className={cn(className)}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: animated
            ? `translateY(calc(-${targetIndex} * ${DIGIT_HEIGHT_EM}em))`
            : `translateY(0)`,
          transition: animated
            ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
          willChange: "transform",
        }}
        className={cn(className)}
      >
        {column.map((d, i) => (
          <span
            key={i}
            style={{
              display: "block",
              height: `${DIGIT_HEIGHT_EM}em`,
              lineHeight: `${DIGIT_HEIGHT_EM}em`,
              textAlign: "center",
            }}
            className={cn(className)}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

interface AnimatedNumberProps {
  value: number | undefined;
  formatter: (n: number) => string;
  wrapperClassName?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  formatter,
  className,
  wrapperClassName,
}: AnimatedNumberProps) {
  const safeValue = value ?? 0;
  const [current, setCurrent] = useState(safeValue);
  const prevRef = useRef(safeValue);

  useEffect(() => {
    if (value !== undefined) {
      prevRef.current = current;
      setCurrent(value);
    }
  }, [value]);

  const currentFormatted = formatter(current);
  const prevFormatted = formatter(prevRef.current);

  // Align characters: pad from the left with spaces to match lengths
  const maxLen = Math.max(currentFormatted.length, prevFormatted.length);
  const padded = currentFormatted.padStart(maxLen, " ");
  const prevPadded = prevFormatted.padStart(maxLen, " ");

  return (
    <span className={cn(`inline-flex items-end text-3xl`, wrapperClassName)}>
      {padded.split("").map((char, i) => (
        <DigitSlot
          key={i}
          char={char}
          prevChar={prevPadded[i] ?? char}
          className={className}
        />
      ))}
    </span>
  );
}
