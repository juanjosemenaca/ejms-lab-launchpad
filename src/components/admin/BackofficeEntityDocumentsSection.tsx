import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileUp, Loader2, Trash2 } from "lucide-react";
import {
  deleteEntityDocument,
  fetchEntityDocuments,
  getEntityDocumentSignedUrl,
} from "@/api/entityDocumentsApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { queryKeys } from "@/lib/queryKeys";
import type { BackofficeEntityDocumentRecord, BackofficeEntityKind } from "@/types/entityDocuments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function formatBytes(n: number): string {
  if (n <= 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export type BackofficeEntityDocumentsSectionRef = {
  peekPendingFiles: () => File[];
  clearPendingFiles: () => void;
};

type Props = {
  open: boolean;
  entityKind: BackofficeEntityKind;
  entityId: string | null;
};

export const BackofficeEntityDocumentsSection = forwardRef<BackofficeEntityDocumentsSectionRef, Props>(
  function BackofficeEntityDocumentsSection({ open, entityKind, entityId }, ref) {
    const { t } = useLanguage();
    const qc = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pendingRef = useRef<File[]>([]);
    const [, setPendingTick] = useState(0);
    const bumpPending = () => setPendingTick((n) => n + 1);
    const pendingFiles = pendingRef.current;
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [docToDelete, setDocToDelete] = useState<BackofficeEntityDocumentRecord | null>(null);
    const [deletingDoc, setDeletingDoc] = useState(false);

    useImperativeHandle(ref, () => ({
      peekPendingFiles: () => [...pendingRef.current],
      clearPendingFiles: () => {
        pendingRef.current = [];
        bumpPending();
      },
    }));

    useEffect(() => {
      if (!open) {
        pendingRef.current = [];
        bumpPending();
      }
    }, [open]);

    const listQuery = useQuery({
      queryKey: queryKeys.entityDocuments(entityKind, entityId ?? ""),
      queryFn: () => fetchEntityDocuments(entityKind, entityId!),
      enabled: open && !!entityId,
    });

    const deleteMutation = useMutation({
      mutationFn: deleteEntityDocument,
      onSuccess: async () => {
        if (entityId) {
          await qc.invalidateQueries({ queryKey: queryKeys.entityDocuments(entityKind, entityId) });
        }
      },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length) {
        pendingRef.current = [...pendingRef.current, ...Array.from(files)];
        bumpPending();
      }
      e.target.value = "";
    };

    const removePending = (index: number) => {
      pendingRef.current = pendingRef.current.filter((_, i) => i !== index);
      bumpPending();
    };

    const handleDownload = async (doc: BackofficeEntityDocumentRecord) => {
      setDownloadingId(doc.id);
      try {
        const url = await getEntityDocumentSignedUrl(doc.storagePath, 3600);
        window.open(url, "_blank", "noopener,noreferrer");
      } finally {
        setDownloadingId(null);
      }
    };

    const confirmDeleteDoc = async () => {
      if (!docToDelete) return;
      try {
        setDeletingDoc(true);
        await deleteMutation.mutateAsync(docToDelete);
        setDocToDelete(null);
      } finally {
        setDeletingDoc(false);
      }
    };

    const existingDocs = listQuery.data ?? [];
    const showLoadError = listQuery.isError && !!entityId;

    return (
      <>
        <div className="space-y-2 rounded-lg border p-3 bg-muted/30 sm:col-span-2">
          <p className="text-sm font-medium">{t("admin.entityDocs.section_title")}</p>
          <p className="text-xs text-muted-foreground">{t("admin.entityDocs.section_hint")}</p>
          {showLoadError && (
            <p className="text-xs text-destructive">{t("admin.entityDocs.load_error")}</p>
          )}
          {entityId && listQuery.isLoading && (
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {t("admin.common.loading")}
            </p>
          )}
          {entityId && !listQuery.isLoading && existingDocs.length === 0 && pendingFiles.length === 0 && (
            <p className="text-sm text-muted-foreground py-1">{t("admin.entityDocs.empty_list")}</p>
          )}
          {existingDocs.length > 0 && (
            <ul className="space-y-2 text-sm">
              {existingDocs.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-2 rounded-md border bg-background px-2 py-1.5"
                >
                  <span className="truncate min-w-0" title={doc.originalFilename}>
                    {doc.originalFilename}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                    {formatBytes(doc.fileSize)}
                  </span>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => void handleDownload(doc)}
                      disabled={downloadingId === doc.id}
                      aria-label={t("admin.entityDocs.download")}
                    >
                      {downloadingId === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setDocToDelete(doc)}
                      aria-label={t("admin.entityDocs.delete_doc")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="h-4 w-4" />
              {t("admin.entityDocs.add_files")}
            </Button>
          </div>
          {pendingFiles.length > 0 && (
            <div className="border-t pt-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{t("admin.entityDocs.pending_label")}</p>
              <ul className="space-y-1 text-sm">
                {pendingFiles.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">{f.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removePending(i)}>
                      {t("admin.entityDocs.remove_pending")}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <AlertDialog open={!!docToDelete} onOpenChange={() => !deletingDoc && setDocToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("admin.entityDocs.delete_doc_title")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("admin.entityDocs.delete_doc_desc")}{" "}
                <strong>{docToDelete?.originalFilename}</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deletingDoc}>{t("admin.common.cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  void confirmDeleteDoc();
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={deletingDoc}
              >
                {deletingDoc ? <Loader2 className="h-4 w-4 animate-spin" /> : t("admin.entityDocs.delete_doc")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
);
