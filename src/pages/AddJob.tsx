import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Trash2, ArrowLeft, Lock } from "lucide-react"; // Lock qo'shildi
import { useDispatch } from "react-redux"; 
import { addJob } from "@/store/slices/jobsSlice";
import { motion, AnimatePresence } from "framer-motion";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = false; // Simulyatsiya

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
  });

  const [responsibilities, setResponsibilities] = useState([""]);
  const [requirements, setRequirements] = useState([""]);

  // --- SAQLASH LOGIKASI ---
  // Sahifa yuklanganda avval yozilgan ma'lumotlarni tiklash
  useEffect(() => {
    const savedData = localStorage.getItem("pending_job_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed.formData);
      setResponsibilities(parsed.responsibilities);
      setRequirements(parsed.requirements);
      toast.info("Yozib qoldirilgan ma'lumotlar tiklandi");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      // Login qilishdan oldin ma'lumotlarni saqlab qo'yamiz
      const dataToSave = { formData, responsibilities, requirements };
      localStorage.setItem("pending_job_data", JSON.stringify(dataToSave));
      
      toast.warning("E'lon qilish uchun tizimga kirishingiz kerak. Ma'lumotlaringiz saqlandi!");
      navigate("/auth");
      return;
    }

    // Agar login bo'lgan bo'lsa, odatdagidek davom etadi
    const newJob = {
      id: crypto.randomUUID(),
      ...formData,
      responsibilities: responsibilities.filter(r => r !== ""),
      requirements: requirements.filter(r => r !== ""),
      type: "Full-time",
    };

    dispatch(addJob(newJob));
    localStorage.removeItem("pending_job_data"); // Muvaffaqiyatli bo'lsa o'chiramiz
    toast.success("Vakansiya muvaffaqiyatli qo'shildi! 🎉");
    navigate("/");
  };

  // ... (addField, removeField, handleArrayChange funksiyalari o'zgarishsiz qoladi)
  const addField = (type: "resp" | "req") => {
    if (type === "resp") setResponsibilities([...responsibilities, ""]);
    else setRequirements([...requirements, ""]);
  };

  const removeField = (index: number, type: "resp" | "req") => {
    if (type === "resp") setResponsibilities(responsibilities.filter((_, i) => i !== index));
    else setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleArrayChange = (index: number, value: string, type: "resp" | "req") => {
    if (type === "resp") {
      const newResp = [...responsibilities];
      newResp[index] = value;
      setResponsibilities(newResp);
    } else {
      const newReq = [...requirements];
      newReq[index] = value;
      setRequirements(newReq);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
      </Button>

      {/* Tizimga kirmagan bo'lsa ogohlantirish banneri */}
      {!isLoggedIn && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6 flex items-start gap-3 text-amber-800 animate-pulse">
          <Lock className="w-5 h-5 mt-0.5" />
          <p className="text-sm font-medium">
            Siz tizimga kirmagansiz. Ma'lumotlarni to'ldirishingiz mumkin, lekin e'lon qilish tugmasini bosganingizda tizimga kirishingiz so'raladi.
          </p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-slate-900">Yangi vakansiya yaratish 📝</h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm">
        {/* Form elementlari (Inputlar) o'sha-o'sha qoladi ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Ish nomi (Title)</Label>
            <Input required placeholder="Senior React Developer" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Kompaniya nomi</Label>
            <Input required placeholder="Google" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Hudud</Label>
            <Input required placeholder="Toshkent" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Maosh</Label>
            <Input placeholder="$1500 - $2000" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} />
          </div>
        </div>

        {/* Vazifalar va Talablar qismi ... (o'sha-o'sha qoladi) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center"><Label className="text-lg font-semibold">Vazifalar</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => addField("resp")} className="text-blue-600"><Plus className="h-4 w-4 mr-1" /> Qo'shish</Button></div>
          <div className="space-y-3">
            {responsibilities.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input required value={item} onChange={(e) => handleArrayChange(index, e.target.value, "resp")} />
                {responsibilities.length > 1 && <Button type="button" variant="ghost" onClick={() => removeField(index, "resp")} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center"><Label className="text-lg font-semibold">Talablar</Label>
          <Button type="button" variant="outline" size="sm" onClick={() => addField("req")} className="text-blue-600"><Plus className="h-4 w-4 mr-1" /> Qo'shish</Button></div>
          <div className="space-y-3">
            {requirements.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input required value={item} onChange={(e) => handleArrayChange(index, e.target.value, "req")} />
                {requirements.length > 1 && <Button type="button" variant="ghost" onClick={() => removeField(index, "req")} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold rounded-2xl">
          {isLoggedIn ? "Vakansiyani e'lon qilish 🚀" : "Kirish va e'lon qilish 🔒"}
        </Button>
      </form>
    </motion.div>
  );
};

export default AddJob;