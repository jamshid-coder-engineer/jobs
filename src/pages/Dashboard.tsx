import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Trash2, CheckCircle2, XCircle, User, 
  Briefcase, LayoutDashboard, FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "../store"; // Redux dispatch
import { fetchJobs } from "@/store/slices/jobsSlice"; // Redux action
import { toast } from "sonner";

// --- TYPES (TypeScript uchun) ---
interface Application {
  id: string;
  jobTitle: string;
  candidateName: string;
  status: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"applications" | "jobs">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. DATA YUKLASH (Serverdan)
  const fetchData = async () => {
    try {
      const [appRes, jobRes] = await Promise.all([
        axios.get("http://localhost:5000/applications"),
        axios.get("http://localhost:5000/jobs")
      ]);
      setApplications(appRes.data.reverse());
      setJobs(jobRes.data.reverse());
    } catch (err) {
      toast.error("Ma'lumot yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 2. ISH E'LONINI O'CHIRISH (Full Sync)
  const deleteJob = async (id: string) => {
    if (!window.confirm("Bu e'lonni o'chirmoqchimisiz? Uni qayta tiklab bo'lmaydi!")) return;
    
    try {
      // Serverdan o'chirish
      await axios.delete(`http://localhost:5000/jobs/${id}`);
      
      // Dashboard state-ni yangilash
      setJobs(prev => prev.filter(job => job.id !== id));
      
      // REDUX-NI YANGILASH (Home page uchun)
      dispatch(fetchJobs());
      
      toast.success("Vakansiya butunlay o'chirildi ✅");
    } catch (err) {
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  // 3. ARIZANI O'CHIRISH
  const deleteApplication = async (id: string) => {
    if (!window.confirm("Arizani o'chirishga rozimisiz?")) return;
    try {
      await axios.delete(`http://localhost:5000/applications/${id}`);
      setApplications(prev => prev.filter(app => app.id !== id));
      toast.success("Ariza o'chirildi");
    } catch (err) {
      toast.error("Xatolik");
    }
  };

  // 4. ARIZA STATUSINI O'ZGARTIRISH
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`http://localhost:5000/applications/${id}`, { status });
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status } : app
      ));
      toast.info(`Holat: ${status}`);
    } catch (err) {
      toast.error("Statusni yangilab bo'lmadi");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Ma'lumot yuklanmoqda...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <LayoutDashboard className="text-blue-600" /> Dashboard
        </h1>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border shadow-inner">
          <button 
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "applications" ? "bg-white shadow-md text-blue-600 scale-105" : "text-slate-500 hover:text-slate-800"}`}
          >
            Arizalar ({applications.length})
          </button>
          <button 
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === "jobs" ? "bg-white shadow-md text-blue-600 scale-105" : "text-slate-500 hover:text-slate-800"}`}
          >
            Vakansiyalar ({jobs.length})
          </button>
        </div>
      </div>

      {/* --- ARIZALAR BO'LIMI --- */}
      {activeTab === "applications" && (
        <div className="grid gap-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white border rounded-[28px] p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-xl hover:border-blue-100 transition-all group">
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <User size={28}/>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg">{app.candidateName}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 font-medium">
                    <Briefcase size={16} className="text-blue-400" /> {app.jobTitle}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                <Button variant="ghost" size="sm" onClick={() => updateStatus(app.id, "accepted")} className="text-green-600 hover:bg-green-50 rounded-xl h-11 w-11 p-0"><CheckCircle2 size={22}/></Button>
                <Button variant="ghost" size="sm" onClick={() => updateStatus(app.id, "rejected")} className="text-orange-500 hover:bg-orange-50 rounded-xl h-11 w-11 p-0"><XCircle size={22}/></Button>
                <Button variant="ghost" size="sm" onClick={() => deleteApplication(app.id)} className="text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl h-11 w-11 p-0"><Trash2 size={22}/></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- VAKANSIYALAR BO'LIMI --- */}
      {activeTab === "jobs" && (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-white border rounded-[28px] p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-xl transition-all border-l-8 border-l-blue-600 shadow-sm">
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <FileText size={28}/>
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-lg">{job.title}</h3>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-tight">{job.company} • {job.location}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => deleteJob(job.id)} 
                className="text-red-500 hover:bg-red-50 hover:border-red-200 border border-transparent rounded-2xl px-6 h-12 font-bold transition-all active:scale-95"
              >
                <Trash2 size={20} className="mr-2" /> E'lonni o'chirish
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;