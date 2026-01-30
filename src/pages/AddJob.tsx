import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addJob } from "@/store/slices/jobsSlice";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Trash2, ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ title: "", company: "", location: "", salary: "" });
  const [responsibilities, setResponsibilities] = useState([""]);
  const [requirements, setRequirements] = useState([""]);

  useEffect(() => {
    const saved = localStorage.getItem("pending_job_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData);
      setResponsibilities(parsed.responsibilities);
      setRequirements(parsed.requirements);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      localStorage.setItem("pending_job_data", JSON.stringify({ formData, responsibilities, requirements }));
      toast.warning("Avval tizimga kiring!");
      navigate("/auth");
      return;
    }
    dispatch(addJob({ id: crypto.randomUUID(), ...formData, responsibilities, requirements, type: "Full-time" }));
    localStorage.removeItem("pending_job_data");
    toast.success("E'lon qilindi! 🎉");
    navigate("/");
  };

  const addField = (t: "resp" | "req") => t === "resp" ? setResponsibilities([...responsibilities, ""]) : setRequirements([...requirements, ""]);
  
  const handleArrayChange = (i: number, v: string, t: "resp" | "req") => {
    if (t === "resp") {
      const n = [...responsibilities]; n[i] = v; setResponsibilities(n);
    } else {
      const n = [...requirements]; n[i] = v; setRequirements(n);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4"><ArrowLeft size={16} /> Orqaga</Button>
      
      {!isLoggedIn && (
        <div className="bg-amber-50 text-amber-800 p-4 rounded-xl mb-6 flex gap-3 border border-amber-200">
          <Lock size={20} /> <p className="text-sm font-medium">Diqqat: E'lon qilish uchun tizimga kirish shart.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border space-y-6 shadow-sm">
        <h1 className="text-2xl font-bold">Vakansiya yaratish</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Ish nomi</Label><Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
          <div className="space-y-2"><Label>Kompaniya</Label><Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-lg font-bold">Vazifalar</Label>
          {responsibilities.map((r, i) => (
            <div key={i} className="flex gap-2">
              <Input value={r} onChange={e => handleArrayChange(i, e.target.value, "resp")} />
              <Button type="button" variant="ghost" onClick={() => setResponsibilities(responsibilities.filter((_, idx) => idx !== i))}><Trash2 size={16} /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addField("resp")} className="w-full border-dashed"><Plus size={16} /> Qo'shish</Button>
        </div>

        <Button type="submit" className="w-full h-14 bg-blue-600 rounded-2xl text-lg font-bold">
          {isLoggedIn ? "Vakansiyani e'lon qilish" : "Kirish va e'lon qilish 🔒"}
        </Button>
      </form>
    </motion.div>
  );
};

export default AddJob;