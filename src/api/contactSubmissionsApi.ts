import { requireSupabase } from "@/api/supabaseRequire";
import { supabase } from "@/lib/supabaseClient";
import type { ContactSubmissionRecord, ContactSubmissionSource } from "@/types/contactSubmissions";
import type { ContactSubmissionRow } from "@/types/database";

function rowToDomain(row: ContactSubmissionRow): ContactSubmissionRecord {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    company: row.company,
    message: row.message,
    source: row.source,
  };
}

export type SubmitContactInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: ContactSubmissionSource;
};

/** Envío desde la web pública (usa cliente anon si hay sesión o no). */
export async function submitContactMessage(input: SubmitContactInput): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase no está configurado.");
  }
  const payload = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: (input.company ?? "").trim(),
    message: input.message.trim(),
    source: (input.source ?? "main").trim() || "main",
  };
  const { error } = await supabase.from("contact_submissions").insert(payload);
  if (error) throw error;
}

export async function fetchContactSubmissions(): Promise<ContactSubmissionRecord[]> {
  const sb = requireSupabase();
  const { data: rows, error } = await sb
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (rows ?? []).map((r) => rowToDomain(r as ContactSubmissionRow));
}

export async function deleteContactSubmission(id: string): Promise<void> {
  const sb = requireSupabase();
  const { error } = await sb.from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
}
