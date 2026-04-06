import React from 'react';
import { UserPlus, Search, Edit2, AlertCircle, Send } from 'lucide-react';

function UserManagement () {
  // Dados simulados baseados na imagem
  const users = [
    {
      id: 1,
      email: 'joao.silva@techlog.io',
      level: 'ADMIN',
      status: 'ATIVO',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: 2,
      email: 'maria.fernanda@devops.com',
      level: 'DEV',
      status: 'PENDENTE',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 3,
      email: 'junior.dev@cloudstack.com.br',
      level: 'DEV',
      status: 'ATIVO',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f141e] text-gray-200 p-8 font-sans">
      
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Gerir Usuários</h1>
        <p className="text-sm text-gray-400 mt-1">Gestor do CNPJ: 12.345.678/0001-99</p>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        
        {/* COLUNA ESQUERDA */}
        <div className="flex flex-col gap-6">
          
          {/* Card: Convidar Novo Usuário */}
          <div className="bg-[#1b2130] rounded-xl p-6 border border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#2c344a] p-2 rounded-lg">
                <UserPlus size={20} className="text-[#8da4f7]" />
              </div>
              <h2 className="text-lg font-semibold text-white">Convidar Novo Usuário</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider mb-2">
                  E-MAIL DO USUÁRIO
                </label>
                <input
                  type="email"
                  placeholder="dev@empresa.com.br"
                  className="w-full bg-[#121622] border border-gray-700/50 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#5c6aff] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 tracking-wider mb-2 mt-4">
                  NÍVEL DE ACESSO
                </label>
                <div className="relative">
                  <select className="w-full bg-[#121622] border border-gray-700/50 rounded-lg px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#5c6aff] transition-colors">
                    <option>Developer</option>
                    <option>Admin</option>
                    <option>Viewer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#5c6aff] hover:bg-[#4d59db] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Enviar Convite
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Card: Uso da Conta */}
          <div className="bg-[#1b2130] rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden">
            <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-2">USO DA CONTA</h3>
            <div className="mb-4">
              <p className="text-xl font-medium text-white mb-1">Limite do Plano:</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-white">8/10</span>
                <span className="text-sm font-semibold text-[#22c55e]">80%</span>
              </div>
            </div>
            
            {/* Barra de Progresso */}
            <div className="w-full bg-[#2c344a] rounded-full h-2.5 mb-6">
              <div className="bg-[#22c55e] h-2.5 rounded-full" style={{ width: '80%' }}></div>
            </div>

            <p className="text-xs text-gray-500 italic">
              RF-18: O limite de usuários é baseado no seu nível de assinatura Enterprise.
            </p>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="flex flex-col gap-6">
          
          {/* Card: Usuários Ativos */}
          <div className="bg-[#1b2130] rounded-xl border border-gray-800 shadow-lg flex-1">
            
            {/* Header do Card com Busca */}
            <div className="p-6 border-b border-gray-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Usuários Ativos</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Filtrar por e-mail..."
                  className="bg-[#121622] border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600 w-64"
                />
              </div>
            </div>

            {/* Tabela de Usuários */}
            <div className="p-6">
              {/* Cabeçalho da Tabela */}
              <div className="grid grid-cols-[60px_1fr_100px_120px_50px] items-center text-xs font-semibold text-gray-500 tracking-wider mb-4 px-2">
                <div>AVATAR</div>
                <div>E-MAIL</div>
                <div>NÍVEL</div>
                <div>STATUS</div>
                <div className="text-right">AÇÕES</div>
              </div>

              {/* Lista de Usuários */}
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="grid grid-cols-[60px_1fr_100px_120px_50px] items-center py-3 px-2 hover:bg-[#202738] rounded-lg transition-colors group border-b border-gray-800/30 last:border-0">
                    
                    {/* Avatar */}
                    <div>
                      <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-700 object-cover" />
                    </div>

                    {/* Email */}
                    <div className="text-sm font-medium text-gray-200">
                      {user.email}
                    </div>

                    {/* Nível (Badge) */}
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded bg-[#2c344a] tracking-wider
                        ${user.level === 'ADMIN' ? 'text-[#8da4f7]' : 'text-gray-400'}
                      `}>
                        {user.level}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      {user.status === 'ATIVO' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                          <span className="text-xs font-bold text-[#22c55e] tracking-wider">ATIVO</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#f6ad55] text-[#fff] tracking-wider shadow-[0_0_10px_rgba(246,173,85,0.3)]">
                          ● PENDENTE
                        </span>
                      )}
                    </div>

                    {/* Botão Editar */}
                    <div className="flex justify-end">
                      <button className="bg-[#2c344a] p-2 rounded text-gray-400 hover:text-white hover:bg-[#3a4460] transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banner de Erro/Limite */}
          <div className="bg-[#3b1a20] border border-red-900/50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-[#fb7185]" />
              <p className="text-sm text-[#fb7185]">
                Erro ao enviar convite - Limite atingido (O limite máximo do seu plano atual foi alcançado).
              </p>
            </div>
            <a href="#" className="text-xs font-bold text-white uppercase tracking-wider underline hover:text-gray-300 transition-colors whitespace-nowrap ml-4">
              FAZER UPGRADE
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserManagement;