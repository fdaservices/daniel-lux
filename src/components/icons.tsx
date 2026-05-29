/** Lightweight inline SVG icon set — no runtime dependency, fully tree-shakeable. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- UI icons ---- */

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1Z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);

export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 13 4 4 10-12" />
  </Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9.6l6.6-.9L12 2Z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const ZoomIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M11 8v6M8 11h6M21 21l-4.3-4.3" />
  </Svg>
);

export const SparkleIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Svg>
);

/* ---- Service icons (one per trade) ---- */

const ServiceSvgs: Record<string, React.ReactNode> = {
  // Gros œuvre — brick wall / foundation
  structure: (
    <>
      <path d="M3 21h18M5 21v-5h14v5M5 16l1-5h12l1 5M7 11V6h10v5" />
      <path d="M12 6v5M9 16v5M15 16v5" />
    </>
  ),
  // Rénovation — house with refresh arrow
  renovation: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  // Isolation — layered wall / thermal
  insulation: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M8 4v16M12 4v16M16 4v16" />
      <path d="M4 9h16M4 14h16" opacity="0.5" />
    </>
  ),
  // Carrelage & parquet — tile grid
  tiling: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </>
  ),
  // Nettoyage — spray / sparkle
  cleaning: (
    <>
      <path d="M9 21h6v-7H9zM12 14V8" />
      <path d="M12 8h4l1-4h-5z" />
      <path d="M19 6h.01M21 9h.01M20 12h.01" />
    </>
  ),
  // Peinture — paint roller
  painting: (
    <>
      <rect x="3" y="4" width="13" height="6" rx="1.5" />
      <path d="M16 7h4v4h-9" />
      <path d="M11 11v3a1 1 0 0 1-1 1H9v6" />
    </>
  ),
  // Faux plafonds — ceiling grid with light
  ceiling: (
    <>
      <path d="M3 5h18M3 9h18" />
      <path d="M7 5v4M12 5v4M17 5v4" />
      <path d="M12 13v3M9.5 19a2.5 2.5 0 0 0 5 0c0-1.5-2.5-3-2.5-3s-2.5 1.5-2.5 3Z" />
    </>
  ),
  // Démolition — hammer / impact
  demolition: (
    <>
      <path d="M14 4 20 10l-3 3-6-6z" />
      <path d="M11 7 4 14v3l3-3" />
      <path d="M4 20h7" />
    </>
  ),
};

export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  return <Svg {...props}>{ServiceSvgs[name] ?? ServiceSvgs.structure}</Svg>;
}
