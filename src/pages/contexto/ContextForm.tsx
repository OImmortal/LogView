import { useState } from "react";
import { IMaskInput } from "react-imask";

export default function ContextForm() {
  const [criticidade, setCriticidade] = useState("Alto");
  const [cnpj, setCnpj] = useState("");
  const [stack, setStack] = useState<string[]>([]);

  const adicionarTecnologia = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    if (valor && !stack.includes(valor)) {
      setStack([...stack, valor]);
    }
    e.target.value = "";
  };

  const removerTecnologia = (tec: string) => {
    setStack(stack.filter((x) => x !== tec));
  };

  return (
    <div className="text-white">
      <div className="space-y-10 bg-surface-container-low rounded-xl p-10 border border-outline-variant/30">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="text-2xl text-slate-500 font-bold block mb-2">
              CNPJ DA EMPRESA
            </label>
            <IMaskInput
              mask="00.000.000/0000-00"
              value={cnpj}
              placeholder="00.000.000/0000-00"
              onAccept={(value: string) => setCnpj(value)}
              className="w-full p-4 bg-[#141f38] rounded-lg border border-transparent focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="text-2xl text-slate-500 font-bold block mb-2">
              SEGMENTO
            </label>
            <select className="w-full p-4 bg-[#141f38] rounded-lg outline-none border border-transparent focus:border-indigo-500">
              <option>Serviços Financeiros & Fintech</option>
              <option>Saúde & Healthtech</option>
              <option>Educação & Edtech</option>
              <option>Tecnologia & Software (SaaS)</option>
              <option>Governo & Setor Público</option>
              <option>Indústria 4.0</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-2x1 text-slate-500 font-bold block mb-2">
            STACK TECNOLOGIAS
          </label>
          <div className="p-5 bg-[#141f38] rounded-lg border border-slate-800">
            <div className="flex flex-wrap gap-2 mb-4">
              {stack.map((tecnologia) => (
                <span
                  key={tecnologia}
                  className="flex items-center gap-2 rounded text-sm font-bold text-indigo-300 border border-indigo-500 px-2 py-1"
                >
                  {tecnologia}
                  <button
                    type="button"
                    onClick={() => removerTecnologia(tecnologia)}
                    className="font-bold hover:text-white"
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <select
              onChange={adicionarTecnologia}
              className="w-full p-5 bg-[#0b1120] rounded-lg border border-slate-700 outline-none cursor-pointer hover:border-indigo-500"
              defaultValue=""
            >
              <option value="">+ Selecionar nova tecnologia</option>
              <option value="Docker">Docker</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-2x1 text-slate-500 font-bold block mb-2">
            DEFINIÇÃO DETALHADA DO CONTEXTO
          </label>
          <div className="p-2 bg-[#141f38] rounded-lg border border-slate-800 mb-2">
            <textarea
              className="w-full p-2 bg-[#141f38] rounded-lg outline-none resize-none overflow-hidden"
              placeholder="Forneça detalhes adicionais sobre o propósito deste contexto..."
              maxLength={1500}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
          <label className="text-sm text-slate-500 block mb-2">
            <i>
              Este texto ajuda a IA a entender melhor o propósito das regras de
              análise definidas para este ambiente.
            </i>
          </label>
        </div>

        <div>
          <label className="text-2X1 text-slate-500 font-bold block mb-5">
            NÍVEL DE CRITICIDADE
          </label>
          <div className="grid grid-cols-4 gap-5">
            {["Baixo", "Médio", "Alto", "Crítico"].map((nivel, index) => (
              <button
                key={nivel}
                type="button"
                onClick={() => setCriticidade(nivel)}
                className={`p-5 rounded border text-left ${criticidade === nivel ? "border-orange-400 text-orange-400" : "hover:bg-slate-800"}`}
              >
                <span className="block font-bold mb-1">Nível 0{index + 1}</span>
                <span className="text-lg font-bold">{nivel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 border border-indigo-500 rounded">
          <h4 className="text-2x1 font-bold mb-1">Política RN-04/A2</h4>
          <p className="text-sm text-slate-400">
            As alterações nas configurações de contexto não são retroativas.
            Estes parâmetros serão aplicados exclusivamente aos lotes de log
            ingeridos após a data e hora de salvamento.
          </p>
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            type="button"
            className="px-10 py-3 rounded-lg text-slate-500 bg-slate-800 font-bold border border-slate-600 hover:text-red-500"
          >
            Descartar
          </button>
          <button
            type="button"
            className="bg-indigo-500 hover:bg-indigo-600 px-10 py-3 rounded-lg font-bold"
          >
            Salvar Configuração
          </button>
        </div>
      </div>
    </div>
  );
}
