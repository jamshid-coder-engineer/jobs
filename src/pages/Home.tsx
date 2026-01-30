import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchJobs } from "../store/slices/jobsSlice";
import JobCard from "../components/shared/JobCard";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.jobs);
  
  // Qidiruv uchun local state
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  // Qidiruv mantiqi: nomi, kompaniyasi yoki manzili bo'yicha filtrlaymiz
  const filteredJobs = items.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  if (status === "loading") return <div className="p-20 text-center">Yuklanmoqda...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Qidiruv bo'limi */}
      <div className="bg-white p-6 rounded-[32px] border shadow-sm mb-10 space-y-4 md:space-y-0 md:flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input 
            placeholder="Ish nomi yoki kompaniya..." 
            className="pl-10 h-12 rounded-2xl border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input 
            placeholder="Shahar yoki viloyat..." 
            className="pl-10 h-12 rounded-2xl border-slate-200"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {searchTerm || locationFilter ? `Topilgan vakansiyalar (${filteredJobs.length})` : "Barcha vakansiyalar"}
        </h1>
      </div>

      <div className="grid gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed">
            <p className="text-slate-500 font-medium text-lg">Hech qanday vakansiya topilmadi 😕</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;