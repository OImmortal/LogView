import React from "react";
import { UserPlus, Search, Edit2, AlertCircle, Send } from "lucide-react";
import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";

function UsuariosPage() {
  const users = [
    {
      id: 1,
      email: "joao.silva@techlog.io",
      level: "ADMIN",
      status: "ATIVO",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      email: "maria.fernanda@devops.com",
      level: "DEV",
      status: "PENDENTE",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 3,
      email: "junior.dev@cloudstack.com.br",
      level: "DEV",
      status: "ATIVO",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        badge="Gestão de Acesso"
        badgeClassName="text-primary bg-primary/10"
        title="Gerir Usuários"
        subtitle="Gestor do CNPJ:"
        subtitleHighlight="12.345.678/0001-99"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-surface-container-high p-2 rounded-lg">
                <UserPlus size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-on-surface">
                Convidar Novo Usuário
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wider mb-2">
                  E-MAIL DO USUÁRIO
                </label>
                <input
                  type="email"
                  placeholder="dev@empresa.com.br"
                  className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg px-4 py-3 text-sm text-on-surface placeholder-slate-600 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant tracking-wider mb-2 mt-4">
                  NÍVEL DE ACESSO
                </label>
                <div className="relative">
                  <select className="w-full bg-surface-container-high border border-outline-variant/50 rounded-lg px-4 py-3 text-sm text-on-surface appearance-none focus:outline-none focus:border-primary transition-colors">
                    <option>Developer</option>
                    <option>Admin</option>
                    <option>Viewer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-6 bg-primary hover:bg-primary-dim text-on-primary font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Enviar Convite
                <Send size={16} />
              </button>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 shadow-lg relative overflow-hidden">
            <h3 className="text-xs font-semibold text-on-surface-variant tracking-wider mb-2">
              USO DA CONTA
            </h3>
            <div className="mb-4">
              <p className="text-xl font-medium text-on-surface mb-1">
                Limite do Plano:
              </p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-on-surface">8/10</span>
                <span className="text-sm font-semibold text-secondary">80%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high rounded-full h-2.5 mb-6">
              <div
                className="bg-secondary h-2.5 rounded-full"
                style={{ width: "80%" }}
              />
            </div>
            <p className="text-xs text-on-surface-variant italic">
              RF-18: O limite de usuários é baseado no seu nível de assinatura
              Enterprise.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 shadow-lg flex-1">
            <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-on-surface">
                Usuários Ativos
              </h2>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
                />
                <input
                  type="text"
                  placeholder="Filtrar por e-mail..."
                  className="bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary w-64"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-[60px_1fr_100px_120px_50px] items-center text-xs font-semibold text-on-surface-variant tracking-wider mb-4 px-2">
                <div>AVATAR</div>
                <div>E-MAIL</div>
                <div>NÍVEL</div>
                <div>STATUS</div>
                <div className="text-right">AÇÕES</div>
              </div>

              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[60px_1fr_100px_120px_50px] items-center py-3 px-2 hover:bg-surface-container-high rounded-lg transition-colors group border-b border-outline-variant/20 last:border-0"
                  >
                    <div>
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-outline-variant object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium text-on-surface">
                      {user.email}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded bg-surface-container-high tracking-wider ${
                          user.level === "ADMIN"
                            ? "text-primary"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {user.level}
                      </span>
                    </div>
                    <div>
                      {user.status === "ATIVO" ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
                          <span className="text-xs font-bold text-secondary tracking-wider">
                            ATIVO
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-tertiary text-on-tertiary tracking-wider">
                          ● PENDENTE
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-surface-container-high p-2 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-error-container/20 border border-error/30 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-error" />
              <p className="text-sm text-error">
                Erro ao enviar convite - Limite atingido (O limite máximo do seu
                plano atual foi alcançado).
              </p>
            </div>
            <button
              type="button"
              className="text-xs font-bold text-on-surface uppercase tracking-wider underline hover:text-on-surface-variant transition-colors whitespace-nowrap ml-4"
            >
              FAZER UPGRADE
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default UsuariosPage;
