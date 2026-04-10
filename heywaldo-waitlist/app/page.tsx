import { Navbar } from "@/components/navbar";
import { WaitlistPage } from "@/components/waitlist-page";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <WaitlistPage />
    </div>
  );
}
