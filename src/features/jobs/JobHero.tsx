import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";

const JobHero = () => {
  return (
    <div className="bg-white border-b py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          O'zingizga mos keladigan <span className="text-blue-600">ishni toping</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Minglab vakansiyalar va eng yaxshi kompaniyalar sizni kutmoqda.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto p-4 bg-slate-100 rounded-xl shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Kasb, kompaniya yoki ko'nikma" 
              className="pl-10 h-12 bg-white"
            />
          </div>
          <div className="flex-1">
            <Input 
              placeholder="Shahar yoki viloyat" 
              className="h-12 bg-white"
            />
          </div>
          <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
            Izlash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobHero;
