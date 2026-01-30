import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { BriefcaseBusiness, PlusCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. Logo qismi */}
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="text-blue-600" size={28} />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            IshTop.uz
          </span>
        </Link>

        {/* 2. O'ng tomon: Tugmalar */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Vakansiyalar
          </Link>
          
          {/* Ish beruvchilar uchun maxsus tugma */}
          <Link to="/jobs/new">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ish beruvchilar uchun
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;