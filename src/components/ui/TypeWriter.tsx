"use client";

import { ReactTyped } from "react-typed";

type TypeWriterProps = {
  strings: string[];
  className?: string;
};

export function TypeWriter({ strings, className = "" }: TypeWriterProps) {
  return (
    <span className={className}>
      <ReactTyped
        loop
        typeSpeed={65}
        backSpeed={30}
        strings={strings}
        smartBackspace
        backDelay={1800}
        loopCount={0}
        showCursor
        cursorChar="|"
      />
    </span>
  );
}
