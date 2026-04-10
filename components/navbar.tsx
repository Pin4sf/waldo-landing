import Image from "next/image";
import { NavLink } from "./nav-link";

const links = [
  { label: "Features", tooltip: "not yet. but waldo already knows you clicked this." },
  { label: "Pricing", tooltip: "free to find out. when we\u2019re ready." },
  { label: "Blog", tooltip: "waldo\u2019s been busy. so have we." },
  { label: "Sign in", tooltip: "you\u2019re early. that\u2019s actually a good sign." },
];

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      <Image src="/logo.svg" alt="Waldo" width={100} height={28} priority />
      <div className="flex items-center gap-8">
        {links.map((l) => (
          <NavLink key={l.label} label={l.label} tooltip={l.tooltip} />
        ))}
      </div>
    </nav>
  );
}
