// import { Link } from "react-router-dom";
// import { Button } from "../ui/button";
// import { BriefcaseBusiness, PlusCircle, LayoutDashboard } from "lucide-react";

// const Navbar = () => {
//   return (
//     <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* 1. Logo qismi */}
//         <Link to="/" className="flex items-center gap-2">
//           <BriefcaseBusiness className="text-blue-600" size={28} />
//           <span className="text-xl font-bold tracking-tight text-slate-900">
//             IshTop.uz
//           </span>
//         </Link>

//         {/* 2. O'ng tomon: Tugmalar */}
//         <div className="flex items-center gap-3">
//           <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
//             Vakansiyalar
//           </Link>
          
//           {/* Dashboard tugmasi - Statistika ko'rish uchun 📊 */}
//           <Link to="/employer/dashboard">
//             <Button variant="ghost" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
//               <LayoutDashboard className="mr-2 h-4 w-4" />
//               Dashboard
//             </Button>
//           </Link>

//           {/* Vakansiya q
//           o'shish tugmasi */}
//           <Link to="/jobs/new">
//             <Button className="bg-blue-600 hover:bg-blue-700">
//               <PlusCircle className="mr-2 h-4 w-4" />
//               Vakansiya qo'shish
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;