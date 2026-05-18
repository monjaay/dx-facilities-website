type EyebrowProps = {
  children: string;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`dx-eyebrow ${className}`}>
      {children}
    </p>
  );
}
