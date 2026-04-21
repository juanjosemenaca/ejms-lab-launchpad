import { Card } from "@/components/ui/card";
import { FlaskConical, Code2, Lightbulb } from "lucide-react";

const services = [
  {
    icon: FlaskConical,
    title: "I+D y prototipado",
    description:
      "Investigamos, validamos y construimos prototipos funcionales para acelerar tus proyectos de innovación.",
  },
  {
    icon: Code2,
    title: "Desarrollo de software",
    description:
      "Aplicaciones web, plataformas SaaS e integraciones a medida con tecnologías modernas y escalables.",
  },
  {
    icon: Lightbulb,
    title: "Consultoría tecnológica",
    description:
      "Te ayudamos a definir la estrategia, arquitectura y stack adecuados para hacer crecer tu producto.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Servicios</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Soluciones end-to-end para tus retos tecnológicos
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Combinamos investigación aplicada, ingeniería de software y visión estratégica.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <Card
              key={s.title}
              className="group relative overflow-hidden border-border bg-card/60 p-8 backdrop-blur transition-smooth hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-smooth group-hover:bg-primary/20">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
