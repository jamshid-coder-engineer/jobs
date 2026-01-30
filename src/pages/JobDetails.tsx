import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// useAppSelector va useAppDispatch hooklarini store-dan olamiz
import { useAppSelector, useAppDispatch, RootState } from "../store"; 
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
  Building2, MapPin, ArrowLeft, FileText, Upload, CheckCircle2, Lock 
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // --- REDUX SELECTORS ---
  // state: RootState yozish orqali "implicitly any" xatosini butunlay yo'qotamiz
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  
  const job = useAppSelector((state: RootState) => 
    state.jobs.items.find((item) => item.id === id)
  );

  const applications = useAppSelector((state: RootState) => state.applications.items);
  const hasApplied = applications.some((app) => app.jobId === id);

  // --- LOCAL STATE ---
  const [appData, setAppData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeBase64: ""
  });

  // Ma'lumotlarni localStorage-dan tiklash mantiqi
  useEffect(() => {
    const savedApp = localStorage.getItem(`pending_app_${id}`);
    if (savedApp) {
      setAppData(JSON.parse(savedApp));
      setIsOpen(true);
      toast.info("Saqlangan ma'lumotlar tiklandi");
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      localStorage.setItem(`pending_app_${id}`, JSON.stringify(appData));
      toast.warning("Ariza yuborish uchun avval tizimga kiring!");
      navigate("/auth");
      return;
    }

    if (!appData.resumeBase64) {
      toast.error("Iltimos, rezyumeni yuklang");
      return;
    }
    
    dispatch(addApplication({
      id: crypto.randomUUID(),
      jobId: id || "",
      ...appData,
      appliedAt: new Date().toISOString(),
    }));

    localStorage.removeItem(`pending_app_${id}`);
    setIsOpen(false);
    toast.success("Arizangiz muvaffaqiyatli yuborildi! 🚀");
  };

  if (!job) return <div className="p-10 text-center font-bold">Vakansiya topilmadi...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-500">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-slate-100 rounded-xl">
        <ArrowLeft className="mr-2" size={16} /> Orqaga
      </Button>

      <div className="bg-white border rounded-[32px] p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">{job.title}</h1>
            <div className="flex gap-4 text-slate-500 font-medium">
              <span className="flex items-center gap-1"><Building2 size={16}/> {job.company}</span>
              <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
            </div>
          </div>
          <div className="text-xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
            {job.salary}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3">Vazifalar:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t">
          {hasApplied ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 border border-green-100">
              <CheckCircle2 className="text-green-600" />
              <span className="font-bold">Siz ushbu vakansiyaga ariza topshirgansiz.</span>
            </div>
          ) : (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto px-10 h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-bold shadow-lg shadow-blue-100">
                  {isLoggedIn ? "Ariza topshirish 🚀" : "Kirish va topshirish 🔒"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] rounded-[24px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Ariza shakli</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleApply} className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <Label>F.I.SH</Label>
                    <Input required value={appData.fullName} onChange={e => setAppData({...appData, fullName: e.target.value})} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input required type="email" value={appData.email} onChange={e => setAppData({...appData, email: e.target.value})} className="rounded-xl h-11" />
                  </div>
                  <div className="space-y-1">
                    <Label>Rezyume (PDF)</Label>
                    <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-slate-50 relative">
                      <Input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <Upload className="mx-auto text-slate-400 mb-1" size={20} />
                      <span className="text-xs text-slate-500">{appData.resumeBase64 ? "Fayl yuklandi ✅" : "Faylni tanlang"}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-blue-600 rounded-xl font-bold">
                    {isLoggedIn ? "Yuborish" : "Kirish va yuborish 🔒"}
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