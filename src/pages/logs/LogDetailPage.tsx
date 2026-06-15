import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLogFileById, LogEntry } from "../../services/api/logFiles";
import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";

export default function LogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["logFile", id],
    queryFn: () => fetchLogFileById(id!),
    enabled: !!id,
  });

  if (isLoading || !data) {
    return (
      <PageLayout>
        <p className="text-slate-400">Carregando...</p>
      </PageLayout>
    );
  }

  const severityVariant = (severity: string) => {
    if (severity === "CRITICAL") return "error" as const;
    if (severity === "WARNING") return "warning" as const;
    return "info" as const;
  };

  return (
    <PageLayout>
      <PageHeader
        badge="Varredura"
        badgeClassName="text-secondary bg-secondary/10"
        title="Resultado da Varredura"
        subtitle={data.fileName}
        actions={
          <Button variant="secondary" onClick={() => navigate("/logs")}>
            Voltar
          </Button>
        }
      />

      <div className="mb-8">
        <h2 className="text-lg font-bold text-on-surface mb-4">Resumo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            title={`${data.summary.critical} Erros Críticos`}
            variant="error"
          />
          <Card title={`${data.summary.warning} Alertas`} variant="warning" />
          <Card title={`${data.summary.info} Linhas Normais`} variant="info" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card title="CRITICAL" variant="error" compact />
        <Card title="WARNING" variant="warning" compact />
        <Card title="INFO" variant="info" compact />
      </div>

      <Table
        headers={["Linha", "Criticidade", "Mensagem"]}
        rows={data.entries.map((entry: LogEntry) => [
          String(entry.line),
          <Badge
            key={`sev-${entry.line}`}
            variant={severityVariant(entry.severity)}
          >
            {entry.severity}
          </Badge>,
          entry.message,
        ])}
      />
    </PageLayout>
  );
}
