function Main() {
  return (
    // Container principal ocupando toda a tela, com fundo cinza e centralizando o conteúdo
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      {/* O Card em si */}
      <div className="max-w-sm w-full rounded-2xl bg-white p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow duration-300">
        {/* Cabeçalho do Card com Flexbox para alinhar a imagem e o texto */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-inner">
            JS
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Desenvolvedor</h2>
            <p className="text-sm font-medium text-slate-500">
              Engenharia de Software
            </p>
          </div>
        </div>

        {/* Corpo do texto */}
        <p className="text-slate-600 leading-relaxed mb-6">
          Este é um exemplo prático de como o Tailwind permite criar interfaces
          limpas e modernas diretamente no seu JSX, sem precisar sair do
          arquivo.
        </p>

        {/* Botão de Ação */}
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-200">
          Conectar
        </button>
      </div>
    </div>
  );
}

export default Main;