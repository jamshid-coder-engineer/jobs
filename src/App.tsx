import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/shared/Header"; 
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* DIQQAT: URL bilan bir xil bo'lishi kerak */}
          {/* Agar URL /job/1 bo'lsa, bu yerda ham /job/:id bo'lishi shart */}
          <Route path="/job/:id" element={<JobDetails />} />
          
          <Route path="/add-job" element={<AddJob />} /> 
          
          {/* Dashboard yo'llarini ajratib olamiz */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} /> 
          
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;