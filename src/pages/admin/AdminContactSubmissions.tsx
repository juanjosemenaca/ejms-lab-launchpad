import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { useContactSubmissions } from "@/hooks/useContactSubmissions";
import { deleteContactSubmission } from "@/api/contactSubmissionsApi";
import { queryKeys } from "@/lib/queryKeys";
import { useToast } from "@/hooks/use-toast";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import type { ContactSubmissionRecord } from "@/types/contactSubmissions";

const AdminContactSubmissions = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const supabaseOk = isSupabaseConfigured();
  const { data: rows = [], isLoading, isError, error } = useContactSubmissions(supabaseOk);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewRow, setViewRow] = useState<ContactSubmissionRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const localeTag =
    language === "en" ? "en-GB" : language === "ca" ? "ca-ES" : "es-ES";
  const formatDt = (iso: string) =>
    new Date(iso).toLocaleString(localeTag, { dateStyle: "short", timeStyle: "short" });

  const deleteMutation = useMutation({
    mutationFn: deleteContactSubmission,
    onSuccess: async () => {
      toast({ title: t("admin.contactSubmissions.toast_deleted") });
      setDeleteId(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.contactSubmissions });
    },
    onError: (e) => {
      toast({
        title: t("admin.common.error"),
        description: e instanceof Error ? e.message : "",
        variant: "destructive",
      });
    },
  });

  if (!supabaseOk) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {t("admin.login.env_missing")} <code className="text-xs">.env</code>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("admin.contactSubmissions.title")}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t("admin.contactSubmissions.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("admin.contactSubmissions.title")}</CardTitle>
          <CardDescription>{t("admin.contactSubmissions.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {t("admin.contactSubmissions.load_error")}
              {error instanceof Error ? `: ${error.message}` : ""}
            </p>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">{t("admin.contactSubmissions.empty")}</p>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">{t("admin.contactSubmissions.col_date")}</TableHead>
                    <TableHead>{t("admin.contactSubmissions.col_name")}</TableHead>
                    <TableHead>{t("admin.contactSubmissions.col_email")}</TableHead>
                    <TableHead>{t("admin.contactSubmissions.col_company")}</TableHead>
                    <TableHead>{t("admin.contactSubmissions.col_source")}</TableHead>
                    <TableHead className="text-right w-[120px]">{t("admin.common.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                        {formatDt(r.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${r.email}`} className="text-primary hover:underline">
                          {r.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[140px] truncate text-muted-foreground text-sm">
                        {r.company || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{r.source}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={t("admin.contactSubmissions.view")}
                          onClick={() => {
                            setViewRow(r);
                            setViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          aria-label={t("admin.contactSubmissions.delete")}
                          onClick={() => setDeleteId(r.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.contactSubmissions.dialog_title")}</DialogTitle>
            <DialogDescription>
              {viewRow ? formatDt(viewRow.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>
          {viewRow && (
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-muted-foreground">{t("admin.contactSubmissions.col_name")}: </span>
                {viewRow.name}
              </p>
              <p>
                <span className="text-muted-foreground">{t("admin.contactSubmissions.col_email")}: </span>
                <a href={`mailto:${viewRow.email}`} className="text-primary hover:underline">
                  {viewRow.email}
                </a>
              </p>
              {viewRow.company ? (
                <p>
                  <span className="text-muted-foreground">{t("admin.contactSubmissions.col_company")}: </span>
                  {viewRow.company}
                </p>
              ) : null}
              <p>
                <span className="text-muted-foreground">{t("admin.contactSubmissions.col_source")}: </span>
                {viewRow.source}
              </p>
              <div className="pt-2 border-t">
                <p className="text-muted-foreground mb-1">{t("admin.contactSubmissions.col_message")}</p>
                <p className="whitespace-pre-wrap break-words">{viewRow.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.contactSubmissions.delete_confirm_title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("admin.contactSubmissions.delete_confirm_desc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("admin.common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              {deleteMutation.isPending ? t("admin.common.loading") : t("admin.contactSubmissions.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminContactSubmissions;
