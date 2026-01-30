import { useAppDispatch, useAppSelector } from "@/store";
import { updateStatus, deleteApplication, ApplicationStatus } from "@/store/slices/applicationsSlice";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { FileText, Trash2, Users, Briefcase, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const EmployerDashboard = () => {
  const dispatch = useAppDispatch();
  const applications = useAppSelector((state) => state.applications.items);
  const jobs = useAppSelector((state) => state.jobs.items);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const stats = [
    { title: "Jami vakansiyalar", value: jobs.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Jami arizalar", value: applications.length, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Yangi arizalar", value: applications.filter(a => a.status === "Yangi").length, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { title: "Suhbat bosqichi", value: applications.filter(a => a.status === "Suhbat").length, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" }
  ];

  const openResume = (base64: string) => {
    const win = window.open();
    if (win) {
      win.document.write(
        `<iframe src="${base64}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Haqiqatdan ham ushbu arizani o'chirmoqchimisiz?")) {
      dispatch(deleteApplication(id));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto py-10 px-4 space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ish beruvchi paneli 💼</h1>
        <p className="text-slate-500 mt-1">Vakansiyalar va nomzodlarni boshqarish markazi</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="shadow-sm border-none bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Barcha arizalar</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Nomzod</TableHead>
              <TableHead className="font-bold">Vakansiya</TableHead>
              <TableHead className="font-bold">Rezyume</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                  Hozircha hech qanday ariza kelib tushmagan
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <div className="font-bold">{app.fullName}</div>
                    <div className="text-xs text-slate-500">{app.email}</div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">
                    {jobs.find((j) => j.id === app.jobId)?.title || "O'chirilgan"}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openResume(app.resumeBase64)} className="text-blue-600 border-blue-100">
                      <FileText size={16} className="mr-2" /> Ko'rish
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={app.status} 
                      onValueChange={(val) => dispatch(updateStatus({ id: app.id, status: val as ApplicationStatus }))}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yangi">Yangi</SelectItem>
                        <SelectItem value="Ko'rilmoqda">Ko'rilmoqda</SelectItem>
                        <SelectItem value="Suhbat">Suhbat</SelectItem>
                        <SelectItem value="Rad etildi">Rad etildi</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(app.id)} className="hover:bg-red-50 group">
                      <Trash2 size={18} className="text-slate-400 group-hover:text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
};

export default EmployerDashboard;
