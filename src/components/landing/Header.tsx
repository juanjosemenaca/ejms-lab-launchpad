import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

const navKeys = [
  { href: "#historia", key: "nav_company" },
  { href: "#servicios", key: "nav_services" },
  { href: "#productos", key: "nav_products" },
  { href: "#nosotros", key: "nav_about" },
  { href: "#clientes", key: "nav_clients" },
  { href: "#contacto", key: "nav_contact" },
] as const;

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const logoSrc = publicAssetUrl("logo-inorme.png");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinkClass =
    "text-left rounded-md transition-colors uppercase font-medium w-full px-3 py-2.5 text-sm text-foreground hover:bg-muted";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || menuOpen
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 min-h-[72px] py-2 overflow-x-hidden">
        <a href="#" className="relative z-10 flex min-w-0 shrink items-center">
          {!logoError ? (
            <div className="flex h-9 max-h-9 w-auto max-w-[min(280px,calc(100vw-8rem))] items-center">
              <img
                src={logoSrc}
                alt="Inorme S.L. - Informática, organización y métodos"
                className="max-h-full w-auto max-w-full object-contain object-left"
                loading="eager"
                decoding="async"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <span className="text-[22px] font-bold tracking-tight">
              <span className="text-primary">in</span>
              <span className={isScrolled || menuOpen ? "text-foreground" : "text-white"}>orme</span>
            </span>
          )}
        </a>

        <div className="relative flex shrink-0 items-center gap-2">
          <LanguageSwitcher variant={isScrolled || menuOpen ? "dark" : "light"} />
          <button
            type="button"
            className="inline-flex p-2 -mr-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={menuOpen ? t("admin.layout.close_menu") : t("nav_menu_aria")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className={`h-6 w-6 ${isScrolled || menuOpen ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>

          {menuOpen ? (
            <div
              className="absolute right-0 top-full z-50 mt-1.5 w-60 max-w-[min(15rem,calc(100vw-1rem))] origin-top-right rounded-lg border border-slate-200 bg-white py-3 shadow-lg animate-in slide-in-from-top-2 fade-in duration-200"
              role="menu"
            >
              <div className="px-3 pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("nav_menu_title")}
                </p>
              </div>
              <nav className="flex max-h-[min(65vh,calc(100vh-6rem))] flex-col gap-0.5 overflow-y-auto px-1" aria-label="Principal">
                {navKeys.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className={navLinkClass}
                  >
                    {t(link.key)}
                  </button>
                ))}
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-3 py-2.5 text-left text-sm font-medium uppercase text-primary hover:bg-muted rounded-md"
                >
                  {t("nav_backoffice")}
                </Link>
                <div className="mt-3 border-t border-border/50 px-2 pt-3">
                  <Button type="button" onClick={() => scrollTo("#contacto")} className="w-full rounded-full" size="sm">
                    {t("nav_contactBtn")}
                  </Button>
                </div>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
