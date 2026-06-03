// Navigation dots for mobile card carousels

type Props = { count: number; current: number; onSelect?: (i: number) => void };

export function MobileDots({ count, current, onSelect }: Props) {
  return (
    <div className="flex gap-[8px] items-center justify-center mt-5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Card ${i + 1}`}
          onClick={onSelect ? () => onSelect(i) : undefined}
          style={{
            width:        i === current ? "20px" : "6px",
            height:       "6px",
            borderRadius: "3px",
            background:   i === current ? "var(--ink)" : "var(--border-focus)",
            transition:   "width 300ms var(--ease-premium), background-color 300ms var(--ease-premium)",
            border:       "none",
            padding:      0,
            cursor:       onSelect ? "pointer" : "default",
            flexShrink:   0,
          }}
        />
      ))}
    </div>
  );
}
