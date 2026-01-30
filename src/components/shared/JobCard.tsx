import { Link } from "react-router-dom";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
  };
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white border rounded-[24px] p-6 hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex gap-4 text-slate-500 font-medium text-sm">
            <span className="flex items-center gap-1.5">
              <Building2 size={16} /> {job.company}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} /> {job.location}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600 mb-2">{job.salary}</div>
          <Link to={`/job/${job.id}`}>
            <Button variant="outline" className="rounded-xl hover:bg-blue-600 hover:text-white border-blue-100">
              Batafsil <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
