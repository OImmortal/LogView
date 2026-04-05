// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCircleQuestion } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

function Header() {
  return (
    <header className="flex flex-row justify-between p-3 bg-[#0F172A] border-b-2 border-[#1B2638]">
      <div className="flex-row flex">
        <h1 className="text-[#E0E7FF] font-semibold px-4">
          CNPJ: 60.296.214/0001-1
        </h1>
        <button className="text-[#A3A6FF] font-medium">DashBoard</button>
      </div>

      <div className="flex-row flex">
        <div className="px-8">
          <select className="bg-[#141F38] text-[#CCD3EE] font-extralight text-center rounded-lg">
            <option>Últimas 24h</option>
            <option>Última semana</option>
            <option>Último mês</option>
          </select>
        </div>

        <div className="flex flex-row px-2 gap-6 text-[#7F8DA3] uppercase font-medium">
          <div className="flex items-center gap-2 ">
            <input
              type="checkbox"
              className="
                appearance-none 
                w-4 h-4  
                rounded 
                bg-white 
                checked:bg-red-500 relative
                checked:after:content-['✔']
                checked:after:text-white
                checked:after:absolute
                checked:after:top-1/2
                checked:after:left-1/2
                checked:after:-translate-x-1/2
                checked:after:-translate-y-1/2
                checked:after:text-xs"
            />
            <label>Crítico</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="
                appearance-none 
                w-4 h-4  
                rounded 
                bg-white 
                checked:bg-amber-400 relative
                checked:after:content-['✔']
                checked:after:text-white
                checked:after:absolute
                checked:after:top-1/2
                checked:after:left-1/2
                checked:after:-translate-x-1/2
                checked:after:-translate-y-1/2
                checked:after:text-xs"
            />
            <label>Alerta</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="
                appearance-none 
                w-4 h-4  
                rounded 
                bg-white 
                checked:bg-slate-500 relative
                checked:after:content-['✔']
                checked:after:text-white
                checked:after:absolute
                checked:after:top-1/2
                checked:after:left-1/2
                checked:after:-translate-x-1/2
                checked:after:-translate-y-1/2
                checked:after:text-xs"
            />
            <label>Info</label>
          </div>
          <div className="border-l border-gray-600 h-6"></div>
          <div className="flex flex-row">
            <button
              onClick={() => console.log("Ajuda")}
              className="pr-3 bg-transparent border-none p-0 cursor-pointer hover:opacity-70"
            >
              <FaCircleQuestion className="size-6" />
            </button>

            <button
              onClick={() => console.log("Logout")}
              className="pr-3 bg-transparent border-none p-0 cursor-pointer hover:opacity-70"
            >
              <LuLogOut className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
