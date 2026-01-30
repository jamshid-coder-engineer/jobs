import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, PlusCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg transition-transform group-hover:scale-110">
            <BriefcaseBusiness size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            IshTop<span className="text-blue-600">.uz</span>
          </span>
        </Link>

        {/* O'ng tomon */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 mr-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Vakansiyalar</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          </nav>

          {/* Vakansiya qo'shish - To'g'ridan to'g'ri o'tadi */}
          <Link to="/add-job">
            <Button 
              variant="outline" 
              className="hidden md:flex border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> 
              Vakansiya qo'shish
            </Button>
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {/* Kirish tugmasi */}
          <Link to="/auth">
            <Button 
              variant="outline" 
              className="rounded-xl border-slate-200 text-slate-600 hover:text-blue-600 px-6 transition-all active:scale-95"
            >
              Kirish
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;