import PageLayout from "../../components/layout/PageLayout";
import PageHeader from "../../components/layout/PageHeader";
import ContextForm from "./ContextForm";

export default function ContextoPage() {
  return (
    <PageLayout>
      <PageHeader
        badge="Configuração"
        badgeClassName="text-tertiary bg-tertiary/10 border border-tertiary/20"
        title="Gerenciar Contexto"
        subtitle="Defina os parâmetros operacionais para seu ambiente de análise. Estas configurações fornecem a camada semântica necessária para diagnósticos de log de alta precisão."
      />
      <ContextForm />
    </PageLayout>
  );
}
