import React, { useState, useRef, useEffect } from 'react';
import { devMock, closeError, archiveError } from '../../services/error.service';
import './llm-chat.css';
import { llmChatService } from '../../services/llm-chat.service';

export default function LLMChat() {
    const incident = devMock();

    const [pane, setPane] = useState('environment'); // 'environment' | 'docs'

    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'agent',
            content: incident.suggestion || 'Análise automática disponível.',
            followUp: 'Deseja um detalhamento aprimorado para esse caso de erro?',
        },
    ]);

    const [inputValue, setInputValue] = useState('');
    const [sending, setSending] = useState(false);
    const feedRef = useRef(null);

    // always scroll to bottom when messages change
    useEffect(() => {
        const feed = feedRef.current;
        if (!feed) return;

        // ensure DOM updated then scroll to bottom smoothly
        requestAnimationFrame(() => {
            feed.scrollTo({ top: feed.scrollHeight, behavior: 'smooth' });
        });
    }, [messages]);

    // helper to send a user message, call LLM and append assistant reply
    const sendUserMessage = async (content) => {
        if (!content || sending) return;
        setSending(true);

        // append user message
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), type: 'user', content },
        ]);

        try {
            const res = await llmChatService.ask(content, { incidentId: incident.id });
            let text = null;
            if (res == null) text = 'Sem resposta do servidor.';
            else if (typeof res === 'string') text = res;
            else if (res.text) text = res.text;
            else if (res.output) text = res.output;
            else text = JSON.stringify(res);

            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, type: 'agent', content: text },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 2, type: 'agent', content: 'Erro: não foi possível obter resposta da LLM.' },
            ]);
            console.error('LLM ask error', err);
        } finally {
            setSending(false);
        }
    };

    const handleSendMessage = () => {
        const value = inputValue.trim();
        if (!value) return;
        setInputValue('');
        sendUserMessage(value);
    };

    const sendMoreDetais = () => {
        const content = "Com base no mesmo contexto, detalhe a sugestão para que eu possa implementar.";
        sendUserMessage(content);
    };

    const copyContext = () => {
        const agentMessage = messages.find(msg => msg.type === 'agent');
        const contextText = `CONTEXTO DO ERRO:
            Título: ${incident.title}
            ID: ${incident.id}
            Runtime: ${incident.stack?.runtime}
            Database: ${incident.stack?.database}

            SUGESTÃO DO AGENTE:
            ${agentMessage?.content}`;

        navigator.clipboard.writeText(contextText).then(() => {
            alert('Contexto copiado para a área de transferência!');
        });
    };

    const handleCloseError = async () => {
        if (!incident?.id) return alert('ID do erro não disponível');
        try {
            await closeError(incident.id);
            alert('Erro marcado como fechado.');
        } catch (err) {
            console.error('closeError error', err);
            alert('Falha ao fechar o erro.');
        }
    };

    const handleArchiveError = async () => {
        if (!incident?.id) return alert('ID do erro não disponível');
        try {
            await archiveError(incident.id);
            alert('Erro arquivado.');
        } catch (err) {
            console.error('archiveError error', err);
            alert('Falha ao arquivar o erro.');
        }
    };

    const handleShare = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
            alert('URL do chat copiado para a área de transferência!');
        } catch (err) {
            console.error('share error', err);
            alert('Falha ao copiar o URL.');
        }
    };

    return (
        <div className="bg-transparent text-on-surface min-h-screen flex flex-col">
            <div className="flex pt-16 overflow-hidden h-[calc(100vh)]">
                {/* Sidebar */}
                <aside className="bg-[#0f1930] flex flex-col h-[calc(100vh-64px)] w-80 shrink-0 border-r border-[#060e20]">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-error/10 text-error">⚠️</div>
                            <div>
                                <h2 className="text-indigo-400 font-bold">Erro contexto</h2>
                                <p className="text-slate-400 text-xs">ID: {incident.id}</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant mb-1">Detected Error</p>
                                    <p className="text-on-surface font-semibold text-lg">{incident.title}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error/20 text-error border border-error/30 uppercase">CRITICAL</span>
                                    <span className="text-slate-400 text-xs font-mono">2023-10-27 14:22:10 UTC</span>
                                </div>
                            </div>
                            <div className="h-px bg-outline-variant/10"></div>
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                                    <span className="text-xs font-bold uppercase">Environment & Stack</span>
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center gap-2 mb-3">
                                        <button
                                            type="button"
                                            onClick={() => setPane('environment')}
                                            className={`px-3 py-2 rounded-md text-sm font-semibold ${pane === 'environment' ? 'bg-indigo-400 text-white' : 'text-slate-400 bg-transparent hover:bg-[#192540]'}`}
                                        >
                                            Environment
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPane('docs')}
                                            className={`px-3 py-2 rounded-md text-sm font-semibold ${pane === 'docs' ? 'bg-indigo-400 text-white' : 'text-slate-400 bg-transparent hover:bg-[#192540]'}`}
                                        >
                                            Related Docs
                                        </button>
                                    </div>

                                    {pane === 'environment' ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-surface-container-high p-3 rounded-lg border border-[#060e20]/40">
                                                <p className="text-[10px] text-slate-400 uppercase">Runtime</p>
                                                <p className="text-sm font-medium">{incident.stack?.runtime}</p>
                                            </div>
                                            <div className="bg-surface-container-high p-3 rounded-lg border border-[#060e20]/40">
                                                <p className="text-[10px] text-slate-400 uppercase">Database</p>
                                                <p className="text-sm font-medium">{incident.stack?.database}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {Object.entries(incident.related_docs || {}).length === 0 && (
                                                <li className="text-slate-400 text-sm">No documentation links available.</li>
                                            )}
                                            {Object.entries(incident.related_docs || {}).map(([key, url]) => (
                                                <li key={key}>
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block p-3 rounded-lg bg-surface-variant hover:bg-[#192540] text-indigo-300 break-all"
                                                    >
                                                        <span className="font-medium capitalize mr-2">{key}</span>
                                                        <span className="text-xs text-slate-400">{url}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto p-4 border-t border-[#060e20]/5">
                        <div className="flex justify-around">
                            <button onClick={handleCloseError} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors">
                                <span className="inline-block">
                                    <img src="/icons/tick.png" alt="Tick" className="w-4 h-4" />
                                </span>
                                <span className="text-[10px]">Close</span>
                            </button>
                            <button onClick={handleArchiveError} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors">
                                <span className="inline-block">
                                    <img src="/icons/archive.png" alt="Archive" className="w-4 h-4" />
                                </span>
                                <span className="text-[10px]">Archive</span>
                            </button>
                            <button onClick={handleShare} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors">
                                <span className="inline-block">
                                    <img src="/icons/share.png" alt="Share" className="w-4 h-4" />
                                </span>
                                <span className="text-[10px]">Export</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col bg-surface-container-low h-full">
                    {/* Chat Messages */}
                    <div ref={feedRef} className="flex-1 overflow-y-auto p-8 space-y-8 llm-chat-feed">
                            {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse ml-auto max-w-3xl' : 'max-w-3xl'}`}>
                                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${msg.type === 'agent' ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400' : 'bg-surface-variant border border-[#060e20]/30'}`}>
                                    {msg.type === 'agent' ? '🤖' : '👤'}
                                </div>
                                <div className={`${msg.type === 'user' ? 'bg-primary/10' : 'space-y-4'}`}>
                                    {msg.type === 'agent' && (
                                        <div className="bg-[#163247] p-5 rounded-2xl rounded-tl-none border border-[#060e20]/30 shadow-[0_20px_40px_rgba(0,0,0,0.75)]">
                                            <p className="text-on-surface leading-relaxed font-medium">{msg.content}</p>
                                            {msg.followUp && <p className="mt-4 text-on-surface leading-relaxed">{msg.followUp}</p>}
                                        </div>
                                    )}
                                    {msg.type === 'user' && (
                                        <div className="bg-[#1f3a5a] p-5 rounded-2xl rounded-tr-none border border-[#060e20]/30 shadow-[0_20px_40px_rgba(0,0,0,0.75)]">
                                            <p className="text-on-surface leading-relaxed">{msg.content}</p>
                                        </div>
                                    )}
                                    {msg.type === 'agent' && msg.followUp && (
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-bold rounded-lg border border-secondary/20"
                                                onClick={copyContext}
                                            >
                                                Copiar contexto
                                            </button>
                                            <button className="px-4 py-2 bg-surface-variant hover:bg-surface-container-highest text-slate-300 text-sm font-medium rounded-lg"
                                                onClick={sendMoreDetais}
                                            >
                                                Detalhe melhor
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                        <div className="p-6 bg-surface-container-low/80 backdrop-blur-md sticky bottom-0">
                        <div className="max-w-4xl mx-auto relative flex items-center">
                            <div className="absolute left-4 text-slate-400">📎</div>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-16 text-black placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:outline-none transition-all shadow-inner"
                                placeholder="Tire suas dúvidas ou peça mais detalhes sobre a solução..."
                            />
                            <button onClick={handleSendMessage} className="absolute right-2 p-3 bg-primary rounded-lg text-on-primary hover:bg-primary-dim transition-colors shadow-lg">
                                ✈️
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-slate-500 mt-3 font-medium uppercase tracking-[0.2em]">
                            Desenvolvido por GroupFromTheSouth
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}   