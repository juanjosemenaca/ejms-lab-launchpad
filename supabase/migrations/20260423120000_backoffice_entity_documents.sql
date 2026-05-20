-- Documentos adjuntos en fichas de cliente, trabajador (plantilla) y proveedor.
-- Storage: bucket existente «project-documents», rutas bajo crm-docs/...

CREATE TABLE public.backoffice_entity_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_kind text NOT NULL CHECK (entity_kind IN ('CLIENT', 'COMPANY_WORKER', 'PROVIDER')),
  entity_id uuid NOT NULL,
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_backoffice_entity_documents_path
  ON public.backoffice_entity_documents (storage_path);

CREATE INDEX idx_backoffice_entity_documents_entity
  ON public.backoffice_entity_documents (entity_kind, entity_id, created_at DESC);

COMMENT ON TABLE public.backoffice_entity_documents IS
  'Adjuntos en fichas CRM (cliente, trabajador empresa, proveedor). entity_id apunta a clients.id, company_workers.id o providers.id según entity_kind.';

ALTER TABLE public.backoffice_entity_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "backoffice_authenticated_all_backoffice_entity_documents"
  ON public.backoffice_entity_documents FOR ALL TO authenticated USING (true) WITH CHECK (true);

GRANT ALL ON public.backoffice_entity_documents TO authenticated;

NOTIFY pgrst, 'reload schema';
