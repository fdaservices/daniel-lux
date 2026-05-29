import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visual breadcrumb trail + matching BreadcrumbList JSON-LD.
 * "Accueil" is prepended automatically; pass the trail from there onward,
 * the last item being the current page.
 */
export function Breadcrumbs({
  items,
  theme = "light",
}: {
  items: Crumb[];
  theme?: "light" | "dark";
}) {
  const trail: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];

  const linkColor =
    theme === "dark"
      ? "text-steel-300 hover:text-accent"
      : "text-ink-soft hover:text-accent";
  const currentColor = theme === "dark" ? "text-white" : "text-ink";
  const sepColor = theme === "dark" ? "text-night-600" : "text-ink-soft";

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className={`font-medium ${currentColor}`}>
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className={`transition-colors ${linkColor}`}>
                    {crumb.name}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden="true" className={sepColor}>
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
