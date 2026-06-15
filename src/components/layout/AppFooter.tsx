import React from "react";

export default function AppFooter() {
  return (
    <footer className="w-full py-12 px-8 bg-slate-900 mt-20 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-indigo-100 font-headline uppercase">
            LogView
          </span>
          <p className="text-slate-500 text-sm">
            © 2024 LogViewer Systems Inc. Engenharia de Precisão para Infraestrutura.
          </p>
        </div>
        <div className="flex gap-8 font-['Plus_Jakarta_Sans'] text-sm tracking-wide">
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Política de Privacidade
          </a>
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Termos de Serviço
          </a>
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Segurança
          </a>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">terminal</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
