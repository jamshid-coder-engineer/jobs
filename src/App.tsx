import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import AddJob from "./pages/AddJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/shared/Header"; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/add-job" element={<AddJob />} /> 
          <Route path="/dashboard" element={<EmployerDashboard />} /> 
        </Routes>
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;