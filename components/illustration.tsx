import Image from "next/image";

const illustrations: Record<string, string> = {
  default: "/illustrations/default.svg",
  error: "/illustrations/error.svg",
  success: "/illustrations/success.svg",
};

export function Illustration({
  state,
  className = "w-24 h-24",
}: {
  state: string;
  className?: string;
}) {
  return (
    <Image
      src={illustrations[state] || illustrations.default}
      alt="Waldo the dalmatian"
      width={400}
      height={400}
      sizes="120px"
      priority
      className={className}
    />
  );
}
