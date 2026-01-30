import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch, RootState } from "../store";
import { fetchJobs } from "@/store/slices/jobsSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, MapPin, ArrowLeft, Send, X, CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux state
  const { items, status } = useAppSelector((state: RootState) => state.jobs);
  
  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false); // Ariza topshirilganini tekshirish

  const job = items.find((item: any) => String(item.id) === String(id));

  // 1. Ishlar ro'yxatini yuklash (agar bo'sh bo'lsa)
  useEffect(() => {
    if (items.length === 0 && status === "idle") {
      dispatch(fetchJobs());
    }
  }, [items.length, status, dispatch]);

  // 2. Foydalanuvchi bu ishga ariza topshirganini tekshirish
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/applications");
        // Hozirgi foydalanuvchi (fake bo'lsa ham) aynan shu jobId ga ariza yuborganmi?
        const found = res.data.some((app: any) => String(app.jobId) === String(id));
        setHasApplied(found);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    if (id) checkStatus();
  }, [id]);

  // Ariza yuborish funksiyasi
  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const applicationData = {
      id: crypto.randomUUID(),
      jobId: id,
      jobTitle: job?.title,
      company: job?.company,
      candidateName: formData.get("fullname"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/applications", applicationData);
      toast.success("Arizangiz muvaffaqiyatli yuborildi! 🚀");
      setHasApplied(true); // Tugmani darhol bloklaymiz
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Xatolik: Serverga ulanib bo'lmadi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") return <div className="p-20 text-center font-bold text-slate-500">Yuklanmoqda...</div>;
  if (!job) return <div className="p-20 text-center">Vakansiya topilmadi.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-500">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 group">
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} /> Orqaga
      </Button>

      <div className="bg-white border rounded-[32px] p-8 shadow-sm relative">
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div className="space-y-3">
            <Badge className="bg-blue-50 text-blue-600 border-none px-3 py-1">{job.type || "Full-time"}</Badge>
            <h1 className="text-4xl font-black text-slate-900">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-slate-500">
              <span className="flex items-center gap-1.5"><Building2 size={18} /> {job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin size={18} /> {job.location}</span>
            </div>
          </div>
          <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 min-w-[150px] text-center">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Maosh</p>
            <p className="text-2xl font-black text-green-700">{job.salary}</p>
          </div>
        </div>

        {/* Content qismi */}
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><div className="w-1.5 h-6 bg-blue-600 rounded-full"></div> Vazifalar</h3>
            <ul className="space-y-3">
              {job.responsibilities?.map((res: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" /> {res}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><div className="w-1.5 h-6 bg-orange-500 rounded-full"></div> Talablar</h3>
            <ul className="space-y-3">
              {job.requirements?.map((req: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-2 w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" /> {req}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* --- DYNAMIC BUTTON --- */}
        <div className="mt-12 pt-8 border-t flex justify-center">
          <Button 
            disabled={hasApplied || isSubmitting}
            onClick={() => setIsModalOpen(true)}
            className={`w-full md:w-2/3 h-14 rounded-2xl text-lg font-bold shadow-lg transition-all 
              ${hasApplied 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95 shadow-blue-100"
              }`}
          >
            {hasApplied ? (
              <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-green-500" /> Ariza topshirilgan</span>
            ) : (
              "Ariza topshirish"
            )}
          </Button>
        </div>
      </div>

      {/* --- MODAL OYNASI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <Button 
              variant="ghost" 
              className="absolute right-4 top-4 rounded-full w-10 h-10 p-0" 
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </Button>
            
            <h2 className="text-2xl font-bold mb-2">Ariza topshirish</h2>
            <p className="text-slate-500 text-sm mb-6">{job.title}</p>

            <form onSubmit={handleApply} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullname">To'liq ismingiz</Label>
                <Input id="fullname" name="fullname" required placeholder="Ali Valiyev" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqamingiz</Label>
                <Input id="phone" name="phone" required placeholder="+998 90 123 45 67" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Qisqacha xabar</Label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  rows={3} 
                ></textarea>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white"
              >
                {isSubmitting ? "Yuborilmoqda..." : <span className="flex items-center gap-2">Yuborish <Send size={16}/></span>}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;