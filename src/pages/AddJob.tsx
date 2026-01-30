import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux"; 
import { addJob } from "@/store/slices/jobsSlice";

 
const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
  });

  const [responsibilities, setResponsibilities] = useState([""]);
  const [requirements, setRequirements] = useState([""]);

  const addField = (type: "resp" | "req") => {
    if (type === "resp") setResponsibilities([...responsibilities, ""]);
    else setRequirements([...requirements, ""]);
  };

  const removeField = (index: number, type: "resp" | "req") => {
    if (type === "resp") {
      setResponsibilities(responsibilities.filter((_, i) => i !== index));
    } else {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      id: crypto.randomUUID(), // Unikal ID 🆔
      ...formData,
      responsibilities: responsibilities.filter(r => r !== ""), // Bo'sh qatorlarni o'chiramiz
      requirements: requirements.filter(r => r !== ""),
      type: "Full-time", // Hozircha standart qiymat
    };

    // Redux Store'ga yuboramiz 🚀
    dispatch(addJob(newJob));

    toast.success("Vakansiya muvaffaqiyatli qo'shildi! 🎉");
    navigate("/"); // Bosh sahifaga qaytamiz
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
      </Button>

      <h1 className="text-3xl font-bold mb-8 text-slate-900">Yangi vakansiya yaratish 📝</h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm">
        {/* 1. Umumiy ma'lumotlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Ish nomi (Title) 🏷️</Label>
            <Input 
              required 
              placeholder="Masalan: Senior React Developer" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Kompaniya nomi 🏢</Label>
            <Input 
              required 
              placeholder="Masalan: Google" 
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Hudud 📍</Label>
            <Input 
              required 
              placeholder="Masalan: Toshkent" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Maosh 💰</Label>
            <Input 
              placeholder="Masalan: $1500 - $2000" 
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
            />
          </div>
        </div>

        <hr />

        {/* 2. Dinamik Vazifalar ro'yxati */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Vazifalar 📋</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => addField("resp")}>
              <Plus className="h-4 w-4 mr-1" /> Qo'shish
            </Button>
          </div>
          {responsibilities.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input 
                required
                placeholder={`Vazifa #${index + 1}`}
                value={item}
                onChange={(e) => handleArrayChange(index, e.target.value, "resp")}
              />
              {responsibilities.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeField(index, "resp")}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* 3. Dinamik Talablar ro'yxati */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Talablar ✅</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => addField("req")}>
              <Plus className="h-4 w-4 mr-1" /> Qo'shish
            </Button>
          </div>
          {requirements.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input 
                required
                placeholder={`Talab #${index + 1}`}
                value={item}
                onChange={(e) => handleArrayChange(index, e.target.value, "req")}
              />
              {requirements.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeField(index, "req")}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
          Vakansiyani e'lon qilish 🚀
        </Button>
      </form>
    </div>
  );
};

export default AddJob;