import Link from "next/link";

/**
 * Typographic Daniel-Lux wordmark — reproduces the logo (DANIEL in steel,
 * LUX in azure, ENTREPRISE underneath) as crisp text so it scales perfectly
 * and adapts to light or dark backgrounds.
 */
export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const danielColor = variant === "dark" ? "text-white" : "text-night";
  return (
    <Link
      href="/"
      aria-label="Daniel-Lux — accueil"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span className="flex items-baseline text-2xl font-black tracking-tight sm:text-[1.7rem]">
        <span className={danielColor}>DANIEL</span>
        <span className="text-accent">-LUX</span>
      </span>
      <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.5em] text-accent">
        Entreprise
      </span>
    </Link>
  );
}

/** Footer alias — dark-background variant. */
export function LogoWordmark({ className = "" }: { className?: string }) {
  return <Logo variant="dark" className={className} />;
}
