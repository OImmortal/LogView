import { useState } from "react";
import { IMaskInput } from "react-imask";

export default function ContextForm() {
    const [criticidade, setCriticidade] = useState("Alto");
    const [cnpj, setCnpj] = useState("");
    const [stack, setStack] = useState([]); //SE NÃO O MAP EXPLODE

    // DEMONIO QUE ADICIONA TECNOLOGIA NA STACK E REMOVE QUANDO CLICA NO X
    const adicionarTecnologia = (e) => {
        const valor = e.target.value;
        if (valor && !stack.includes(valor)) {
            setStack([...stack, valor]);
        }
        e.target.value = ""; 
    };

    const removerTecnologia = (tec) => {
        setStack(stack.filter(x => x !== tec));
    };

    return (
        <div className="min-h-screen text-white p-10">
            <div className="max-w-6xl mx-auto space-y-10 bg-[#111b32] rounded-lg p-10">

                {/* GRID PRA SEPARAR CNPJ E SEGMENTO */}
                <div className="grid grid-cols-2 gap-10">

                    <div>
                        <label className="text-2xl text-slate-500 font-bold block mb-2">CNPJ DA EMPRESA</label>

                        <IMaskInput
                            mask="00.000.000/0000-00"
                            value={cnpj}
                            placeholder="00.000.000/0000-00"
                            onAccept={(value) => setCnpj(value)}
                            className="w-full p-4 bg-[#141f38] rounded-lg border border-transparent focus:border-indigo-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="text-2xl text-slate-500 font-bold block mb-2">SEGMENTO</label>
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

                {/*CRIA A STACK DE TECNOLOGIAS */}
                <div>

                    <label className="text-2x1 text-slate-500 font-bold block mb-2">STACK TECNOLOGIAS</label>

                    <div className="p-5 bg-[#141f38] rounded-lg border border-slate-800">
                        
                        {/* ADICIONAR STACK DE TECNOLOGIAS MAP CONSTROI TODAS AS QUE ESTÃO NA STACK  CLICA NO X PRA TIRAR NA STACK NEGOCIO CHATO*/}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {stack.map((tecnologia) => (
                            <span key={tecnologia} className="flex items-center gap-2 rounded text-sm font-bold text-indigo-300 border border-indigo-500">
                                {tecnologia}
                                <button onClick={() => removerTecnologia(tecnologia)} className="font-bold hover:text-white">X</button>
                            </span>
                            ))}
                        </div>

                        {/* SELECT PRA PEGAR A TECNOLOGIA */}
                        <select 
                            onChange={adicionarTecnologia}
                            className="w-full p-5 bg-[#0b1120] rounded-lg border border-slate-700 outline-none cursor-pointer hover:border-indigo-500"
                        >
                            <option value="">+ Selecionar nova tecnologia</option>
                            <option value="Docker">Docker</option>
                            <option value="React">React</option>
                            <option value="Node.js">Node.js</option>
                            <option value="Python">Python</option>
                        </select>
                    </div>
                </div>

                {/* MARCAR NIVEL CE CRITICIDADE SEPARADO POR GRID / VAI CRIANDO CADA BOTÃO COM SEU NIVEL E index*/}
                <div>
                    <label className="text-2X1 text-slate-500 font-bold block mb-5">NÍVEL DE CRITICIDADE</label>

                    <div className="grid grid-cols-4 gap-5">
                        {["Baixo", "Médio", "Alto", "Crítico"].map((nivel, index) => (
                            <button key={nivel} onClick={() => setCriticidade(nivel)}
                                /*PQUE TEM QUE TER " ` " NA TAG ? QUE LOUCURA*/ 
                                className={`p-5 rounded border text-left ${criticidade === nivel ? "border-orange-400 text-orange-400" : "hover:bg-slate-800"}`}>

                                <span className="block font-bold mb-1 ">Nível 0{index + 1}</span>
                                <span className="text-lg font-bold">{nivel}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* REGRA DE NEGÓCIO ISSO AQUI ACHEI LEGAL*/}
                <div className="p-5 border border-indigo-500 rounded">

                   <h4 className="text-2x1 font-bold mb-1">Política RN-04/A2</h4>
                   <p className="text-sm text-slate-400">As alterações nas configurações de contexto não são retroativas. 
                        Estes parâmetros serão aplicados exclusivamente aos lotes de log ingeridos após a data e hora de salvamento.
                    </p>

                </div>

                {/*E OS BOTÃO*/}
                <div className="flex justify-between items-center pt-6">
                    
                    <button className="px-10 py-3 rounded-lg text-slate-500 bg-slate-800 font-bold border border-slate-600 hover:text-red-500">
                        Descartar</button>

                    <button className="bg-indigo-500 hover:bg-indigo-600 px-10 py-3 rounded-lg font-bold">
                        Salvar Configuração
                    </button>

                </div>

            </div>
        </div>
    );
}