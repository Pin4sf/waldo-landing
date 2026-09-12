import { BuildSiteNav } from "@/components/build-site-nav";
import { WaitlistPage } from "./waitlist-page";

export function PageLayout() {
  return (
    <div className="min-h-screen bg-[#f4f3f0]">
      <BuildSiteNav />
      <WaitlistPage />
    </div>
  );
}
