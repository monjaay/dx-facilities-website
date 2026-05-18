type StripeConfig = {
  width: string;
  height: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  opacity?: number;
};

type DiagonalStripeProps = {
  stripes: StripeConfig[];
  className?: string;
};

export function DiagonalStripe({ stripes, className = "" }: DiagonalStripeProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      {stripes.map((stripe, i) => (
        <span
          key={i}
          className="dx-stripe"
          style={{
            width: stripe.width,
            height: stripe.height,
            top: stripe.top,
            right: stripe.right,
            bottom: stripe.bottom,
            left: stripe.left,
            opacity: stripe.opacity ?? 0.15,
          }}
        />
      ))}
    </div>
  );
}
