import Image from "next/image";

const illustrations: Record<string, string> = {
  default: "/illustrations/default.svg",
  error: "/illustrations/error.svg",
  success: "/illustrations/success.svg",
};

export function Illustration({ state }: { state: string }) {
  return (
    <Image
      src={illustrations[state] || illustrations.default}
      alt="Waldo the dalmatian"
      width={400}
      height={400}
      sizes="(max-width: 1024px) 160px, 400px"
      priority
      className="w-40 h-40 lg:w-[400px] lg:h-[400px]"
    />
  );
}
