import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store"; // Turlangan hooklar
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
  CheckCircle2 
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Redux-dan ma'lumotlarni olish
  const job = useAppSelector((state) => 
    state.jobs.items.find((item) => item.id === id)
  );
  const applications = useAppSelector((state) => state.applications.items);

  // Foydalanuvchi ushbu vakansiyaga topshirganini tekshirish
  const hasApplied = applications.some((app) => app.jobId === id);

  const [appData, setAppData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeBase64: ""
  });

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
    setIsOpen(false);
    toast.success("Arizangiz muvaffaqiyatli yuborildi! 📄");
    setAppData({ fullName: "", email: "", phone: "", resumeBase64: "" });
  };

  if (!job) {
    return (
      <div className="flex flex-col items-center py-20">
        <h2 className="text-2xl font-semibold text-slate-600">Vakansiya topilmadi 😕</h2>
        <Button onClick={() => navigate("/")} className="mt-4">Bosh sahifaga qaytish</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-slate-100">
        <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
      </Button>

      <div className="bg-white p-8 rounded-2xl border shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm">
                <Building2 size={16}/> {job.company}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm">
                <MapPin size={16}/> {job.location}
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            {job.salary}
          </div>
        </div>

        <hr className="mb-8" />

        <div className="space-y-8 mb-10">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Vazifalar 📋
            </h3>
            <ul className="grid grid-cols-1 gap-3 pl-2">
              {job.responsibilities.map((res, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <span className="mt-2 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                  {res}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Talablar ✅
            </h3>
            <ul className="grid grid-cols-1 gap-3 pl-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <span className="mt-2 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* --- ARIZA TOPSHIRISH QISMI --- */}
        <div className="pt-6 border-t">
          {hasApplied ? (
            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-200">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Siz ariza yuborgansiz!</h4>
                <p className="text-blue-700 text-sm">Ushbu vakansiya uchun arizangiz qabul qilingan. Tez orada ko'rib chiqiladi.</p>
              </div>
            </div>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto px-12 h-12 bg-blue-600 hover:bg-blue-700 text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-100">
                  Hozir ariza topshirish 🚀
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Ariza shakli</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleApply} className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">To'liq ismingiz</Label>
                    <Input 
                      id="fullName" 
                      placeholder="Masalan: Ali Valiyev"
                      required 
                      value={appData.fullName} 
                      onChange={e => setAppData({...appData, fullName: e.target.value})} 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="example@mail.com"
                        required 
                        value={appData.email} 
                        onChange={e => setAppData({...appData, email: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon raqami</Label>
                      <Input 
                        id="phone" 
                        placeholder="+998 90 123 45 67"
                        required 
                        value={appData.phone} 
                        onChange={e => setAppData({...appData, phone: e.target.value})} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Rezyume yuklash (PDF, DOCX)</Label>
                    <div className="relative group cursor-pointer">
                      <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange}
                        className="cursor-pointer h-24 border-dashed border-2 hover:border-blue-400 hover:bg-blue-50 transition-all text-center pt-8"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 group-hover:text-blue-500">
                        <Upload size={24} className="mb-1" />
                        <span className="text-xs">Faylni tanlang yoki shu yerga tashlang</span>
                      </div>
                    </div>
                    {appData.resumeBase64 && (
                      <div className="text-xs text-green-600 font-medium flex items-center gap-1.5 mt-2 bg-green-50 p-2 rounded-lg border border-green-100">
                        <FileText size={16} /> Rezyume muvaffaqiyatli yuklandi!
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg rounded-xl mt-4">
                    Arizani yuborish
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