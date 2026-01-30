import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) return toast.error("Raqamni to'liq kiriting");
    setStep(2);
    toast.info("Test SMS kod: 1234");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "1234") {
      dispatch(loginSuccess({ phone: "+998" + phone }));
      toast.success("Xush kelibsiz! 🎉");
      navigate(-1);
    } else {
      toast.error("Kod noto'g'ri");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-blue-600 font-medium">
        <ChevronLeft className="w-5 h-5" /> Asosiy
      </Link>
      <motion.div layout className="w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl p-10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg shadow-blue-200">IT</div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">Kirish</h1>
                  <p className="text-slate-500 text-sm">Telefon raqamingizni kiriting</p>
                </div>
              </div>
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="flex items-center gap-2 border-2 border-slate-100 rounded-2xl px-4 py-2 bg-slate-50/50">
                  <span className="text-slate-500 font-bold border-r pr-3">+998</span>
                  <Input type="tel" placeholder="00 000 00 00" className="border-none focus-visible:ring-0 text-lg bg-transparent" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 h-14 rounded-2xl text-lg font-bold">SMS kodni olish</Button>
              </form>
            </motion.div>
          ) : (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-green-100"><MessageSquare size={28} /></div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">Tasdiqlash</h1>
                  <p className="text-slate-500 text-sm">+998 {phone} ga kod yuborildi</p>
                </div>
              </div>
              <form onSubmit={handleVerify} className="space-y-5">
                <Input type="text" placeholder="0000" className="h-16 text-center text-3xl font-bold tracking-[1rem] rounded-2xl border-2" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} required />
                <Button type="submit" className="w-full bg-blue-600 h-14 rounded-2xl text-lg font-bold">Tasdiqlash</Button>
                <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-blue-600 font-semibold underline">Raqamni o'zgartirish</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
