import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AuthModal = () => {
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Muvaffaqiyatli kirdingiz! 🎉");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Headerda ko'rinadigan tugma */}
        <Button variant="ghost" className="text-slate-600 hover:text-blue-600">
          Kirish
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 bg-white">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            ish
          </div>
          
          <div className="space-y-2">
            <DialogTitle className="text-xl font-bold">Ro'yxatdan o'tish</DialogTitle>
            <p className="text-sm text-slate-500">Telefon raqamingizni kiriting</p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
               <span className="text-slate-500 font-medium">+998</span>
               <Input 
                 type="tel" 
                 placeholder="00 000 00 00" 
                 className="border-none focus-visible:ring-0 text-lg p-0"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 required
               />
            </div>
            <Button type="submit" className="w-full bg-blue-600 h-12 rounded-xl text-lg hover:bg-blue-700">
              Davom etish
            </Button>
          </form>

          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="outline" className="rounded-xl">Google</Button>
            <Button variant="outline" className="rounded-xl">Telegram</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;