import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addApplication } from "@/store/slices/applicationsSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Building2, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Modal holati
  const [isOpen, setIsOpen] = useState(false);

  // Redux Store'dan vakansiyani topamiz
  const job = useSelector((state: RootState) => 
    state.jobs.items.find((item) => item.id === id)
  );

  // Form state
  const [appData, setAppData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeLink: ""
  });

  if (!job) {
    return <div className="text-center py-20">Vakansiya topilmadi 😕</div>;
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    const newApplication = {
      id: crypto.randomUUID(),
      jobId: id!,
      ...appData,
      appliedAt: new Date().toISOString(),
    };

    dispatch(addApplication(newApplication));
    setIsOpen(false);
    toast.success("Arizangiz muvaffaqiyatli yuborildi! 🎉");
    setAppData({ fullName: "", email: "", phone: "", resumeLink: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
      </Button>

      {/* Vakansiya sarlavhasi */}
      <div className="bg-white p-8 rounded-2xl border shadow-sm mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-slate-600">
              <span className="flex items-center gap-1"><Building2 size={18}/> {job.company}</span>
              <span className="flex items-center gap-1"><MapPin size={18}/> {job.location}</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">{job.salary}</div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Vazifalar 📋</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {job.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Talablar ✅</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </div>
        </div>

        {/* Ariza topshirish Modali */}
        <div className="mt-10">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto px-10 h-12 bg-blue-600 hover:bg-blue-700 text-lg">
                Ariza topshirish 🚀
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ishga ariza topshirish</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleApply} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">F.I.O.</Label>
                  <Input 
                    id="name" 
                    required 
                    value={appData.fullName}
                    onChange={(e) => setAppData({...appData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={appData.email}
                    onChange={(e) => setAppData({...appData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input 
                    id="phone" 
                    required 
                    value={appData.phone}
                    onChange={(e) => setAppData({...appData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Rezyume linki (Google Drive/LinkedIn)</Label>
                  <Input 
                    id="resume" 
                    required 
                    value={appData.resumeLink}
                    onChange={(e) => setAppData({...appData, resumeLink: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600">Yuborish</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;