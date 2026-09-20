export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F3F0]">
      <div className="flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#1A1A1A] [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#1A1A1A] [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#1A1A1A]" />
      </div>
    </div>
  );
}
