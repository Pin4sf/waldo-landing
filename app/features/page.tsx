import { permanentRedirect } from "next/navigation";

// The features page is now "How it works".
export default function FeaturesRedirect() {
  permanentRedirect("/how-it-works");
}
