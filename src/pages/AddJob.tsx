import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { fetchJobs } from "@/store/slices/jobsSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, Building2, MapPin, 
  DollarSign, ListChecks, Plus, ArrowLeft 
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const responsibilities = String(formData.get("responsibilities"))
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

    const requirements = String(formData.get("requirements"))
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

    const newJob = {
      id: crypto.randomUUID(),
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      salary: formData.get("salary"),
      type: formData.get("type") || "Full-time",
      responsibilities,
      requirements,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/jobs", newJob);
      
      toast.success("Vakansiya muvaffaqiyatli qo'shildi! 🎉");
      
      dispatch(fetchJobs());
      
      navigate("/");
    } catch (error) {
      toast.error("Vakansiya qo'shishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
        <ArrowLeft className="mr-2" size={18} /> Orqaga
      </Button>

      <div className="bg-white border rounded-[32px] p-8 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <Plus className="bg-blue-600 text-white rounded-xl p-1" size={32} />
          Yangi vakansiya qo'shish
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Briefcase size={16}/> Lavozim nomi</Label>
              <Input name="title" required placeholder="Masalan: Senior React Developer" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Building2 size={16}/> Kompaniya nomi</Label>
              <Input name="company" required placeholder="Masalan: IshTop AI" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><MapPin size={16}/> Joylashuv</Label>
              <Input name="location" required placeholder="Masalan: Toshkent yoki Remote" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2"><DollarSign size={16}/> Maosh (oraliq)</Label>
              <Input name="salary" required placeholder="Masalan: 1000$ - 1500$" className="rounded-xl h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ish turi (Full-time, Part-time, Project)</Label>
            <Input name="type" placeholder="Full-time" className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2"><ListChecks size={16}/> Vazifalar (vergul bilan ajrating)</Label>
            <textarea 
              name="responsibilities" 
              required
              className="w-full p-4 border rounded-2xl min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Vazifa 1, Vazifa 2, Vazifa 3..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Plus size={16}/> Talablar (vergul bilan ajrating)</Label>
            <textarea 
              name="requirements" 
              required
              className="w-full p-4 border rounded-2xl min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Talab 1, Talab 2, Talab 3..."
            ></textarea>
          </div>

          <Button 
            disabled={loading}
            type="submit" 
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-bold shadow-xl shadow-blue-100 transition-all active:scale-95"
          >
            {loading ? "Qo'shilmoqda..." : "Vakansiyani e'lon qilish"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
