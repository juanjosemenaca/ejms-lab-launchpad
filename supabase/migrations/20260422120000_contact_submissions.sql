-- Mensajes del formulario de contacto de la web pública → visibles solo para ADMIN en backoffice.

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL DEFAULT '',
  message text NOT NULL,
  source text NOT NULL DEFAULT 'main'
);

COMMENT ON TABLE public.contact_submissions IS
  'Mensajes enviados desde el formulario de contacto de la web (sin sesión).';

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_submissions_insert_anon"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 200
    AND length(trim(email)) BETWEEN 3 AND 255
    AND length(company) <= 200
    AND length(trim(message)) BETWEEN 10 AND 8000
    AND length(source) <= 32
  );

CREATE POLICY "contact_submissions_insert_authenticated"
  ON public.contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 200
    AND length(trim(email)) BETWEEN 3 AND 255
    AND length(company) <= 200
    AND length(trim(message)) BETWEEN 10 AND 8000
    AND length(source) <= 32
  );

CREATE POLICY "contact_submissions_select_admin"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.backoffice_users bu
      WHERE bu.auth_user_id = auth.uid()
        AND bu.active IS TRUE
        AND bu.role = 'ADMIN'::public.user_role
    )
  );

CREATE POLICY "contact_submissions_delete_admin"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.backoffice_users bu
      WHERE bu.auth_user_id = auth.uid()
        AND bu.active IS TRUE
        AND bu.role = 'ADMIN'::public.user_role
    )
  );

GRANT INSERT ON TABLE public.contact_submissions TO anon;
GRANT SELECT, DELETE ON TABLE public.contact_submissions TO authenticated;
