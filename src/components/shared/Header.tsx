import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, PlusCircle, LogOut } from "lucide-react";

const Header = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
   <header className="border-b bg-white/80 backdrop-blur-md sticky top-2  z-50">
  <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <Link to="/" className="flex items-center group transition-all">
      {/* Logotip konteyneri */}
      <div className="flex items-center bg-cyan-950 border border-slate-100 px-3 py-1.5 rounded-2xl shadow-lg shadow-blue-900/30 transition-all group-hover:scale-105 duration-300">
  
        {/* Ikonka bloki */}
        <div className="bg-blue-600 text-white p-1.5 rounded-xl mr-3 shadow-lg">
          <BriefcaseBusiness size={20} />
        </div>
        
        {/* Matnli qism */}
        <div className="flex items-baseline pr-1">
          <span className="text-white text-3xl italic leading-none font-black ">H</span>
          <span className="text-white text-3xl italic leading-none -ml-0.0 font-black ">
            H<span className="text-teal-500 italic font-bold text-2xl">.uz</span>
          </span>
        </div>
        
      </div>
    </Link>


        <div className="flex items-center gap-3">
          <Link to="/add-job">
            <Button variant="outline" className="hidden md:flex border-blue-200 text-blue-600 rounded-xl">
              <PlusCircle className="mr-2 h-4 w-4" /> Vakansiya qo'shish
            </Button>
          </Link>
          <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium">
            Dashboard
          </Link>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {isLoggedIn ? (
            <Button variant="ghost" onClick={() => dispatch(logout())} className="text-red-500 rounded-xl">
              <LogOut className="mr-2 h-4 w-4" /> Chiqish
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="rounded-xl px-6">Kirish</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;