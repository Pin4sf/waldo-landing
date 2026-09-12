import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  tooltip: string;
};

const navItems: NavItem[] = [
  { label: "Features", href: "/features", tooltip: "Explore the full tour of Waldo." },
  { label: "Pricing", href: "/pricing", tooltip: "free to find out. when we're ready." },
  { label: "Blog", href: "/blogs", tooltip: "waldo's been busy. so have we." },
  { label: "Support", href: "/support", tooltip: "here if you need us." },
];

function WaldoMark() {
  const spots = [
    "M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z",
    "M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z",
    "M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z",
    "M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z",
    "M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z",
    "M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z",
    "M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z",
  ];

  return (
    <svg width="18" height="16" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {spots.map((d) => (
        <path key={d} d={d} fill="#1A1A1A" />
      ))}
    </svg>
  );
}

export function BuildSiteNav() {
  return (
    <>
      <header className="build-site-nav relative z-30 flex h-9 items-center justify-center gap-8 border-b border-black/10 bg-[#F4F3F0] px-5 text-[13.5px] text-[#1A1A1A]">
        <Link href="/" aria-label="Waldo home" className="flex items-center">
          <WaldoMark />
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-8">
          {navItems.map((item) => (
            <span
              key={item.label}
              tabIndex={0}
              className="build-site-nav-item cursor-default text-[#1A1A1A]/70 transition-colors hover:text-[#1A1A1A]"
            >
              {item.label}
              <span className="build-site-nav-tooltip" role="tooltip">
                {item.tooltip}
              </span>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/waitlist"
            className="rounded-full bg-[#1A1A1A] px-3 py-[6px] text-[11px] font-medium leading-normal text-[#FAFAF8] transition-opacity hover:opacity-90"
            style={{ lineHeight: "1.2" }}
          >
            Early Access
          </Link>
        </div>
      </header>

      <style>{`
        .build-site-nav-item {
          position: relative;
        }
        .build-site-nav-tooltip {
          position: absolute;
          left: 50%;
          top: calc(100% + 10px);
          transform: translate3d(-50%, -4px, 0);
          background: #1a1a1a;
          color: #fafaf8;
          border-radius: 10px;
          padding: 7px 10px;
          font-size: 12px;
          font-style: italic;
          font-weight: 430;
          line-height: 1.18;
          white-space: nowrap;
          box-shadow: 0 12px 28px rgba(26, 26, 26, 0.14);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 160ms ease, transform 160ms ease, visibility 160ms ease;
          z-index: 50;
        }
        .build-site-nav-item:first-child .build-site-nav-tooltip {
          left: 0;
          transform: translate3d(0, -4px, 0);
        }
        .build-site-nav-item:last-child .build-site-nav-tooltip {
          left: auto;
          right: 0;
          transform: translate3d(0, -4px, 0);
        }
        .build-site-nav-item:hover .build-site-nav-tooltip,
        .build-site-nav-item:focus-visible .build-site-nav-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translate3d(-50%, 0, 0);
        }
        .build-site-nav-item:first-child:hover .build-site-nav-tooltip,
        .build-site-nav-item:first-child:focus-visible .build-site-nav-tooltip,
        .build-site-nav-item:last-child:hover .build-site-nav-tooltip,
        .build-site-nav-item:last-child:focus-visible .build-site-nav-tooltip {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </>
  );
}
