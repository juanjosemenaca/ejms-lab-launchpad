import logo from "@/assets/ejms-lab-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="EJMS Lab S.L." className="h-8 w-auto" />
            <span className="text-sm text-muted-foreground">EJMS Lab S.L.</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#inicio" className="hover:text-foreground transition-smooth">Inicio</a>
            <a href="#servicios" className="hover:text-foreground transition-smooth">Servicios</a>
            <a href="#por-que" className="hover:text-foreground transition-smooth">Por qué nosotros</a>
            <a href="#contacto" className="hover:text-foreground transition-smooth">Contacto</a>
          </nav>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EJMS Lab S.L. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
