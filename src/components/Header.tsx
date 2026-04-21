import { Button } from "@/components/ui/button";
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
      <div className="container mx-auto flex h-20 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logo} alt="EJMS Lab S.L. logo" className="h-14 w-auto md:h-16" />
          <span className="sr-only">EJMS Lab</span>
        </a>

        <button
          className="text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95">
          <nav className="container mx-auto py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
