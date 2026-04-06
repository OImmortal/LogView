<<<<<<< Updated upstream
import Header from "../components/header";
import ContextForm from "../components/context-form";
=======
import Header from "../../components/header";
import ContextForm from "../../components/context-form";
>>>>>>> Stashed changes

function Main() {
  return (
    
    <div className="min-h-screen flex flex-col items-center bg-[#060e20] text-white">
      <main className="flex-1 p-5 justify-center">
        <Header />
        <ContextForm />
      </main>
      
    </div>
  );
}

export default Main;