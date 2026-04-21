import { Award, Target, Cpu, Users } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Experiencia probada",
    description: "Equipo multidisciplinar con trayectoria en proyectos de I+D e ingeniería.",
  },
  {
    icon: Target,
    title: "Enfoque a medida",
    description: "Cada proyecto se diseña a partir de tus objetivos reales de negocio.",
  },
  {
    icon: Cpu,
    title: "Tecnología puntera",
    description: "Trabajamos con las herramientas y arquitecturas más actuales del sector.",
  },
  {
    icon: Users,
    title: "Acompañamiento end-to-end",
    description: "Desde la idea inicial hasta el despliegue y la evolución continua.",
  },
];

const WhyUs = () => {
  return (
    <section id="por-que" className="relative py-24 md:py-32 border-y border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Por qué EJMS Lab</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Un partner tecnológico fiable
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
