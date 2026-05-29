"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
} from "./icons";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip */}
      <div className="hidden bg-night text-steel-300 md:block">
        <div className="wrap-wide flex h-10 items-center justify-between text-[13px]">
          <p className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-accent" />
            {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
            {siteConfig.address.locality} — {siteConfig.address.country}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MailIcon className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="border-b border-paper-200 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="wrap-wide flex h-20 items-center justify-between gap-4">
          <Logo variant="light" />

          {/* Desktop navigation */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.phoneHref}
              className="hidden items-center gap-2 rounded-md border border-paper-200 px-4 py-2.5 text-sm font-bold text-night transition-colors hover:border-accent hover:text-accent xl:flex"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/#contact"
              className="hidden items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-600 sm:flex"
            >
              Devis gratuit
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid h-11 w-11 place-items-center rounded-md text-night transition-colors hover:bg-paper lg:hidden"
            >
              {menuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Navigation principale"
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-paper-200 bg-white px-5 pb-8 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {mainNav.map((link) => (
                <li key={link.href} className="border-b border-paper-200">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3.5 text-base font-semibold text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white"
            >
              Demander un devis gratuit
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 rounded-md border border-paper-200 px-5 py-3 text-sm font-semibold text-night"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              {siteConfig.phoneDisplay}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
