import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/new" element={<AddJob />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} /> {/* Yangi route 🎯 */}
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;