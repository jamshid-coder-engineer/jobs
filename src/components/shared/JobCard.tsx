import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Building2, Briefcase } from "lucide-react"; // Ikonkalar uchun
import { motion } from "framer-motion";
// Ma'lumotlar turi (Interface)
interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description?: string;
}

const JobCard = ({ id, title, company, location, salary, type, description }: JobCardProps) => {
  return (
    <motion.div
      // Kirish animatsiyasi
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Hover animatsiyasi
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      className="w-full"
    >
    <Card className="hover:shadow-md transition-shadow border-slate-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            {/* Sarlavha - biz kelishganimizdek Link orqali */}
            <h3 className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
              <Link to={`/jobs/${id}`}>{title}</Link>
            </h3>
            <div className="flex items-center gap-2 mt-1 text-slate-600">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">{company}</span>
            </div>
          </div>
          <div className="text-green-700 font-bold text-lg">
            {salary}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
              {type}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
    </motion.div>
  );
};

export default JobCard;