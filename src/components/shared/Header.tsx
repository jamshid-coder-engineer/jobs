import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logotip qismi */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          JobHunter
        </Link>

        {/* Navigatsiya va Kirish */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Vakansiyalar
          </Link>
          <Link to="/login">
            <Button variant="outline">Kirish</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;