import Link from "next/link";
import Image from "next/image";

/**
 * Official Daniel-Lux logo image, framed in a rounded border.
 * The artwork already has a dark background, so the border + rounded corners
 * turn it into a clean badge that reads well on both light and dark sections.
 */
export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const border =
    variant === "dark" ? "border-night-600" : "border-night-700";
  return (
    <Link
      href="/"
      aria-label="Daniel-Lux Entreprise — accueil"
      className={`inline-flex shrink-0 overflow-hidden rounded-xl border ${border} shadow-sm ${className}`}
    >
      <Image
        src="/images/logo-daniel-lux.png"
        alt="Daniel-Lux Entreprise"
        width={1131}
        height={300}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  );
}

/** Footer alias — dark-background variant. */
export function LogoWordmark({ className = "" }: { className?: string }) {
  return <Logo variant="dark" className={className} />;
}
