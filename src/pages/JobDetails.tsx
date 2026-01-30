import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store"; 
import { addApplication } from "@/store/slices/applicationsSlice";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Building2, 
  MapPin, 
  ArrowLeft, 
  FileText, 
  Upload, 
  CheckCircle2,
  Lock
} from "lucide-react";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Simulyatsiya: Login holati
  const isLoggedIn = false; 

  const job = useAppSelector((state) => 
    state.jobs.items.find((item) => item.id === id)
  );
  const applications = useAppSelector((state) => state.applications.items);
  const hasApplied = applications.some((app) => app.jobId === id);

  const [appData, setAppData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeBase64: ""
  });

  // --- MA'LUMOTLARNI TIKLASH ---
  useEffect(() => {
    const savedApp = localStorage.getItem(`pending_app_${id}`);
    if (savedApp) {
      setAppData(JSON.parse(savedApp));
      // Agar saqlangan ma'lumot bo'lsa, avtomatik modalni ochib berish ham mumkin
      setIsOpen(true); 
      toast.info("To'ldirilgan ma'lumotlaringiz tiklandi");
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Fayl hajmi 5MB dan oshmasligi kerak");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAppData({ ...appData, resumeBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // Ma'lumotlarni saqlaymiz
      localStorage.setItem(`pending_app_${id}`, JSON.stringify(appData));
      toast.warning("Ariza yuborish uchun avval tizimga kiring. Ma'lumotlar saqlandi!");
      navigate("/auth");
      return;
    }

    if (!appData.resumeBase64) {
      toast.error("Iltimos, rezyume faylini yuklang");
      return;
    }

    const newApplication = {
      id: crypto.randomUUID(),
      jobId: id!,
      ...appData,
      appliedAt: new Date().toISOString(),
    };

    dispatch(addApplication(newApplication));
    localStorage.removeItem(`pending_app_${id}`); // O'chirib tashlaymiz
    setIsOpen(false);
    toast.success("Arizangiz muvaffaqiyatli yuborildi! 📄");
  };

  if (!job) return <div className="text-center py-20">Vakansiya topilmadi</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 font-sans">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
      </Button>

      <div className="bg-white p-8 rounded-3xl border shadow-sm mb-8">
        {/* Vakansiya sarlavhasi qismi */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
            <div className="flex gap-4 text-slate-500">
              <span className="flex items-center gap-1.5"><Building2 size={18}/> {job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin size={18}/> {job.location}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 bg-blue-50 px-5 py-2 rounded-2xl">
            {job.salary}
          </div>
        </div>

        <hr className="mb-8 opacity-50" />

        {/* Vazifa va Talablar */}
        <div className="space-y-8 mb-10 text-slate-700">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span> Vazifalar
            </h3>
            <ul className="space-y-3 pl-2">
              {job.responsibilities.map((res, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" /> {res}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ARIZA TOPSHIRISH TUGMASI VA LOGIKA */}
        <div className="pt-6 border-t">
          {hasApplied ? (
            <div className="bg-green-50 border border-green-200 p-5 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="text-green-600" size={28} />
              <div>
                <h4 className="font-bold text-green-900">Ariza yuborilgan!</h4>
                <p className="text-green-700 text-sm">Tez orada siz bilan bog'lanishadi.</p>
              </div>
            </div>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto px-12 h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-2xl shadow-xl shadow-blue-100">
                  {isLoggedIn ? "Hozir ariza topshirish 🚀" : "Kirish va topshirish 🔒"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-[32px] p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Ariza shakli</DialogTitle>
                  {!isLoggedIn && (
                    <div className="bg-amber-50 text-amber-700 p-3 rounded-xl text-xs flex items-center gap-2 mt-2 border border-amber-100">
                      <Lock size={14} /> Tizimga kirmasdan to'ldirishingiz mumkin, yuborishda kirish so'raladi.
                    </div>
                  )}
                </DialogHeader>
                
                <form onSubmit={handleApply} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label className="font-semibold">To'liq ismingiz</Label>
                    <Input 
                      required 
                      className="h-12 rounded-xl"
                      value={appData.fullName} 
                      onChange={e => setAppData({...appData, fullName: e.target.value})} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-semibold">Email</Label>
                      <Input 
                        required 
                        type="email" 
                        className="h-12 rounded-xl"
                        value={appData.email} 
                        onChange={e => setAppData({...appData, email: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-semibold">Telefon</Label>
                      <Input 
                        required 
                        className="h-12 rounded-xl"
                        value={appData.phone} 
                        onChange={e => setAppData({...appData, phone: e.target.value})} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-semibold">Rezyume (PDF)</Label>
                    <div className="relative border-2 border-dashed border-slate-200 rounded-2xl h-24 flex flex-col items-center justify-center hover:bg-slate-50 transition-all group">
                      <Input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload size={24} className="text-slate-400 group-hover:text-blue-500" />
                      <span className="text-xs text-slate-400">Faylni tanlang</span>
                    </div>
                    {appData.resumeBase64 && (
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded-lg border border-green-100 flex items-center gap-2">
                        <FileText size={14} /> Rezyume yuklandi!
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 h-14 rounded-2xl text-lg font-bold shadow-lg shadow-blue-100">
                    {isLoggedIn ? "Arizani yuborish" : "Kirish va yuborish 🔒"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;