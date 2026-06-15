import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLogFile,
  fetchLogFiles,
  getApiErrorMessage,
  LogFile,
  processLogFile,
} from "../../services/api/logFiles";
import { useNotifications } from "../../contexts/NotificationContext";
import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";
import LogUploadButton from "../../components/logs/LogUploadButton";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";

function formatFileSize(bytes?: number): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR");
}

function getStatusLabel(file: LogFile): string {
  return file.statusProcessamento ?? file.status;
}

function statusVariant(status: string) {
  const normalized = status.toUpperCase();
  if (normalized.includes("PROCESS") && !normalized.includes("PROCESSING") && !normalized.includes("PROCESSANDO")) {
    return "success" as const;
  }
  if (normalized.includes("PROCESSING") || normalized.includes("PROCESSANDO")) {
    return "warning" as const;
  }
  if (normalized.includes("ERROR") || normalized.includes("ERRO")) {
    return "error" as const;
  }
  return "info" as const;
}

function isProcessing(file: LogFile): boolean {
  const status = file.status.toUpperCase();
  const label = (file.statusProcessamento ?? "").toUpperCase();
  return status === "PROCESSING" || label.includes("PROCESSANDO");
}

export default function LogsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useNotifications();

  const {
    data: files = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["logFiles"],
    queryFn: fetchLogFiles,
  });

  const processMutation = useMutation({
    mutationFn: processLogFile,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["logFiles"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });

      const summary = result.summary;
      const message = summary
        ? `${summary.critical} erros críticos, ${summary.warning} alertas, ${summary.info} linhas normais`
        : "Varredura concluída com sucesso";

      showToast(message);
    },
    onError: (err) => {
      showToast(getApiErrorMessage(err, "Erro ao processar arquivo"), "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLogFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logFiles"] });
      showToast("Arquivo excluído");
    },
    onError: (err) => {
      showToast(getApiErrorMessage(err, "Erro ao excluir arquivo"), "error");
    },
  });

  return (
    <PageLayout>
      <PageHeader
        badge="Arquivos"
        badgeClassName="text-primary bg-primary/10"
        title="Arquivos de Log"
        subtitle="Gerencie uploads, varreduras e resultados dos arquivos enviados."
        inlineAction={<LogUploadButton />}
      />

      {isLoading ? (
        <p className="text-slate-400">Carregando...</p>
      ) : isError ? (
        <p className="text-error">
          {getApiErrorMessage(error, "Erro ao carregar arquivos")}
        </p>
      ) : (
        <Table
          headers={["Arquivo", "Data", "Tamanho", "Ocorrências", "Status", "Ações"]}
          rows={files.map((file: LogFile) => [
            file.fileName,
            formatDate(file.uploadedAt),
            formatFileSize(file.fileSizeBytes),
            file.totalOccurrences != null
              ? `${file.totalOccurrences} (${file.criticalCount ?? 0} crít. / ${file.warningCount ?? 0} alert.)`
              : "—",
            <Badge
              key={`status-${file.id}`}
              variant={statusVariant(getStatusLabel(file))}
            >
              {getStatusLabel(file)}
            </Badge>,
            <div key={`actions-${file.id}`} className="flex gap-2">
              <Button
                size="sm"
                onClick={() => processMutation.mutate(file.id)}
                disabled={processMutation.isPending || isProcessing(file)}
              >
                Realizar Varredura
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/logs/${file.id}`)}
              >
                Ver Detalhes
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteMutation.mutate(file.id)}
              >
                Excluir
              </Button>
            </div>,
          ])}
        />
      )}

      {files.length === 0 && !isLoading && !isError && (
        <p className="text-slate-400 mt-4">
          Nenhum arquivo enviado. Use "Selecionar Arquivo" para fazer upload.
        </p>
      )}
    </PageLayout>
  );
}
