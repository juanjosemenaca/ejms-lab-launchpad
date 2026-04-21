import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ejms-lab-logo.png";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#por-que", label: "Por qué nosotros" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logo} alt="EJMS Lab S.L. logo" className="h-9 w-auto" />
          <span className="sr-only">EJMS Lab</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="#contacto">Contactar</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95">
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
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <a href="#contacto" onClick={() => setOpen(false)}>Contactar</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
