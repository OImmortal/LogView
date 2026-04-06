export default function Header() {
  return (
    <div className="mb-12 mr-10 rounded">
      <span className="p-1 border border-yellow-500/20 rounded-lg text-xs 
                      text-yellow-400 bg-yellow-500/40 inline">
        Configuração
      </span>

      <h2 className="text-5xl font-bold mt-2">
        Gerenciar Contexto
      </h2>

      <p className="text-gray-400 mt-4 max-w-3xl">
        Defina os parâmetros operacionais para seu ambiente de análise. 
        Estas configurações fornecem a camada semântica necessária para diagnósticos de log de alta 
        precisão. 
      </p>
    </div>
  );
}