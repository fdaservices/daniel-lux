/** Consistent eyebrow + heading + intro block used across content sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
}) {
  const centered = align === "center";
  const titleColor = tone === "dark" ? "text-white" : "text-night";
  const introColor = tone === "dark" ? "text-steel-300" : "text-ink-soft";
  // On light sections the brighter azure fails WCAG AA for small text; use the
  // darker accent-700. On dark sections the bright azure has ample contrast.
  const eyebrowColor = tone === "dark" ? "text-accent" : "text-accent-700";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}>
        {eyebrow}
      </p>
      <Heading
        className={`mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </Heading>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${introColor}`}>{intro}</p>
      )}
    </div>
  );
}
