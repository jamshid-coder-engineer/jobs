import { useAppSelector, RootState } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Calendar, 
  User, 
  Mail, 
  FileCheck,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Redux-dan arizalar va ishlar ro'yxatini olamiz
  const applications = useAppSelector((state: RootState) => state.applications.items);
  const jobs = useAppSelector((state: RootState) => state.jobs.items);
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <LayoutDashboard size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboardga xush kelibsiz</h2>
        <p className="text-slate-500 mt-2 max-w-sm">
          Arizalaringizni ko'rish uchun iltimos tizimga kiring.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-black text-slate-900">Mening arizalarim</h1>
        <Badge variant="secondary" className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
          {applications.length} ta ariza
        </Badge>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
          <p className="text-slate-400 font-medium text-lg">Hali hech qanday ishga ariza topshirmagansiz.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app, index) => {
            // Har bir arizaga mos keladigan ish ma'lumotlarini topamiz
            const job = jobs.find((j) => j.id === app.jobId);

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-[24px] overflow-hidden border-slate-200 hover:shadow-lg transition-all group">
                  <div className="flex flex-col md:flex-row">
                    {/* Chap taraf: Ish haqida ma'lumot */}
                    <CardHeader className="flex-1 bg-slate-50/50 p-6 border-r border-slate-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Briefcase size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">Vakansiya</span>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job?.title || "Noma'lum vakansiya"}
                      </CardTitle>
                      <p className="text-slate-500 font-medium">{job?.company || "Kompaniya mavjud emas"}</p>
                      
                      <div className="flex items-center gap-4 mt-6 text-sm text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={16} /> 
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FileCheck size={16} className="text-green-500" /> 
                          Yuborilgan
                        </span>
                      </div>
                    </CardHeader>

                    {/* O'ng taraf: Nomzod ma'lumotlari */}
                    <CardContent className="flex-1 p-6 bg-white">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <User size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Nomzod</p>
                            <p className="text-slate-800 font-semibold">{app.fullName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <Mail size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Kontakt</p>
                            <p className="text-slate-800 font-semibold">{app.email}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;