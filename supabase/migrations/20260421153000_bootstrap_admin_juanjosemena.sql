-- Bootstrap de acceso inicial al backoffice para el proyecto nuevo.
-- Este registro permite que, tras autenticar en Supabase Auth, la app
-- enlace automáticamente auth_user_id por email en el primer login.

INSERT INTO public.backoffice_users (
  email,
  role,
  company_worker_id,
  first_name,
  last_name,
  dni,
  mobile,
  postal_address,
  city,
  employment_type,
  active,
  enabled_modules,
  auth_user_id,
  must_change_password,
  password_changed_at
) VALUES (
  lower(trim('juanjosemena@inorme.com')),
  'ADMIN',
  NULL,
  'Juan Jose',
  'Menaca',
  '00000000A',
  '',
  '',
  'Madrid',
  'FIJO',
  true,
  ARRAY['VACATIONS', 'MESSAGES', 'TIME_CLOCK', 'AGENDA', 'GASTOS']::text[],
  NULL,
  true,
  NULL
)
ON CONFLICT (email) DO UPDATE SET
  role = 'ADMIN',
  active = true,
  enabled_modules = ARRAY['VACATIONS', 'MESSAGES', 'TIME_CLOCK', 'AGENDA', 'GASTOS']::text[],
  auth_user_id = COALESCE(public.backoffice_users.auth_user_id, EXCLUDED.auth_user_id),
  updated_at = now();
