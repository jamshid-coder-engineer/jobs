import { useState } from "react";
import { useSelector } from "react-redux"; // Redux'dan ma'lumot olish uchun
import { RootState } from "@/store";         // State turini aniqlash uchun
import JobCard from "../components/shared/JobCard";

const Home = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Redux Store'dan vakansiyalarni olamiz 📥
  const jobs = useSelector((state: RootState) => state.jobs.items);

  // Filtrlash endi Redux'dan kelgan 'jobs' ustida ishlaydi
  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesTitle && matchesLocation;
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* ... (Qidiruv paneli kodi o'z joyida qoladi) ... */}

      <div className="grid grid-cols-1 gap-4 mt-8">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Home;