import React from "react";
import { devMock } from "../../services/error.service";
import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";
import "./diagnostic-report.css";

export default function DiagnosticReport() {
  const incident = devMock();

  const solutions = [
    {
      id: 1,
      number: "01",
      title: "Parâmetros de Conexão",
      description:
        "Atualizar a string de conexão para incluir maxPoolSize=50 e reduzir serverSelectionTimeoutMS para failover rápido.",
    },
    {
      id: 2,
      number: "02",
      title: "Variáveis de Ambiente",
      description:
        "Ajustar DB_CONNECTION_TIMEOUT no painel de controle do Kubernetes para 10s em vez de 30s para evitar travamento de pods.",
    },
    {
      id: 3,
      number: "03",
      title: "Escalabilidade Vertical",
      description:
        "Considerar o aumento da instância do Atlas de M30 para M40 se os picos de tráfego excederem 80% de CPU/IOPS consistentemente.",
    },
    {
      id: 4,
      number: "04",
      title: "Monitoramento",
      description:
        "Habilitar alertas de 'Wait Queue' no MongoDB para identificar gargalos de thread antes que resultem em timeouts visíveis.",
    },
  ];

  const mockErrorLog = `MongooseServerSelectionError: connection timed out
at Connection.openUri (/app/node_modules/mongoose/lib/connection.js:825:32)
at /app/node_modules/mongoose/lib/index.js:414:10
at /app/node_modules/mongoose/lib/helpers/promiseOrCallback.js:41:5
at new Promise (<anonymous>)
at Mongoose.connect (/app/node_modules/mongoose/lib/index.js:413:10)
at connectDB (/app/src/config/db.js:25:20)
at Object.<anonymous> (/app/src/server.js:15:1)
at Module._compile (internal/modules/cjs/loader.js:1063:30)

Reason: TopologyDescription { type: 'ReplicaSetNoPrimary', servers: Map(3) { ... }, stale: false, compatible: true, heartbeatFrequencyMS: 10000 }`;

  return (
    <PageLayout>
      <PageHeader
        badge="Diagnóstico Técnico"
        badgeClassName="text-tertiary bg-tertiary/10"
        title="Diagnóstico e Recomendação de Solução"
        subtitle="Análise de falha de conectividade detectada no cluster de produção e recomendações operacionais para mitigação."
      />

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <section className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl border border-outline-variant/30">
            <div className="bg-surface-container-high px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-error text-lg">⚠️</span>
                <span className="text-xs font-mono font-medium text-error">
                  raw_error_log.txt
                </span>
              </div>
              <span className="text-[10px] text-error font-mono">
                Timestamp: {incident.timestamp}
              </span>
            </div>
            <div className="p-6 font-mono text-xs leading-relaxed bg-surface-container-lowest custom-scrollbar max-h-64 overflow-y-auto whitespace-pre-wrap text-on-surface">
              {mockErrorLog}
            </div>
          </section>

          <section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  Solução Proposta & Recomendações
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Etapas sugeridas para estabilizar a infraestrutura de dados
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className="p-4 bg-surface-container-high rounded-lg hover:bg-surface-container transition-all border-l-4 border-secondary/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-secondary font-bold font-mono text-sm">
                      {solution.number}
                    </span>
                    <h4 className="text-sm font-bold text-on-surface">
                      {solution.title}
                    </h4>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl border border-outline-variant/30">
            <div className="bg-surface-container-high px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  🤖
                </div>
                <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  Raciocínio AI
                </h4>
              </div>
            </div>

            <div className="p-6">
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                A análise dos logs indica que a aplicação está exaurindo o pool
                de conexões padrão durante picos de carga. A recomendação foca
                na otimização operacional da conectividade para garantir que o
                driver consiga gerenciar threads de forma eficiente sem saturar
                o cluster.
              </p>

              <div className="space-y-4">
                <div className="p-3 bg-surface-container-high rounded-lg border-l-4 border-primary/50">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">
                    Impacto Operacional
                  </p>
                  <p className="text-xs text-on-surface">
                    Estabilização do tempo de resposta da API sob alta
                    concorrência.
                  </p>
                </div>

                <div className="p-3 bg-surface-container-high rounded-lg border-l-4 border-primary/50">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">
                    Risco de Implementação
                  </p>
                  <p className="text-xs text-on-surface">
                    Mínimo. Requer apenas atualização de configurações de
                    runtime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
