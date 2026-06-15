import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import PlanosPage from "../pages/planos/PlanosPage";
import DiagnosticReport from "../pages/diagnostic/DiagnosticReport";
import ContextoPage from "../pages/contexto/ContextoPage";
import UsuariosPage from "../pages/usuarios/UsuariosPage";
import LogsPage from "../pages/logs/LogsPage";
import LogDetailPage from "../pages/logs/LogDetailPage";
import LoginPage from "../pages/login/LoginPage";
import HistoricoPage from "../pages/historico/HistoricoPage";
import MonitoramentoPage from "../pages/monitoramento/MonitoramentoPage";
import ConfiguracoesPage from "../pages/configuracoes/ConfiguracoesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/planos" element={<PlanosPage />} />
      <Route path="/diagnostic" element={<DiagnosticReport />} />
      <Route path="/contexto" element={<ContextoPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/logs/:id" element={<LogDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/historico" element={<HistoricoPage />} />
      <Route path="/monitoramento" element={<MonitoramentoPage />} />
      <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
