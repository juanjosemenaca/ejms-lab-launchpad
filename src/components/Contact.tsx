import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { submitContactMessage } from "@/api/contactSubmissionsApi";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

const schema = z.object({
  name: z.string().trim().min(2, "Introduce tu nombre").max(100),
  email: z.string().trim().email("Email no válido").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(1000),
});

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!isSupabaseConfigured()) {
      toast.error("El formulario no está disponible (falta configurar Supabase).");
      return;
    }
    setSubmitting(true);
    try {
      await submitContactMessage({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company ?? "",
        message: parsed.data.message,
        source: "main",
      });
      toast.success("¡Mensaje enviado! Te responderemos lo antes posible.");
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo enviar el mensaje.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium text-primary">Contacto</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Cuéntanos qué tienes en mente. Te respondemos en menos de 24 horas laborables.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card/60 p-6 md:p-8 backdrop-blur shadow-elegant"
          >
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" placeholder="Tu nombre" required maxLength={100} />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="tu@email.com" required maxLength={255} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa (opcional)</Label>
                  <Input id="company" name="company" placeholder="Tu empresa" maxLength={150} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  required
                  maxLength={1000}
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-glow"
              >
                {submitting ? "Enviando..." : (<>Enviar mensaje <Send /></>)}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
