import { useState } from "react";
import { useAppSelector } from "@/store";
import JobCard from "../components/shared/JobCard";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Redux Store'dan vakansiyalarni olamiz 📥
  const jobs = useAppSelector((state) => state.jobs.items);

  // Filtrlash
  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesTitle && matchesLocation;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Boshlang'ich holat (pastda va ko'rinmas)
      animate={{ opacity: 1, y: 0 }}  // Paydo bo'lgandagi holat
      exit={{ opacity: 0, y: -20 }}   // Yo'qolgandagi holat
      transition={{ duration: 0.5 }}   // Davomiyligi
      className="max-w-7xl mx-auto py-10 px-4"
    >
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Qidiruv paneli */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Ish izlash 🔍</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input
              placeholder="Ish nomi, kalit so'z..."
              className="pl-10"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input
              placeholder="Shahar, hudud..."
              className="pl-10"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Vakansiyalar ro'yxati */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            Hech qanday vakansiya topilmadi 😔
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} {...job} />)
        )}
      </div>
    </div>
    </motion.div>
  );
};

export default Home;