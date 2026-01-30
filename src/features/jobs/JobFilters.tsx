import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";

const JobFilters = () => {
  const jobTypes = [
    { id: "full-time", label: "To'liq stavka" },
    { id: "remote", label: "Masofaviy" },
    { id: "hybrid", label: "Gibrid" },
    { id: "part-time", label: "Yarim stavka" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Ish turi</h3>
        <div className="space-y-3">
          {jobTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox id={type.id} />
              <Label 
                htmlFor={type.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Kelgusida bu yerga Maosh va Tajriba filtrlarini qo'shamiz */}
    </div>
  );
};

export default JobFilters;