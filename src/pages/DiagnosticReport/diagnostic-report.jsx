import React, { useState } from 'react';
import { devMock } from '../../services/error.service';
import './diagnostic-report.css';

export default function DiagnosticReport() {
    const incident = devMock();
    const [showDetailedReport, setShowDetailedReport] = useState(false);

    const solutions = [
        {
            id: 1,
            number: '01',
            title: 'Parâmetros de Conexão',
            description: 'Atualizar a string de conexão para incluir maxPoolSize=50 e reduzir serverSelectionTimeoutMS para failover rápido.',
        },
        {
            id: 2,
            number: '02',
            title: 'Variáveis de Ambiente',
            description: 'Ajustar DB_CONNECTION_TIMEOUT no painel de controle do Kubernetes para 10s em vez de 30s para evitar travamento de pods.',
        },
        {
            id: 3,
            number: '03',
            title: 'Escalabilidade Vertical',
            description: 'Considerar o aumento da instância do Atlas de M30 para M40 se os picos de tráfego excederem 80% de CPU/IOPS consistentemente.',
        },
        {
            id: 4,
            number: '04',
            title: 'Monitoramento',
            description: 'Habilitar alertas de \'Wait Queue\' no MongoDB para identificar gargalos de thread antes que resultem em timeouts visíveis.',
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
        <div className="bg-surface text-on-surface min-h-screen">
            {/* TopNavBar */}
            <header className="fixed top-0 w-full z-50 bg-[#060e20]/60 backdrop-blur-xl shadow-2xl shadow-indigo-900/20 flex justify-between items-center px-8 h-16">
                <div className="flex items-center">
                    <span className="text-xl font-black text-white tracking-tighter">LogView</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200">
                        Voltar ao Menu
                    </button>
                    <button className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-6 py-2 rounded-md text-sm font-bold shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:from-purple-500 hover:to-purple-700 active:scale-95 transition-all">
                        Abrir Agente de IA
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 bg-surface overflow-y-auto relative px-8 pt-24 pb-32">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <span className="text-[0.75rem] font-bold text-tertiary uppercase tracking-[0.1em] mb-2 block">
                            DIAGNÓSTICO TÉCNICO
                        </span>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Diagnóstico e Recomendação de Solução
                        </h1>
                        <p className="text-on-surface-variant mt-2 max-w-2xl font-medium">
                            Análise de falha de conectividade detectada no cluster de produção e recomendações operacionais para mitigação.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6 items-start">
                        {/* Error Context & Log Section */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            {/* Error Log Section */}
                            <section className="bg-slate-950/60 rounded-xl overflow-hidden shadow-2xl">
                                <div className="bg-slate-900/80 px-6 py-3 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 text-sm text-lg">⚠️</span>
                                        <span className="text-xs font-mono font-medium text-red-400">raw_error_log.txt</span>
                                    </div>
                                    <span className="text-[10px] text-red-400 font-mono">
                                        Timestamp: {incident.timestamp}
                                    </span>
                                </div>
                                <div className="p-6 font-mono text-xs leading-relaxed bg-slate-950 custom-scrollbar max-h-64 overflow-y-auto whitespace-pre-wrap text-white">
                                    {mockErrorLog}
                                </div>
                            </section>

                            {/* Proposed Solution Section */}
                            <section className="bg-slate-950/40 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                                        ✓
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Solução Proposta & Recomendações</h3>
                                        <p className="text-xs text-on-surface-variant">
                                            Etapas sugeridas para estabilizar a infraestrutura de dados
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {solutions.map((solution) => (
                                        <div
                                            key={solution.id}
                                            className="p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-all border-l-4 border-green-500/50"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-green-400 font-bold font-mono text-sm">
                                                    {solution.number}
                                                </span>
                                                <h4 className="text-sm font-bold text-white">{solution.title}</h4>
                                            </div>
                                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                                {solution.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* AI Rationale Panel */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <div className="bg-slate-900/40 rounded-xl overflow-hidden shadow-2xl sticky top-24">
                                <div className="bg-slate-800/60 px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                            🤖
                                        </div>
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Raciocínio AI</h4>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                                        A análise dos logs indica que a aplicação está exaurindo o pool de conexões padrão
                                        durante picos de carga. A recomendação foca na otimização operacional da conectividade
                                        para garantir que o driver consiga gerenciar threads de forma eficiente sem saturar o
                                        cluster.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="p-3 bg-slate-800/40 rounded-lg border-l-4 border-purple-500/50">
                                            <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest mb-1">
                                                Impacto Operacional
                                            </p>
                                            <p className="text-xs text-white">
                                                Estabilização do tempo de resposta da API sob alta concorrência.
                                            </p>
                                        </div>

                                        <div className="p-3 bg-slate-800/40 rounded-lg border-l-4 border-purple-500/50">
                                            <p className="text-[10px] text-purple-300 font-bold uppercase tracking-widest mb-1">
                                                Risco de Implementação
                                            </p>
                                            <p className="text-xs text-white">
                                                Mínimo. Requer apenas atualização de configurações de runtime.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-full py-4 px-8 bg-[#060e20] flex justify-between items-center z-40">
                <p className="text-[10px] text-slate-600 font-['Plus_Jakarta_Sans'] tracking-widest uppercase">
                    © 2024 DevFix AI. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <button
                        onClick={() => window.open('#privacy', '_self')}
                        className="text-[10px] text-slate-600 font-['Plus_Jakarta_Sans'] tracking-widest uppercase hover:text-indigo-400 transition-all cursor-pointer bg-none border-none"
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => window.open('#terms', '_self')}
                        className="text-[10px] text-slate-600 font-['Plus_Jakarta_Sans'] tracking-widest uppercase hover:text-indigo-400 transition-all cursor-pointer bg-none border-none"
                    >
                        Terms of Service
                    </button>
                    <button
                        onClick={() => window.open('#status', '_self')}
                        className="text-[10px] text-slate-600 font-['Plus_Jakarta_Sans'] tracking-widest uppercase hover:text-indigo-400 transition-all cursor-pointer bg-none border-none"
                    >
                        API Status
                    </button>
                </div>
            </footer>
        </div>
    );
}
