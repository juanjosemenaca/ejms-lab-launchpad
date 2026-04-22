import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ejms-lab-logo.png";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#por-que", label: "Por qué nosotros" },
  { href: "#contacto", label: "Contacto" },
  { href: "/admin/login", label: "Backoffice" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between gap-3">
        <a href="#inicio" className="flex min-w-0 items-center gap-2">
          <img src={logo} alt="EJMS Lab S.L. logo" className="h-14 w-auto md:h-16" />
          <span className="sr-only">EJMS Lab</span>
        </a>

        <div className="relative shrink-0">
          <button
            type="button"
            className="text-foreground p-2 rounded-md hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {open ? (
            <div
              className="absolute right-0 top-full z-50 mt-1.5 w-56 max-w-[min(15rem,calc(100vw-1.5rem))] origin-top-right rounded-lg border border-slate-200 bg-white py-2 shadow-lg animate-in slide-in-from-top-2 fade-in duration-200"
              role="menu"
            >
              <nav className="flex max-h-[min(70vh,calc(100vh-6rem))] flex-col gap-0.5 overflow-y-auto px-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    role="menuitem"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
