import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden />

      <div className="container relative mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          I+D y desarrollo tecnológico
        </div>

        <h1
          className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Convertimos ideas en{" "}
          <span className="text-gradient">tecnología</span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          En EJMS Lab impulsamos tu próximo producto con I+D aplicada, desarrollo de software a medida
          y consultoría tecnológica orientada a resultados.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-glow"
          >
            <a href="#contacto">
              Hablemos de tu proyecto <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-border bg-card/50 backdrop-blur">
            <a href="#servicios">Ver servicios</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
