import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Muvaffaqiyatli kirdingiz! 🎉");
    navigate("/"); // Asosiy sahifaga qaytish
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Orqaga qaytish tugmasi */}
      <Link to="/" className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-blue-600 transition-colors">
        <ChevronLeft className="w-5 h-5" /> Orqaga
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-10 space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-200">
            ish
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">Tizimga kirish</h1>
            <p className="text-slate-500">Siz bilan boglanish oson bo'lishi uchun telefon raqamingizni kiriting</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Telefon raqami</label>
            <div className="flex items-center gap-2 border-2 border-slate-100 rounded-2xl px-4 py-2 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50/50 transition-all bg-slate-50/50">
               <span className="text-slate-400 font-bold border-r pr-3">+998</span>
               <Input 
                 type="tel" 
                 placeholder="00 000 00 00" 
                 className="border-none focus-visible:ring-0 text-lg p-0 bg-transparent h-10"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 required
               />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 h-14 rounded-2xl text-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
            Davom etish
          </Button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-sm font-medium">yoki</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-medium">
            Google
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-medium">
            Telegram
          </Button>
        </div>

        <p className="text-center text-[11px] text-slate-400 leading-relaxed px-4">
          Davom etish orqali siz <span className="text-blue-500 cursor-pointer hover:underline">Foydalanish shartlari</span> va <span className="text-blue-500 cursor-pointer hover:underline">Maxfiylik siyosatiga</span> rozilik bildirasiz.
        </p>
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-sm font-medium">© 2026 IshTop.uz — Barcha huquqlar himoyalangan</p>
    </div>
  );
};

export default AuthPage;